"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import SiteNav from "../components/site-nav"
import FAQSection from "../components/faq-section"
import PricingSection from "../components/pricing-section"
import CTASection from "../components/cta-section"
import FooterSection from "../components/footer-section"
import TestimonialsSection from "../components/testimonials-section"
import NumbersThatSpeak from "../components/numbers-that-speak"
import EffortlessIntegration from "../components/effortless-integration-updated"
import GuideSection from "../components/guide-section"

// ─── Small pill badge ─────────────────────────────────────────────────────────
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-[rgba(2,6,23,0.08)] shadow-[0px_0px_0px_4px_rgba(55,50,47,0.05)] text-[#37322F] text-xs font-medium font-sans">
      {children}
    </div>
  )
}

// ─── Mode chip ────────────────────────────────────────────────────────────────
const MODES = [
  { id: "creative", label: "Creative", description: "Open-ended narrative & world-building" },
  { id: "analytical", label: "Analytical", description: "Structured reasoning & fact comparison" },
  { id: "safety", label: "Safety Check", description: "Review prompt for responsible use" },
  { id: "compare", label: "Compare", description: "Side-by-side model comparison notes" },
  { id: "template", label: "Template", description: "Generate a reusable prompt scaffold" },
] as const

type ModeId = (typeof MODES)[number]["id"]

// ─── Mock guidance generator ──────────────────────────────────────────────────
function generateGuidance(prompt: string, mode: ModeId): string {
  const trimmed = prompt.trim()
  if (!trimmed) return ""

  const base = trimmed.length > 60 ? trimmed.slice(0, 60) + "…" : trimmed

  const plans: Record<ModeId, string> = {
    creative: `Fable 5 Prompt Plan — Creative Mode\n\nYour prompt: "${base}"\n\n1. Context Setup\n   Set the scene with vivid sensory details before introducing your main subject. Fable 5 AI responds well to immersive opening clauses.\n\n2. Narrative Directive\n   Add a clear narrative goal: "Write a short story where…" or "Describe the world as seen by…"\n\n3. Style Constraint\n   Optionally append a style note: "in the tone of a folktale" or "with sparse, precise language".\n\n4. Output Format\n   Specify length: "in under 300 words" keeps Fable 5 model responses focused.\n\nSuggested refinement:\n"${trimmed}. Write in vivid, immersive prose. Keep it under 350 words."`,

    analytical: `Fable 5 Prompt Plan — Analytical Mode\n\nYour prompt: "${base}"\n\n1. Frame the Question\n   Restate your prompt as a clear question with measurable scope.\n\n2. Request Structure\n   Ask for a numbered list, table, or pros/cons breakdown so Fable 5 AI returns scannable output.\n\n3. Source Caveat\n   Include "based on publicly available information as of your training cutoff" to keep claims grounded.\n\n4. Depth Control\n   Add "in 200 words or fewer" to prevent over-generation.\n\nSuggested refinement:\n"Provide a structured comparison of ${trimmed}. Use a numbered list. Limit to 200 words."`,

    safety: `Fable 5 Prompt Plan — Safety Checklist\n\nReviewing: "${base}"\n\n[PASS] No obvious personally identifiable information detected.\n[PASS] Prompt does not request instructions for harmful activities.\n[REVIEW] Verify the subject matter is within Fable 5 model acceptable use policy.\n[REVIEW] Consider adding "for educational purposes" if the topic is sensitive.\n[INFO] This tool does not connect to a live Fable 5 API — results are structural guidance only.\n\nRecommendation:\nPrompt appears low-risk. Add explicit context about your use-case to improve output quality and reduce ambiguity.`,

    compare: `Fable 5 Prompt Plan — Comparison Notes\n\nSubject: "${base}"\n\nFable 5 AI planning checklist:\n• Define the exact task you want to test\n• Record the prompt format, length, and constraints\n• Compare outputs against the same prompt in your available tools\n• Mark unverified claims as assumptions until you can source them\n\nOther model notes:\n• Check tool access, context limits, pricing, and safety policy\n• Keep a dated record of the model and settings used\n• Prefer repeatable prompts over one-off impressions\n\nConclusion for your prompt:\nUse this plan to compare Fable 5 model notes without treating unsourced claims as benchmarks.`,

    template: `Fable 5 Prompt Template — Reusable Scaffold\n\nGenerated from: "${base}"\n\n---\nROLE: [Specify the persona Fable 5 AI should adopt, e.g. "expert analyst"]\nCONTEXT: [One sentence of background: who, what, when, why]\nTASK: ${trimmed}\nFORMAT: [e.g. "Bullet list / numbered steps / prose paragraph"]\nCONSTRAINT: [e.g. "Under 250 words. No jargon. Avoid speculation."]\nTONE: [e.g. "Professional and concise" or "Conversational"]\n---\n\nUsage tip: Fill in each bracket and paste into your Fable 5 AI session. Explicit role + format instructions consistently improve output quality.`,
  }

  return plans[mode]
}

