import { NextRequest } from "next/server"
import { buildFallbackChain, DEFAULT_MODEL_ID, isAllowedModel } from "../../../lib/openrouter"
import { siteUrl } from "../../../lib/site"
import { createRateLimiter, errorResponse, getClientIp, mapUpstreamStatus } from "../../../lib/api-helpers"
import {
  CHAT_MAX_MESSAGE_CHARS,
  CHAT_MAX_MESSAGES,
  CHAT_MAX_OUTPUT_TOKENS,
  CHAT_MAX_TOTAL_CHARS,
  type ChatMessagePayload,
} from "../../../lib/chat-config"

export const runtime = "nodejs"
export const maxDuration = 60

const OPENROUTER_CHAT_URL = "https://openrouter.ai/api/v1/chat/completions"
const UPSTREAM_TIMEOUT_MS = 55_000
const MAX_BUFFERED_REASONING_CHARS = 16_384

// Chat sends one request per turn, so the budget is higher than the one-shot playground's.
const isRateLimited = createRateLimiter({ windowMs: 60 * 60 * 1000, maxRequests: 40 })

const SYSTEM_PROMPT =
  "You are a helpful, knowledgeable AI assistant in the chat workspace on fable5.io, an independent guide to " +
  "Anthropic's Fable 5 model. You are an open-weight model served through OpenRouter — you are NOT Fable 5, and " +
  "you must say so if asked which model you are. Answer directly and format responses in Markdown. Use fenced " +
  "code blocks with a language tag for code. Be concise by default; expand only when the question calls for depth."

interface ChatRequestBody {
  messages?: unknown
  model?: unknown
}

interface OpenRouterStreamChunk {
  model?: string
  error?: { code?: number | string; message?: string }
  choices?: Array<{ delta?: { content?: string; reasoning?: string } }>
}

function isChatMessage(value: unknown): value is ChatMessagePayload {
  if (typeof value !== "object" || value === null) return false
  const message = value as Record<string, unknown>
  return (
    (message.role === "user" || message.role === "assistant") &&
    typeof message.content === "string" &&
    message.content.length > 0 &&
    message.content.length <= CHAT_MAX_MESSAGE_CHARS
  )
}

function validateMessages(raw: unknown): ChatMessagePayload[] | null {
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > CHAT_MAX_MESSAGES) return null
  if (!raw.every(isChatMessage)) return null
  const totalChars = raw.reduce((sum, message) => sum + message.content.length, 0)
  if (totalChars > CHAT_MAX_TOTAL_CHARS) return null
  if (raw[raw.length - 1].role !== "user") return null
  return raw
}

function logLine(level: "info" | "warn" | "error", payload: Record<string, unknown>): void {
  const line = JSON.stringify({ level, ...payload })
  if (level === "error") console.error(line)
  else if (level === "warn") console.warn(line)
  else console.log(line)
}

