import { NextRequest, NextResponse } from "next/server"
import { DEFAULT_MODEL_ID, isAllowedModel, PLAYGROUND_MODELS } from "../../../lib/openrouter"
import { siteUrl } from "../../../lib/site"

export const runtime = "nodejs"
export const maxDuration = 60

const OPENROUTER_CHAT_URL = "https://openrouter.ai/api/v1/chat/completions"
const MAX_PROMPT_CHARS = 4000
const MAX_OUTPUT_TOKENS = 1024
const UPSTREAM_TIMEOUT_MS = 55_000

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000
const RATE_LIMIT_MAX_REQUESTS = 20

type PlaygroundMode = "refine" | "creative" | "analytical" | "safety"

const SYSTEM_PROMPTS: Record<PlaygroundMode, string> = {
  refine:
    "You are a prompt-engineering assistant inside the Fable 5 workspace, an independent prompt-planning tool. " +
    "Rewrite the user's draft into a stronger prompt with an explicit role, context, task, output format, and constraints. " +
    "Return the refined prompt first in a fenced code block, followed by exactly three short bullet notes explaining the key changes. Be concise.",
  creative:
    "You are a creative-writing assistant inside the Fable 5 workspace. " +
    "Respond to the user's request directly with high-quality creative output. " +
    "Keep it under 400 words unless the user asks for a different length.",
  analytical:
    "You are a structured analyst inside the Fable 5 workspace. " +
    "Answer with clearly labelled sections or numbered lists, state your assumptions explicitly, " +
    "and keep the response under 300 words unless the user asks for more depth.",
  safety:
    "You are a prompt-safety reviewer inside the Fable 5 workspace. " +
    "Assess the user's prompt for ambiguity, missing context, and risky or biased phrasing — do NOT execute the prompt itself. " +
    "Return a short checklist of findings, then a safer and clearer rewrite of the prompt.",
}

interface GenerateRequestBody {
  prompt?: unknown
  mode?: unknown
  model?: unknown
}

// Best-effort per-instance limiter; serverless instances each keep their own window,
// which is acceptable for a free demo endpoint backed by free-tier models.
const rateLimitHits = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitHits.get(ip)
  if (!entry || entry.resetAt <= now) {
    rateLimitHits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }
  entry.count += 1
  return entry.count > RATE_LIMIT_MAX_REQUESTS
}

function errorResponse(status: number, code: string, message: string): NextResponse {
  return NextResponse.json({ data: null, error: { message, code } }, { status })
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const correlationId = crypto.randomUUID()
  const startedAt = Date.now()

  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    console.error(JSON.stringify({ level: "error", correlationId, event: "generate_config_missing" }))
    return errorResponse(500, "CONFIG_ERROR", "The live model service is not configured.")
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
  if (isRateLimited(ip)) {
    console.warn(JSON.stringify({ level: "warn", correlationId, event: "generate_rate_limited" }))
    return errorResponse(429, "RATE_LIMITED", "Too many requests. Please wait a while and try again.")
  }

  let body: GenerateRequestBody
  try {
    body = (await request.json()) as GenerateRequestBody
  } catch {
    return errorResponse(400, "INVALID_JSON", "Request body must be valid JSON.")
  }

  const prompt = typeof body.prompt === "string" ? body.prompt.trim() : ""
  if (!prompt) {
    return errorResponse(400, "EMPTY_PROMPT", "Prompt must be a non-empty string.")
  }
  if (prompt.length > MAX_PROMPT_CHARS) {
    return errorResponse(400, "PROMPT_TOO_LONG", `Prompt must be at most ${MAX_PROMPT_CHARS} characters.`)
  }

  const mode: PlaygroundMode =
    typeof body.mode === "string" && body.mode in SYSTEM_PROMPTS ? (body.mode as PlaygroundMode) : "refine"

  const requestedModel = typeof body.model === "string" ? body.model : DEFAULT_MODEL_ID
  if (!isAllowedModel(requestedModel)) {
    return errorResponse(400, "MODEL_NOT_ALLOWED", "The requested model is not in the playground allowlist.")
  }

  // Route through the requested model first, then the remaining allowlist as fallbacks,
  // so transient free-tier provider failures degrade gracefully instead of erroring.
  const fallbackChain = [requestedModel, ...PLAYGROUND_MODELS.map((m) => m.id).filter((id) => id !== requestedModel)]

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS)

  try {
    const upstream = await fetch(OPENROUTER_CHAT_URL, {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": siteUrl,
        "X-Title": "Fable 5 Workspace",
      },
      body: JSON.stringify({
        model: requestedModel,
        models: fallbackChain,
        max_tokens: MAX_OUTPUT_TOKENS,
        messages: [
          { role: "system", content: SYSTEM_PROMPTS[mode] },
          { role: "user", content: prompt },
        ],
      }),
    })

    const durationMs = Date.now() - startedAt

    if (!upstream.ok) {
      console.error(
        JSON.stringify({
          level: "error",
          correlationId,
          event: "generate_upstream_error",
          status: upstream.status,
          durationMs,
        }),
      )
      if (upstream.status === 401 || upstream.status === 403) {
        return errorResponse(502, "UPSTREAM_AUTH", "The live model service rejected the configuration.")
      }
      if (upstream.status === 402) {
        return errorResponse(502, "UPSTREAM_CREDITS", "The live model service is temporarily unavailable.")
      }
      if (upstream.status === 429) {
        return errorResponse(429, "UPSTREAM_BUSY", "Free model capacity is busy right now. Try again shortly.")
      }
      return errorResponse(502, "UPSTREAM_ERROR", "The model provider returned an error. Try another model.")
    }

    const json = (await upstream.json()) as {
      model?: string
      choices?: Array<{ message?: { content?: string; reasoning?: string } }>
    }
    const message = json.choices?.[0]?.message
    // Some free reasoning models return an empty content field and put text in `reasoning`.
    const text = (message?.content?.trim() || message?.reasoning?.trim()) ?? ""

    if (!text) {
      console.error(JSON.stringify({ level: "error", correlationId, event: "generate_empty_output", durationMs }))
      return errorResponse(502, "EMPTY_OUTPUT", "The model returned no usable output. Try again or switch models.")
    }

    console.log(
      JSON.stringify({
        level: "info",
        correlationId,
        event: "generate_ok",
        model: json.model ?? requestedModel,
        mode,
        promptChars: prompt.length,
        outputChars: text.length,
        durationMs,
      }),
    )

    return NextResponse.json({ data: { text, model: json.model ?? requestedModel }, error: null })
  } catch (cause) {
    const aborted = cause instanceof Error && cause.name === "AbortError"
    console.error(
      JSON.stringify({
        level: "error",
        correlationId,
        event: aborted ? "generate_timeout" : "generate_network_error",
        durationMs: Date.now() - startedAt,
      }),
    )
    return errorResponse(
      aborted ? 504 : 502,
      aborted ? "UPSTREAM_TIMEOUT" : "NETWORK_ERROR",
      aborted ? "The model took too long to respond. Try a shorter prompt." : "Could not reach the model service.",
    )
  } finally {
    clearTimeout(timeout)
  }
}