// ─── Prompt Planner Component ─────────────────────────────────────────────────
function PromptPlanner() {
  const [input, setInput] = useState("")
  const [selectedMode, setSelectedMode] = useState<ModeId>("creative")
  const [guidance, setGuidance] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = () => {
    if (!input.trim()) return
    setIsGenerating(true)
    setGuidance(null)
    // Simulate a brief processing delay for UX clarity
    setTimeout(() => {
      setGuidance(generateGuidance(input, selectedMode))
      setIsGenerating(false)
    }, 600)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleGenerate()
    }
  }

  return (
    <section
      id="prompt-planner"
      aria-label="Fable 5 Prompt Planner"
      className="w-full bg-white border border-[rgba(55,50,47,0.12)] rounded-xl shadow-[0px_4px_24px_rgba(55,50,47,0.08)] overflow-hidden"
    >
      {/* Top bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[rgba(55,50,47,0.08)] bg-[#FAFAF9]">
        <div className="w-2.5 h-2.5 rounded-full bg-[rgba(55,50,47,0.15)]" aria-hidden="true" />
        <div className="w-2.5 h-2.5 rounded-full bg-[rgba(55,50,47,0.10)]" aria-hidden="true" />
        <div className="w-2.5 h-2.5 rounded-full bg-[rgba(55,50,47,0.07)]" aria-hidden="true" />
        <span className="ml-2 text-[11px] text-[rgba(55,50,47,0.40)] font-medium font-sans tracking-wide">
          Fable 5 Prompt Planner — demo workspace
        </span>
      </div>

      <div className="p-4 sm:p-6 flex flex-col gap-4">
        {/* Mode chips */}
        <div className="flex flex-wrap gap-2" role="group" aria-label="Prompt mode">
          {MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelectedMode(m.id)}
              aria-pressed={selectedMode === m.id}
              className={`px-3 py-1.5 rounded-full text-xs font-medium font-sans border transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#37322F]/30 ${
                selectedMode === m.id
                  ? "bg-[#37322F] text-white border-[#37322F]"
                  : "bg-white text-[rgba(55,50,47,0.70)] border-[rgba(55,50,47,0.14)] hover:border-[rgba(55,50,47,0.30)] hover:text-[#37322F]"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Selected mode description */}
        <p className="text-[11px] text-[rgba(55,50,47,0.50)] font-sans leading-4">
          {MODES.find((m) => m.id === selectedMode)?.description}
        </p>

        {/* Text input */}
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Describe what you want to do with Fable 5 AI… (Cmd+Enter to generate)"
            rows={3}
            className="w-full resize-none px-4 py-3 text-sm font-sans text-[#37322F] placeholder:text-[rgba(55,50,47,0.35)] bg-[#FAFAF9] border border-[rgba(55,50,47,0.14)] rounded-lg focus:outline-none focus:border-[rgba(55,50,47,0.40)] focus:ring-2 focus:ring-[rgba(55,50,47,0.06)] transition-colors leading-relaxed"
            aria-label="Describe your Fable 5 AI task"
          />
          <div className="absolute bottom-3 right-3 text-[10px] text-[rgba(55,50,47,0.25)] font-sans">
            {input.length}/500
          </div>
        </div>

        {/* Generate button */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleGenerate}
            disabled={!input.trim() || isGenerating}
            className="px-5 py-2 bg-[#37322F] text-white text-sm font-medium font-sans rounded-full shadow-[0px_0px_0px_2.5px_rgba(255,255,255,0.08)_inset] hover:bg-[#2A2520] disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#37322F]/30"
          >
            {isGenerating ? "Generating…" : "Generate Prompt Plan"}
          </button>
          <span className="text-[11px] text-[rgba(55,50,47,0.40)] font-sans">
            Structured guidance, not live model output
          </span>
        </div>

        {/* Output preview */}
        {(guidance || isGenerating) && (
          <div className="mt-1 rounded-lg border border-[rgba(55,50,47,0.12)] bg-[#FAFAF9] overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[rgba(55,50,47,0.08)]">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="text-[rgba(55,50,47,0.50)]"
                aria-hidden="true"
              >
                <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2" />
                <path d="M6 5v3M6 4h.01" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <span className="text-[11px] font-medium text-[rgba(55,50,47,0.50)] font-sans">
                Fable 5 prompt plan — demo output
              </span>
            </div>
            <div className="p-4">
              {isGenerating ? (
                <div className="flex gap-1.5 items-center py-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[rgba(55,50,47,0.30)] animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[rgba(55,50,47,0.30)] animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[rgba(55,50,47,0.30)] animate-bounce [animation-delay:300ms]" />
                </div>
              ) : (
                <pre className="text-xs font-mono text-[#37322F] whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto">
                  {guidance}
                </pre>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

// ─── Stats bar ────────────────────────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { value: "1M", label: "context tokens" },
    { value: "128K", label: "max output tokens" },
    { value: "$10 / $50", label: "API price per 1M tokens" },
    { value: "42", label: "free prompt templates" },
  ]
  return (
    <div className="w-full border-t border-b border-[rgba(55,50,47,0.12)] flex flex-wrap justify-center gap-0">
      {stats.map((s, i) => (
        <div
          key={i}
          className="flex-1 min-w-[120px] px-6 py-5 flex flex-col items-center justify-center gap-1 border-r border-[rgba(55,50,47,0.08)] last:border-r-0"
        >
          <span className="text-[#37322F] text-2xl sm:text-3xl font-semibold font-serif leading-tight">{s.value}</span>
          <span className="text-[rgba(55,50,47,0.55)] text-xs font-medium font-sans uppercase tracking-wider">
            {s.label}
          </span>
        </div>
      ))}
    </div>
  )
}

// ─── Feature highlight row ────────────────────────────────────────────────────
interface FeatureHighlightProps {
  label: string
  title: string
  description: string
  visual: React.ReactNode
  reverse?: boolean
}

function FeatureHighlight({ label, title, description, visual, reverse = false }: FeatureHighlightProps) {
  return (
    <div
      className={`w-full flex flex-col ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-stretch border-b border-[rgba(55,50,47,0.12)]`}
    >
      {/* Text side */}
      <div className="flex-1 px-6 sm:px-10 py-10 sm:py-14 flex flex-col justify-center gap-4">
        <Pill>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <circle cx="5" cy="5" r="3" fill="#37322F" />
          </svg>
          {label}
        </Pill>
        <h2 className="text-[#37322F] text-2xl sm:text-3xl lg:text-4xl font-semibold font-sans leading-tight tracking-tight text-balance">
          {title}
        </h2>
        <p className="text-[rgba(55,50,47,0.70)] text-base font-normal font-sans leading-relaxed">{description}</p>
      </div>

      {/* Visual side */}
      <div className="flex-1 border-t lg:border-t-0 lg:border-l border-[rgba(55,50,47,0.12)] flex items-center justify-center p-6 sm:p-10 bg-[#FAFAF9] min-h-[280px]">
        {visual}
      </div>
    </div>
  )
}

// ─── Mode preview card ────────────────────────────────────────────────────────
function ModePreviewCard({ mode, index }: { mode: (typeof MODES)[number]; index: number }) {
  const colors = [
    "bg-amber-50 border-amber-200 text-amber-800",
    "bg-sky-50 border-sky-200 text-sky-800",
    "bg-emerald-50 border-emerald-200 text-emerald-800",
    "bg-violet-50 border-violet-200 text-violet-800",
    "bg-rose-50 border-rose-200 text-rose-800",
  ]
  return (
    <div className={`rounded-lg border px-3 py-2.5 text-xs font-medium font-sans ${colors[index % colors.length]}`}>
      <div className="font-semibold mb-0.5">{mode.label}</div>
      <div className="opacity-70 font-normal leading-4">{mode.description}</div>
    </div>
  )
}

// ─── Access tracker visual ────────────────────────────────────────────────────
function AccessTracker() {
  // Availability as of June 10, 2026 — sources: Anthropic announcement, OpenRouter catalogue.
  const items = [
    { label: "Claude API — claude-fable-5", status: "live", date: "Jun 9, 2026" },
    { label: "Claude apps — Pro, Max, Team, Enterprise", status: "included", date: "to Jun 22" },
    { label: "OpenRouter — anthropic/claude-fable-5", status: "live", date: "Now" },
    { label: "AWS, Google Cloud, Microsoft Foundry", status: "live", date: "Now" },
    { label: "GitHub Copilot", status: "live", date: "GA" },
  ]
  const statusStyles: Record<string, string> = {
    live: "bg-emerald-100 text-emerald-700",
    included: "bg-sky-100 text-sky-700",
  }
  return (
    <div className="w-full max-w-sm flex flex-col gap-2.5">
      {items.map((item, i) => (
        <div key={i} className="flex items-center justify-between gap-3 px-3 py-2.5 bg-white rounded-lg border border-[rgba(55,50,47,0.10)] shadow-[0px_1px_3px_rgba(55,50,47,0.05)]">
          <span className="text-[#37322F] text-xs font-medium font-sans flex-1 min-w-0 truncate">{item.label}</span>
          <span className="text-[10px] text-[rgba(55,50,47,0.45)] font-sans shrink-0">{item.date}</span>
          <span className={`text-[10px] font-medium font-sans px-2 py-0.5 rounded-full shrink-0 ${statusStyles[item.status]}`}>
            {item.status}
          </span>
        </div>
      ))}
    </div>
  )
}

// ─── Prompt template gallery ──────────────────────────────────────────────────
function TemplateGallery() {
  const templates = [
    "Explain [concept] as if I'm new to Fable 5 AI",
    "Write a [genre] story set in [world] in under 400 words",
    "Compare Fable 5 model to [X] for [task]",
    "Create a safety checklist for [sensitive topic]",
    "Generate 5 headline variants for [product]",
    "Summarize [topic] with pros, cons, and verdict",
  ]
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
      {templates.map((t, i) => (
        <div
          key={i}
          className="px-3 py-2.5 bg-white border border-[rgba(55,50,47,0.10)] rounded-lg text-xs text-[#37322F] font-sans leading-relaxed shadow-[0px_1px_3px_rgba(55,50,47,0.04)] hover:border-[rgba(55,50,47,0.25)] transition-colors cursor-default"
        >
          {t}
        </div>
      ))}
    </div>
  )
}

// ─── Comparison table ─────────────────────────────────────────────────────────
function ComparisonTable() {
  // Public specs as of June 10, 2026 — Anthropic API docs and OpenRouter catalogue.
  const rows = [
    { feature: "Context window", fable5: "1M tokens", others: "1M · 1M" },
    { feature: "Max output", fable5: "128K tokens", others: "128K · 64K" },
    { feature: "Input price / 1M tokens", fable5: "$10", others: "$5 · $3" },
    { feature: "Output price / 1M tokens", fable5: "$50", others: "$25 · $15" },
    { feature: "Thinking", fable5: "Adaptive only", others: "Adaptive" },
    { feature: "Tier", fable5: "Flagship — above Opus", others: "Opus · Sonnet" },
  ]
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-[rgba(55,50,47,0.12)]">
      <table className="w-full text-xs font-sans border-collapse">
        <thead>
          <tr className="bg-[#F7F5F3]">
            <th className="text-left px-3 py-2.5 text-[rgba(55,50,47,0.55)] font-medium border-b border-[rgba(55,50,47,0.10)]">
              Spec
            </th>
            <th className="text-left px-3 py-2.5 text-[#37322F] font-semibold border-b border-[rgba(55,50,47,0.10)]">
              Fable 5
            </th>
            <th className="text-left px-3 py-2.5 text-[rgba(55,50,47,0.55)] font-medium border-b border-[rgba(55,50,47,0.10)]">
              Opus 4.8 · Sonnet 4.6
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="bg-white even:bg-[#FAFAF9]">
              <td className="px-3 py-2 text-[rgba(55,50,47,0.70)] border-b border-[rgba(55,50,47,0.06)]">{r.feature}</td>
              <td className="px-3 py-2 text-[#37322F] font-medium border-b border-[rgba(55,50,47,0.06)]">{r.fable5}</td>
              <td className="px-3 py-2 text-[rgba(55,50,47,0.60)] border-b border-[rgba(55,50,47,0.06)]">{r.others}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="px-3 py-2 text-[10px] text-[rgba(55,50,47,0.40)] font-sans bg-[#FAFAF9] border-t border-[rgba(55,50,47,0.08)]">
        Public specs as of June 10, 2026, from Anthropic&rsquo;s announcement and API docs. Independent
        site — verify with official sources before budgeting.
      </p>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Fable5Page() {
  return (
    <main className="w-full min-h-screen relative bg-[#F7F5F3] overflow-x-hidden flex flex-col items-center">
      {/* Vertical rail lines */}
      <div
        className="pointer-events-none absolute inset-y-0 left-1/2 w-full max-w-[1060px] -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="w-px h-full absolute left-0 top-0 bg-[rgba(55,50,47,0.12)] shadow-[1px_0px_0px_white] hidden lg:block" />
        <div className="w-px h-full absolute right-0 top-0 bg-[rgba(55,50,47,0.12)] shadow-[1px_0px_0px_white] hidden lg:block" />
      </div>

      {/* ── Sticky nav ─────────────────────────── */}
      <div className="w-full max-w-[1060px] relative pt-[9px]">
        <SiteNav />

        {/* ── Hero / Prompt Planner (first viewport) ─ */}
        <section className="pt-24 sm:pt-28 lg:pt-36 pb-10 px-4 sm:px-6 lg:px-0 flex flex-col items-center gap-6 border-b border-[rgba(55,50,47,0.12)]">
          {/* Headline */}
          <div className="flex flex-col items-center gap-4 text-center max-w-3xl">
            <Pill>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path d="M5 1l1.2 2.5L9 4.1 7 6l.5 2.8L5 7.5 2.5 8.8 3 6 1 4.1l2.8-.6L5 1z" fill="#37322F" />
              </svg>
              Independent guide — not affiliated with Anthropic
            </Pill>
            <h1 className="text-[#37322F] text-4xl sm:text-5xl lg:text-[72px] font-normal font-serif leading-tight lg:leading-[1.1] text-balance">
              Your Fable 5 AI prompt workspace
            </h1>
            <p className="text-[rgba(55,50,47,0.70)] text-base sm:text-lg font-medium font-sans leading-relaxed max-w-xl text-pretty">
              Plan, structure, and refine prompts for{" "}
              <strong className="font-semibold text-[#37322F]">Anthropic&rsquo;s Fable 5 model</strong> — the newest
              Claude flagship. Specs, pricing, access channels, templates, and a free testing playground in one
              independent workspace.
            </p>
          </div>

          {/* Prompt planner widget — first usable experience */}
          <div className="w-full max-w-2xl">
            <PromptPlanner />
            <p className="mt-3 text-center text-xs text-[rgba(55,50,47,0.55)] font-sans">
              Want a real conversation?{" "}
              <Link href="/chat" className="underline underline-offset-2 hover:text-[#37322F]">
                Open the Chat →
              </Link>
            </p>
          </div>

          {/* Disclaimer */}
          <p className="text-[11px] text-[rgba(55,50,47,0.40)] font-sans text-center max-w-lg text-balance">
            fable5.io is an independent community resource — not affiliated with Anthropic. No official Fable 5
            access is sold here; the free Playground runs open-weight models, not Fable 5 itself.
          </p>
        </section>

        {/* ── Stats ──────────────────────────────── */}
        <StatsBar />

        {/* ── Feature sections ───────────────────── */}
        <div id="features" className="w-full">
          <FeatureHighlight
            label="5 Prompt Modes"
            title="Structured guidance for every Fable 5 use case"
            description="Switch between Creative, Analytical, Safety Check, Compare, and Template modes. Each mode produces a structured Fable 5 prompt plan with step-by-step refinement instructions."
            visual={
              <div className="w-full max-w-xs flex flex-col gap-2">
                {MODES.map((m, i) => (
                  <ModePreviewCard key={m.id} mode={m} index={i} />
                ))}
              </div>
            }
          />

          <FeatureHighlight
            reverse
            label="Access Tracker"
            title="Track Fable 5 model availability in one place"
            description="Where Fable 5 is live right now — the Claude apps, the Claude API, AWS, Google Cloud, Microsoft Foundry, GitHub Copilot, and OpenRouter — with a date for every channel."
            visual={<AccessTracker />}
          />

          <FeatureHighlight
            label="Prompt Templates"
            title="42 ready-to-use Fable 5 prompt templates"
            description="Copy, customize, and paste prompts built for Fable 5 chat — creative writing, research, coding, marketing, learning, productivity, and safety review."
            visual={<TemplateGallery />}
          />

          <FeatureHighlight
            reverse
            label="Model Comparison"
            title="Fable 5 specs vs other Claude models"
            description="Context window, output limits, and API pricing for Fable 5 next to Claude Opus 4.8 and Sonnet 4.6 — public data, clearly dated and sourced."
            visual={<ComparisonTable />}
          />
        </div>

        {/* ── Numbers / social proof ──────────────── */}
        <div className="w-full border-t border-b border-[rgba(55,50,47,0.12)] flex flex-col lg:flex-row">
          <div className="flex-1 px-6 sm:px-10 py-10 sm:py-14 flex flex-col justify-center gap-4 border-b lg:border-b-0 lg:border-r border-[rgba(55,50,47,0.12)]">
            <Pill>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <rect x="1" y="4" width="2" height="5" fill="#37322F" />
                <rect x="4" y="2" width="2" height="7" fill="#37322F" />
                <rect x="7" y="0" width="2" height="9" fill="#37322F" />
              </svg>
              Workspace coverage
            </Pill>
            <h2 className="text-[#37322F] text-3xl sm:text-4xl font-semibold font-sans leading-tight tracking-tight text-balance">
              Built for cautious Fable 5 AI research
            </h2>
            <p className="text-[rgba(55,50,47,0.70)] text-base font-normal font-sans leading-relaxed">
              fable5.io helps researchers, writers, and developers keep Fable 5 AI prompts, assumptions, and source
              notes organized before they test anything in a real model environment.
            </p>
          </div>
          <div className="flex-1 flex items-center justify-center p-6 sm:p-10 bg-[#FAFAF9]">
            <NumbersThatSpeak width={380} height={260} />
          </div>
        </div>

        {/* ── Integration / ecosystem ─────────────── */}
        <div className="w-full border-b border-[rgba(55,50,47,0.12)] flex flex-col lg:flex-row-reverse">
          <div className="flex-1 px-6 sm:px-10 py-10 sm:py-14 flex flex-col justify-center gap-4 border-b lg:border-b-0 lg:border-l border-[rgba(55,50,47,0.12)]">
            <Pill>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <circle cx="2" cy="5" r="1.5" fill="#37322F" />
                <circle cx="8" cy="2" r="1.5" fill="#37322F" />
                <circle cx="8" cy="8" r="1.5" fill="#37322F" />
                <line x1="3.5" y1="4.5" x2="6.5" y2="2.5" stroke="#37322F" strokeWidth="0.8" />
                <line x1="3.5" y1="5.5" x2="6.5" y2="7.5" stroke="#37322F" strokeWidth="0.8" />
              </svg>
              Ecosystem awareness
            </Pill>
            <h2 className="text-[#37322F] text-3xl sm:text-4xl font-semibold font-sans leading-tight tracking-tight text-balance">
              Fable 5 AI within the broader model landscape
            </h2>
            <p className="text-[rgba(55,50,47,0.70)] text-base font-normal font-sans leading-relaxed">
              Plan how Fable 5 research fits with your current AI tools. The workflow map keeps prompt drafts, source
              checks, safety review, and comparison notes in a repeatable loop.
            </p>
          </div>
          <div className="flex-1 flex items-center justify-center p-6 sm:p-10 bg-[#FAFAF9]">
            <EffortlessIntegration width={380} height={280} />
          </div>
        </div>

        {/* ── Fable 5 guide ───────────────────────── */}
        <GuideSection />

        {/* ── Testimonials ────────────────────────── */}
        <TestimonialsSection />

        {/* ── Pricing ─────────────────────────────── */}
        <div id="pricing">
          <PricingSection />
        </div>

        {/* ── FAQ ─────────────────────────────────── */}
        <div id="faq" className="w-full border-t border-[rgba(55,50,47,0.12)]">
          <FAQSection />
        </div>

        {/* ── CTA ─────────────────────────────────── */}
        <CTASection />

        {/* ── Footer ──────────────────────────────── */}
        <FooterSection />
      </div>
    </main>
  )
}
