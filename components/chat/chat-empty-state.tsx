"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { ChartColumn, Code, GraduationCap, Lightbulb, PenLine } from "lucide-react"
import { CHAT_SUGGESTIONS } from "../../lib/chat-config"

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

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- post-hydration swap keeps SSR HTML stable
    setGreeting(greetingForHour(new Date().getHours()))
  }, [])

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 gap-7 overflow-y-auto py-10">
      <h1 className="sr-only">Fable 5 Chat — free AI chat assistant</h1>

      <div className="flex items-center gap-3" aria-hidden="true">
        <svg width="34" height="34" viewBox="0 0 34 34" fill="none" className="shrink-0">
          <path
            d="M17 1l2.4 9.2 8-5.2-5.2 8L31.4 17l-9.2 2.4 5.2 8-8-5.2L17 33l-2.4-10.8-8 5.2 5.2-8L2.6 17l9.2-4-5.2-8 8 5.2L17 1z"
            fill="#D97757"
          />
        </svg>
        <span className="font-serif text-4xl sm:text-5xl text-[#37322F] leading-tight">{greeting}</span>
      </div>

      <div className="w-full flex flex-col items-center">{children}</div>

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
