"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowDown, X } from "lucide-react"
import type { StoredMessage } from "../../lib/chat-storage"
import ChatMessage from "./chat-message"

const PIN_THRESHOLD_PX = 80

interface ChatThreadProps {
  messages: StoredMessage[]
  streamText: string
  isStreaming: boolean
  error: string | null
  onRegenerate: () => void
  onDismissError: () => void
}

/** Parent remounts this component per conversation (key prop), which resets pin + scroll state. */
export default function ChatThread({
  messages,
  streamText,
  isStreaming,
  error,
  onRegenerate,
  onDismissError,
}: ChatThreadProps) {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const pinnedRef = useRef(true)
  const programmaticScrollRef = useRef(false)
  const [isPinned, setIsPinned] = useState(true)

  const setPinned = (value: boolean) => {
    pinnedRef.current = value
    setIsPinned(value)
  }

  const scrollToBottom = (behavior: ScrollBehavior) => {
    const el = scrollRef.current
    if (!el) return
    programmaticScrollRef.current = true
    el.scrollTo({ top: el.scrollHeight, behavior })
  }

  const handleScroll = () => {
    if (programmaticScrollRef.current) {
      programmaticScrollRef.current = false
      return
    }
    const el = scrollRef.current
    if (!el) return
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < PIN_THRESHOLD_PX
    if (nearBottom !== pinnedRef.current) setPinned(nearBottom)
  }

  // Start at the bottom when the conversation mounts.
  useEffect(() => {
    scrollToBottom("instant")
  }, [])

  // Follow new content only while the user is pinned to the bottom.
  useEffect(() => {
    if (pinnedRef.current) scrollToBottom("instant")
  }, [messages.length, streamText, error])

  const lastMessage = messages[messages.length - 1]
  const canRegenerate = !isStreaming && lastMessage?.role === "assistant"

  return (
    <div className="relative flex-1 min-h-0">
      <div ref={scrollRef} onScroll={handleScroll} className="h-full overflow-y-auto" aria-busy={isStreaming}>
        <div className="max-w-3xl mx-auto w-full px-4 py-6 flex flex-col gap-6" aria-live="polite">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              role={message.role}
              content={message.content}
              onRegenerate={canRegenerate && index === messages.length - 1 ? onRegenerate : undefined}
            />
          ))}

          {isStreaming &&
            (streamText ? (
              <ChatMessage role="assistant" content={streamText} isStreaming />
            ) : (
              <div className="flex gap-1.5 items-center py-2" aria-label="Waiting for the model">
                <span className="w-1.5 h-1.5 rounded-full bg-[rgba(55,50,47,0.30)] animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[rgba(55,50,47,0.30)] animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[rgba(55,50,47,0.30)] animate-bounce [animation-delay:300ms]" />
              </div>
            ))}

          {error && (
            <div
              role="alert"
              className="flex items-start justify-between gap-3 px-4 py-3 rounded-lg border border-rose-200 bg-rose-50 text-rose-800 text-sm font-sans"
            >
              <div className="flex flex-col gap-2">
                <span>{error}</span>
                <button onClick={onRegenerate} className="self-start text-xs font-medium underline underline-offset-2">
                  Try again
                </button>
              </div>
              <button onClick={onDismissError} aria-label="Dismiss error" className="shrink-0 hover:opacity-70">
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>

      {isStreaming && !isPinned && (
        <button
          onClick={() => {
            setPinned(true)
            scrollToBottom("smooth")
          }}
          className="absolute bottom-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[rgba(55,50,47,0.14)] shadow-[0px_2px_8px_rgba(55,50,47,0.12)] text-xs font-sans text-[#37322F] hover:border-[rgba(55,50,47,0.30)]"
          aria-label="Jump to latest"
        >
          <ArrowDown className="size-3.5" aria-hidden="true" />
          Latest
        </button>
      )}
    </div>
  )
}
