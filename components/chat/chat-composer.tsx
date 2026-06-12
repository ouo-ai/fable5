"use client"

import type React from "react"
import { ArrowUp, Plus, Square } from "lucide-react"
import { CHAT_MODEL_LABEL } from "../../lib/openrouter"
import { CHAT_MAX_MESSAGE_CHARS } from "../../lib/chat-config"

const TEXTAREA_MAX_HEIGHT_PX = 200
const COUNTER_VISIBLE_FROM = 7000

interface ChatComposerProps {
  value: string
  onChange: (value: string) => void
  onSend: () => void
  onStop: () => void
  isStreaming: boolean
  variant: "hero" | "docked"
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
}

export default function ChatComposer({
  value,
  onChange,
  onSend,
  onStop,
  isStreaming,
  variant,
  textareaRef,
}: ChatComposerProps) {
  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value.slice(0, CHAT_MAX_MESSAGE_CHARS))
    const el = event.target
    el.style.height = "auto"
    el.style.height = `${Math.min(el.scrollHeight, TEXTAREA_MAX_HEIGHT_PX)}px`
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== "Enter" || event.shiftKey) return
    // IME safety: confirming a CJK candidate with Enter must not send the message.
    if (event.nativeEvent.isComposing) return
    event.preventDefault()
    if (!isStreaming && value.trim()) onSend()
  }

  const canSend = !isStreaming && value.trim().length > 0

  return (
    <div
      className={`bg-white border border-[rgba(55,50,47,0.12)] rounded-2xl shadow-[0px_4px_24px_rgba(55,50,47,0.08)] focus-within:border-[rgba(55,50,47,0.30)] transition-colors ${
        variant === "hero" ? "w-full max-w-2xl mx-auto" : "w-full"
      }`}
    >
      <div className="relative px-4 pt-3.5">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="How can I help you today?"
          rows={variant === "hero" ? 2 : 1}
          className="w-full resize-none bg-transparent text-[15px] font-sans text-[#37322F] placeholder:text-[rgba(55,50,47,0.40)] focus:outline-none leading-relaxed"
          aria-label="Message"
        />
        {value.length >= COUNTER_VISIBLE_FROM && (
          <div className="absolute bottom-1 right-4 text-[10px] text-[rgba(55,50,47,0.30)] font-sans">
            {value.length}/{CHAT_MAX_MESSAGE_CHARS}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between px-3 pb-2.5 pt-1">
        <button
          type="button"
          aria-disabled="true"
          title="Attachments are not available"
          className="flex items-center justify-center size-8 rounded-full text-[rgba(55,50,47,0.40)] cursor-default opacity-50"
        >
          <Plus className="size-4" aria-hidden="true" />
        </button>

        <div className="flex items-center gap-2.5">
          <span className="text-xs font-sans text-[rgba(55,50,47,0.60)]" title="fable5.io's own free assistant">
            {CHAT_MODEL_LABEL}
          </span>

          {isStreaming ? (
            <button
              onClick={onStop}
              aria-label="Stop generating"
              className="flex items-center justify-center size-8 rounded-full bg-[#37322F] text-white hover:bg-[#2A2520] transition-colors"
            >
              <Square className="size-3 fill-current" aria-hidden="true" />
            </button>
          ) : (
            <button
              onClick={onSend}
              disabled={!canSend}
              aria-label="Send message"
              className="flex items-center justify-center size-8 rounded-full bg-[#37322F] text-white hover:bg-[#2A2520] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowUp className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