export async function POST(request: NextRequest): Promise<Response> {
  const correlationId = crypto.randomUUID()
  const startedAt = Date.now()

  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    logLine("error", { correlationId, event: "chat_config_missing" })
    return errorResponse(500, "CONFIG_ERROR", "The live model service is not configured.")
  }

  if (isRateLimited(getClientIp(request))) {
    logLine("warn", { correlationId, event: "chat_rate_limited" })
    return errorResponse(429, "RATE_LIMITED", "Too many requests. Please wait a while and try again.")
  }

  let body: ChatRequestBody
  try {
    body = (await request.json()) as ChatRequestBody
  } catch {
    return errorResponse(400, "INVALID_JSON", "Request body must be valid JSON.")
  }

  const messages = validateMessages(body.messages)
  if (!messages) {
    return errorResponse(
      400,
      "INVALID_MESSAGES",
      `messages must be 1-${CHAT_MAX_MESSAGES} user/assistant entries ending with a user message, ` +
        `each at most ${CHAT_MAX_MESSAGE_CHARS} characters.`,
    )
  }

  const requestedModel = typeof body.model === "string" ? body.model : DEFAULT_MODEL_ID
  if (!isAllowedModel(requestedModel)) {
    return errorResponse(400, "MODEL_NOT_ALLOWED", "The requested model is not in the chat allowlist.")
  }

  const fallbackChain = buildFallbackChain(requestedModel)
  const totalInputChars = messages.reduce((sum, message) => sum + message.content.length, 0)

  let upstream: Response
  try {
    upstream = await fetch(OPENROUTER_CHAT_URL, {
      method: "POST",
      // Client disconnect cancels upstream; the timeout guarantees we end before maxDuration.
      signal: AbortSignal.any([request.signal, AbortSignal.timeout(UPSTREAM_TIMEOUT_MS)]),
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": siteUrl,
        "X-Title": "Fable 5 Workspace",
      },
      body: JSON.stringify({
        model: requestedModel,
        models: fallbackChain,
        max_tokens: CHAT_MAX_OUTPUT_TOKENS,
        stream: true,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      }),
    })
  } catch (cause) {
    const aborted = cause instanceof Error && cause.name === "AbortError"
    if (aborted && request.signal.aborted) {
      logLine("info", { correlationId, event: "chat_client_abort", durationMs: Date.now() - startedAt })
      return errorResponse(499, "CLIENT_ABORT", "The request was cancelled.")
    }
    const timedOut = cause instanceof Error && (cause.name === "TimeoutError" || aborted)
    logLine("error", {
      correlationId,
      event: timedOut ? "chat_upstream_timeout" : "chat_network_error",
      durationMs: Date.now() - startedAt,
    })
    // 500 instead of 502/504: Cloudflare replaces origin 502/504 with its own error
    // page, which would hide this JSON body from the client.
    return timedOut
      ? errorResponse(500, "UPSTREAM_TIMEOUT", "The model took too long to respond. Try a shorter prompt.")
      : errorResponse(500, "NETWORK_ERROR", "Could not reach the model service.")
  }

  if (!upstream.ok || !upstream.body) {
    logLine("error", {
      correlationId,
      event: "chat_upstream_error",
      status: upstream.status,
      durationMs: Date.now() - startedAt,
    })
    const mapped = mapUpstreamStatus(upstream.status)
    return errorResponse(mapped.status, mapped.code, mapped.message)
  }

  // Parse OpenRouter SSE server-side and emit plain text chunks. Protocol notes
  // (verified live): ": OPENROUTER PROCESSING" keep-alive comments, "data: {json}"
  // events, "data: [DONE]" terminator, reasoning models stream delta.reasoning
  // with empty content before real content arrives.
  const decoder = new TextDecoder()
  const encoder = new TextEncoder()
  let lineBuffer = ""
  let contentChars = 0
  let reasoningBuffer = ""
  let servedModel: string | null = null

  const toText = new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      lineBuffer += decoder.decode(chunk, { stream: true })
      let newlineIndex: number
      while ((newlineIndex = lineBuffer.indexOf("\n")) !== -1) {
        const line = lineBuffer.slice(0, newlineIndex).replace(/\r$/, "")
        lineBuffer = lineBuffer.slice(newlineIndex + 1)
        if (line === "" || line.startsWith(":")) continue
        if (!line.startsWith("data:")) continue
        const payload = line.slice(5).trimStart()
        if (payload === "[DONE]") continue
        let event: OpenRouterStreamChunk
        try {
          event = JSON.parse(payload) as OpenRouterStreamChunk
        } catch {
          continue
        }
        if (event.error) {
          logLine("error", { correlationId, event: "chat_upstream_mid_stream_error", upstreamCode: event.error.code })
          controller.error(new Error("UPSTREAM_MID_STREAM"))
          return
        }
        servedModel ??= event.model ?? null
        const delta = event.choices?.[0]?.delta
        const text = typeof delta?.content === "string" ? delta.content : ""
        if (text) {
          contentChars += text.length
          controller.enqueue(encoder.encode(text))
        } else if (
          typeof delta?.reasoning === "string" &&
          contentChars === 0 &&
          reasoningBuffer.length < MAX_BUFFERED_REASONING_CHARS
        ) {
          reasoningBuffer += delta.reasoning
        }
      }
    },
    flush(controller) {
      if (contentChars === 0 && reasoningBuffer.trim()) {
        controller.enqueue(encoder.encode(reasoningBuffer))
        contentChars = reasoningBuffer.length
      }
      logLine("info", {
        correlationId,
        event: "chat_ok",
        model: servedModel ?? requestedModel,
        messageCount: messages.length,
        totalInputChars,
        outputChars: contentChars,
        durationMs: Date.now() - startedAt,
      })
    },
  })

  return new Response(upstream.body.pipeThrough(toText), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
      "X-Chat-Model": requestedModel,
    },
  })
}
