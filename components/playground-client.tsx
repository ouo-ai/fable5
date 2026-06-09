"use client"

import type React from "react"
import { useState } from "react"
import type { PlaygroundModel } from "../lib/openrouter"

const MODES = [
  { id: "refine", label: "Refine Prompt", description: "Turn a rough idea into a structured, reusable prompt" },
  { id: "creative", label: "Creative", description: "Get a live creative-writing draft from the model" },
  { id: "analytical", label: "Analytical", description: "Structured analysis with explicit assumptions" },
  { id: "safety", label: "Safety Review", description: "Check a prompt for ambiguity and risky phrasing" },
] as const

type ModeId = (typeof MODES)[number]["id"]

const MAX_PROMPT_CHARS = 4000

interface GenerateResponse {
  data: { text: string; model: string } | null
  error: { message: string; code: string } | null
}

export default function PlaygroundClient({ models }: { models: PlaygroundModel[] }) {
  const [prompt, setPrompt] = useState("")
  const [mode, setMode] = useState<ModeId>("refine")
  const [modelId, setModelId] = useState(models[0]?.id ?? "")
  const [output, setOutput] = useState<string | null>(null)
  const [servedBy, setServedBy] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerate = async () => {
    const trimmed = prompt.trim()
    if (!trimmed || isLoading) return

    setIsLoading(true)
    setError(null)
    setOutput(null)
    setServedBy(null)

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: trimmed, mode, model: modelId }),
      })
      const json = (await res.json()) as GenerateResponse
      if (!res.ok || json.error || !json.data) {
        setError(json.error?.message ?? "Something went wrong. Please try again.")
        return
      }
      setOutput(json.data.text)
      setServedBy(json.data.model)
    } catch {
      setError("Network error — check your connection and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      void handleGenerate()
    }
  }

  return (
    <div className="w-full bg-white border border-[rgba(55,50,47,0.12)] rounded-xl shadow-[0px_4px_24px_rgba(55,50,47,0.08)] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[rgba(55,50,47,0.08)] bg-[#FAFAF9]">
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" aria-hidden="true" />
        <span className="ml-1 text-[11px] text-[rgba(55,50,47,0.40)] font-medium font-sans tracking-wide">
          Fable 5 Playground — live output via OpenRouter open models
        </span>
      </div>

      <div className="p-4 sm:p-6 flex flex-col gap-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Playground mode">
          {MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              aria-pressed={mode === m.id}
              className={`px-3 py-1.5 rounded-full text-xs font-medium font-sans border transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#37322F]/30 ${
                mode === m.id
                  ? "bg-[#37322F] text-white border-[#37322F]"
                  : "bg-white text-[rgba(55,50,47,0.70)] border-[rgba(55,50,47,0.14)] hover:border-[rgba(55,50,47,0.30)] hover:text-[#37322F]"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <p className="text-[11px] text-[rgba(55,50,47,0.50)] font-sans leading-4">
          {MODES.find((m) => m.id === mode)?.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
          <label htmlFor="playground-model" className="text-xs font-medium font-sans text-[rgba(55,50,47,0.60)]">
            Model
          </label>
          <select
            id="playground-model"
            value={modelId}
            onChange={(e) => setModelId(e.target.value)}
            className="flex-1 max-w-sm px-3 py-2 text-sm font-sans text-[#37322F] bg-[#FAFAF9] border border-[rgba(55,50,47,0.14)] rounded-lg focus:outline-none focus:border-[rgba(55,50,47,0.40)]"
          >
            {models.map((m) => (
              <option key={m.id} value={m.id}>
                {m.label} — free, {Math.round(m.contextLength / 1024)}K context
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value.slice(0, MAX_PROMPT_CHARS))}
            onKeyDown={handleKeyDown}
            placeholder="Paste a draft prompt or describe your task… (Cmd+Enter to run)"
            rows={5}
            className="w-full resize-none px-4 py-3 text-sm font-sans text-[#37322F] placeholder:text-[rgba(55,50,47,0.35)] bg-[#FAFAF9] border border-[rgba(55,50,47,0.14)] rounded-lg focus:outline-none focus:border-[rgba(55,50,47,0.40)] focus:ring-2 focus:ring-[rgba(55,50,47,0.06)] transition-colors leading-relaxed"
            aria-label="Prompt to send to the model"
          />
          <div className="absolute bottom-3 right-3 text-[10px] text-[rgba(55,50,47,0.25)] font-sans">
            {prompt.length}/{MAX_PROMPT_CHARS}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => void handleGenerate()}
            disabled={!prompt.trim() || isLoading}
            className="px-5 py-2 bg-[#37322F] text-white text-sm font-medium font-sans rounded-full shadow-[0px_0px_0px_2.5px_rgba(255,255,255,0.08)_inset] hover:bg-[#2A2520] disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#37322F]/30"
          >
            {isLoading ? "Running…" : "Run on live model"}
          </button>
          <span className="text-[11px] text-[rgba(55,50,47,0.40)] font-sans">
            Free open models. Busy periods may need a retry.
          </span>
        </div>

        {error && (
          <div role="alert" className="px-4 py-3 rounded-lg border border-rose-200 bg-rose-50 text-rose-800 text-sm font-sans">
            {error}
          </div>
        )}

        {(output || isLoading) && (
          <div className="mt-1 rounded-lg border border-[rgba(55,50,47,0.12)] bg-[#FAFAF9] overflow-hidden">
            <div className="flex items-center justify-between gap-2 px-4 py-2.5 border-b border-[rgba(55,50,47,0.08)]">
              <span className="text-[11px] font-medium text-[rgba(55,50,47,0.50)] font-sans">
                {isLoading ? "Waiting for the model…" : `Output — served by ${servedBy}`}
              </span>
            </div>
            <div className="p-4">
              {isLoading ? (
                <div className="flex gap-1.5 items-center py-2" aria-label="Loading">
                  <span className="w-1.5 h-1.5 rounded-full bg-[rgba(55,50,47,0.30)] animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[rgba(55,50,47,0.30)] animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[rgba(55,50,47,0.30)] animate-bounce [animation-delay:300ms]" />
                </div>
              ) : (
                <pre className="text-xs font-mono text-[#37322F] whitespace-pre-wrap leading-relaxed max-h-[480px] overflow-y-auto">
                  {output}
                </pre>
              )}
            </div>
          </div>
        )}

        <p className="text-[11px] text-[rgba(55,50,47,0.40)] font-sans leading-relaxed">
          Output comes from third-party open-weight models routed through OpenRouter — not from an official
          &ldquo;Fable 5&rdquo; model. AI output can be wrong; verify before relying on it. Don&rsquo;t submit personal
          or confidential information.
        </p>
      </div>
    </div>
  )
}
