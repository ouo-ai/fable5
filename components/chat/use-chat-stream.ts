"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { StoredMessage } from "../../lib/chat-storage"

interface ChatStreamCallbacks {
  /** Clean completion, or user Stop with partial text. */
  onDone: (fullText: string) => void
  /** Pre-stream JSON error, mid-stream interruption (partial kept), or empty output. */
  onError: (partialText: string, message: string) => void
}

interface ChatStreamApi {
  streamText: string
  isStreaming: boolean
  start: (messages: StoredMessage[], model: string) => Promise<void>
  stop: () => void
}

interface ErrorEnvelope {
  error?: { message?: string }
}

export function useChatStream({ onDone, onError }: ChatStreamCallbacks): ChatStreamApi {
  const [streamText, setStreamText] = useState("")
  const [isStreaming, setIsStreaming] = useState(false)
  const abortRef = useRef<AbortController | null>(null)
  const callbacksRef = useRef<ChatStreamCallbacks>({ onDone, onError })
  useEffect(() => {
    callbacksRef.current = { onDone, onError }
  })

  // rAF-throttled text updates: markdown re-parses per update, so cap at frame rate.
  const pendingTextRef = useRef<string | null>(null)
  const frameRef = useRef<number | null>(null)

  const flushText = useCallback(() => {
    frameRef.current = null
    if (pendingTextRef.current !== null) {
      setStreamText(pendingTextRef.current)
      pendingTextRef.current = null
    }
  }, [])

  const queueText = useCallback(
    (text: string) => {
      pendingTextRef.current = text
      frameRef.current ??= requestAnimationFrame(flushText)
    },
    [flushText],
  )

  useEffect(() => {
    return () => {
      abortRef.current?.abort()
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    }
  }, [])

  const start = useCallback(
    async (messages: StoredMessage[], model: string) => {
      const controller = new AbortController()
      abortRef.current = controller
      setIsStreaming(true)
      setStreamText("")
      let accumulated = ""

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          signal: controller.signal,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages, model }),
        })

        if (!response.ok || !response.body) {
          const envelope = (await response.json().catch(() => null)) as ErrorEnvelope | null
          callbacksRef.current.onError(
            "",
            envelope?.error?.message ?? `Something went wrong (HTTP ${response.status}). Please try again.`,
          )
          return
        }

        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          accumulated += decoder.decode(value, { stream: true })
          queueText(accumulated)
        }
        accumulated += decoder.decode()

        if (!accumulated.trim()) {
          callbacksRef.current.onError("", "The model returned no usable output. Try again or switch models.")
          return
        }
        callbacksRef.current.onDone(accumulated)
      } catch (cause) {
        if (cause instanceof DOMException && cause.name === "AbortError") {
          // User pressed Stop — keep whatever arrived.
          callbacksRef.current.onDone(accumulated)
        } else {
          callbacksRef.current.onError(
            accumulated,
            "Response interrupted — the connection to the model was lost. You can try again.",
          )
        }
      } finally {
        if (frameRef.current !== null) {
          cancelAnimationFrame(frameRef.current)
          frameRef.current = null
          pendingTextRef.current = null
        }
        setIsStreaming(false)
        setStreamText("")
        abortRef.current = null
      }
    },
    [queueText],
  )

  const stop = useCallback(() => {
    abortRef.current?.abort()
  }, [])

  return { streamText, isStreaming, start, stop }
}
