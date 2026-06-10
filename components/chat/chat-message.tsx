"use client"

import { memo } from "react"
import { RotateCcw } from "lucide-react"
import MarkdownContent from "./markdown-content"

interface ChatMessageProps {
  role: "user" | "assistant"
  content: string
  isStreaming?: boolean
  onRegenerate?: () => void
}

function ChatMessageInner({ role, content, isStreaming = false, onRegenerate }: ChatMessageProps) {
  if (role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] bg-white border border-[rgba(55,50,47,0.12)] rounded-2xl px-4 py-2.5 shadow-[0px_1px_3px_rgba(55,50,47,0.05)]">
          <p className="text-[15px] text-[#37322F] font-sans leading-relaxed whitespace-pre-wrap break-words">
            {content}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2 min-w-0">
      <MarkdownContent content={content} />
      {isStreaming && (
        <span className="inline-block w-2 h-4 bg-[rgba(55,50,47,0.30)] animate-pulse rounded-[2px]" aria-hidden="true" />
      )}
      {!isStreaming && onRegenerate && (
        <div>
          <button
            onClick={onRegenerate}
            className="inline-flex items-center gap-1.5 text-xs font-sans text-[rgba(55,50,47,0.45)] hover:text-[#37322F] transition-colors"
          >
            <RotateCcw className="size-3" aria-hidden="true" />
            Regenerate
          </button>
        </div>
      )}
    </div>
  )
}

const ChatMessage = memo(ChatMessageInner)
export default ChatMessage
