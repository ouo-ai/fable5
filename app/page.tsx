import type React from "react"
import Link from "next/link"
import { ArrowUp, Plus } from "lucide-react"
import SiteNav from "../components/site-nav"
import FAQSection from "../components/faq-section"
import PricingSection from "../components/pricing-section"
import CTASection from "../components/cta-section"
import FooterSection from "../components/footer-section"
import TestimonialsSection from "../components/testimonials-section"
import NumbersThatSpeak from "../components/numbers-that-speak"
import EffortlessIntegration from "../components/effortless-integration-updated"
import GuideSection from "../components/guide-section"
import { CHAT_SUGGESTIONS } from "../lib/chat-config"

// ─── Small pill badge ─────────────────────────────────────────────────────────
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-[rgba(2,6,23,0.08)] shadow-[0px_0px_0px_4px_rgba(55,50,47,0.05)] text-[#37322F] text-xs font-medium font-sans">
      {children}
    </div>
  )
}

// ─── Chat teaser — the hero entry point into /chat ────────────────────────────
function ChatTeaser() {
  return (
    <div className="w-full max-w-2xl flex flex-col gap-3">
      <Link
        href="/chat"
        aria-label="Open the chat"
        className="block bg-white border border-[rgba(55,50,47,0.12)] rounded-2xl shadow-[0px_4px_24px_rgba(55,50,47,0.08)] hover:border-[rgba(55,50,47,0.30)] hover:shadow-[0px_6px_28px_rgba(55,50,47,0.12)] transition-all"
      >
        <div className="px-4 pt-4 pb-8 text-left text-[15px] font-sans text-[rgba(55,50,47,0.40)]">
          How can I help you today?
        </div>
        <div className="flex items-center justify-between px-3 pb-3">
          <span
            className="flex items-center justify-center size-8 rounded-full text-[rgba(55,50,47,0.40)] opacity-50"
            aria-hidden="true"
          >
            <Plus className="size-4" />
          </span>
          <span className="flex items-center gap-2.5">
            <span className="text-xs font-sans text-[rgba(55,50,47,0.60)]">GPT-OSS 120B · free</span>
            <span
              className="flex items-center justify-center size-8 rounded-full bg-[#37322F] text-white"
              aria-hidden="true"
            >
              <ArrowUp className="size-4" />
            </span>
          </span>
        </div>
      </Link>

      <div className="flex flex-wrap justify-center gap-2">
        {CHAT_SUGGESTIONS.map((suggestion) => (
          <Link
            key={suggestion.id}
            href={`/chat?q=${encodeURIComponent(suggestion.prompt)}`}
            className="px-3 py-1.5 rounded-full text-xs font-medium font-sans border bg-white text-[rgba(55,50,47,0.70)] border-[rgba(55,50,47,0.14)] hover:border-[rgba(55,50,47,0.30)] hover:text-[#37322F] transition-colors"
          >
            {suggestion.label}
          </Link>
        ))}
      </div>

      <p className="text-center text-xs text-[rgba(55,50,47,0.55)] font-sans">
        Free streaming chat on open models — no account needed.{" "}
        <Link href="/chat" className="underline underline-offset-2 hover:text-[#37322F]">
          Open the Chat →
        </Link>
      </p>
    </div>
  )
}

// ─── Chat preview visual (feature section) ────────────────────────────────────
function ChatPreview() {
  return (
    <div className="w-full max-w-sm bg-white border border-[rgba(55,50,47,0.12)] rounded-xl shadow-[0px_4px_24px_rgba(55,50,47,0.08)] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[rgba(55,50,47,0.08)] bg-[#FAFAF9]">
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" aria-hidden="true" />
        <span className="text-[11px] text-[rgba(55,50,47,0.40)] font-medium font-sans tracking-wide">
          fable5 chat — live open models
        </span>
      </div>
      <div className="p-4 flex flex-col gap-3">
        <div className="flex justify-end">
          <div className="max-w-[85%] bg-[#F7F5F3] border border-[rgba(55,50,47,0.10)] rounded-2xl px-3 py-2 text-xs font-sans text-[#37322F]">
            Explain Fable 5&rsquo;s pricing in one line
          </div>
        </div>
        <p className="text-xs font-sans text-[rgba(55,50,47,0.75)] leading-relaxed">
          Fable 5 costs $10 per million input tokens and $50 per million output — double Opus 4.8 — with a 1M-token
          context window.
        </p>
        <div className="flex items-center justify-between px-3 py-2 border border-[rgba(55,50,47,0.12)] rounded-full">
          <span className="text-[11px] font-sans text-[rgba(55,50,47,0.35)]">Reply…</span>
          <span
            className="flex items-center justify-center size-5 rounded-full bg-[#37322F] text-white"
            aria-hidden="true"
          >
            <ArrowUp className="size-3" />
          </span>
        </div>
      </div>
    </div>
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

        {/* ── Hero / Chat entry (first viewport) ─── */}
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
              Claude flagship. Specs, pricing, access channels, templates, and a free chat workspace in one
              independent place.
            </p>
          </div>

          {/* Chat entry — leads into /chat */}
          <ChatTeaser />

          {/* Disclaimer */}
          <p className="text-[11px] text-[rgba(55,50,47,0.40)] font-sans text-center max-w-lg text-balance">
            fable5.io is an independent community resource — not affiliated with Anthropic. No official Fable 5
            access is sold here; the free chat runs open-weight models, not Fable 5 itself.
          </p>
        </section>

        {/* ── Stats ──────────────────────────────── */}
        <StatsBar />

        {/* ── Feature sections ───────────────────── */}
        <div id="features" className="w-full">
          <FeatureHighlight
            label="Live Chat"
            title="A free chat workspace for Fable 5 research"
            description="Claude-style, full-screen streaming chat on free open models: Markdown answers, model picker, and history saved in your browser. No account, no cost — practice your Fable 5 prompt ideas live before spending tokens."
            visual={<ChatPreview />}
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
