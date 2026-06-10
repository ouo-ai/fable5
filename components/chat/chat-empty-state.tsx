"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { ChartColumn, Code, GraduationCap, Info, Lightbulb, PenLine, X } from "lucide-react"
import { CHAT_SUGGESTIONS } from "../../lib/chat-config"
import { loadDisclosureDismissed, saveDisclosureDismissed } from "../../lib/chat-storage"

const SUGGESTION_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  code: Code,
  write: PenLine,
  learn: GraduationCap,
  brainstorm: Lightbulb,
  analyze: ChartColumn,
}

function greetingForHour(hour: number): string {
  if (hour >= 5 && hour < 12) return "Good morning"
  if (hour >= 12 && hour < 18) return "Good afternoon"
  return "Good evening"
}

interface ChatEmptyStateProps {
  onSuggestion: (prompt: string) => void
  children: React.ReactNode
}

export default function ChatEmptyState({ onSuggestion, children }: ChatEmptyStateProps) {
  // Server HTML says "Hello"; the time-of-day greeting is applied after mount
  // so the first client render matches the prerendered markup.
  const [greeting, setGreeting] = useState("Hello")
  const [showDisclosure, setShowDisclosure] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- post-hydration swap keeps SSR HTML stable
    setGreeting(greetingForHour(new Date().getHours()))
    setShowDisclosure(!loadDisclosureDismissed())
  }, [])

  const dismissDisclosure = () => {
    setShowDisclosure(false)
    saveDisclosureDismissed()
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 gap-7 overflow-y-auto py-10">
      <h1 className="sr-only">Fable 5 Chat — free AI chat on open models</h1>

      <div className="flex items-center gap-3" aria-hidden="true">
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" className="shrink-0">
          <path
            d="M17 1l2.4 9.2 8-5.2-5.2 8L31.4 17l-9.2 2.4 5.2 8-8-5.2L17 33l-2.4-10.8-8 5.2 5.2-8L2.6 17l9.2-4-5.2-8 8 5.2L17 1z"
            fill="#D97757"
          />
        </svg>
        <span className="font-serif text-4xl sm:text-5xl text-[#37322F] leading-tight">{greeting}</span>
      </div>

      <div className="w-full flex flex-col items-center gap-3">
        {children}

        {showDisclosure && (
          <div className="w-full max-w-2xl flex items-start gap-2 bg-[#FAFAF9] border border-[rgba(55,50,47,0.12)] rounded-lg px-3 py-2">
            <Info className="size-3.5 mt-0.5 shrink-0 text-[rgba(55,50,47,0.45)]" aria-hidden="true" />
            <p className="flex-1 text-[11px] text-[rgba(55,50,47,0.55)] font-sans leading-relaxed">
              This chat runs free open-weight models (GPT-OSS, Kimi, Llama, Qwen, GLM) via OpenRouter — not
              Anthropic&rsquo;s Fable 5. Busy periods may fall back to another listed model. Conversations are saved
              only in this browser.
            </p>
            <button
              onClick={dismissDisclosure}
              aria-label="Dismiss notice"
              className="shrink-0 text-[rgba(55,50,47,0.45)] hover:text-[#37322F]"
            >
              <X className="size-3.5" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {CHAT_SUGGESTIONS.map((suggestion) => {
          const Icon = SUGGESTION_ICONS[suggestion.id] ?? Lightbulb
          return (
            <button
              key={suggestion.id}
              onClick={() => onSuggestion(suggestion.prompt)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium font-sans border bg-white text-[rgba(55,50,47,0.70)] border-[rgba(55,50,47,0.14)] hover:border-[rgba(55,50,47,0.30)] hover:text-[#37322F] transition-colors"
            >
              <Icon className="size-3.5" aria-hidden="true" />
              {suggestion.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
