import type { Metadata } from "next"
import Link from "next/link"
import PageShell from "../../components/page-shell"
import PlaygroundClient from "../../components/playground-client"
import { PLAYGROUND_MODELS } from "../../lib/openrouter"
import { siteUrl } from "../../lib/site"

export const metadata: Metadata = {
  title: "Fable 5 AI Playground — Test Prompts on Live Models",
  description:
    "Run Fable 5 prompts on live open-weight AI models for free. Refine prompts, draft creative writing, and review prompt safety with real model output via OpenRouter.",
  alternates: { canonical: `${siteUrl}/playground` },
  openGraph: {
    title: "Fable 5 AI Playground — Test Prompts on Live Models",
    description:
      "Run Fable 5 prompts on live open-weight AI models for free: refine, draft, analyze, and safety-check with real output.",
    url: `${siteUrl}/playground`,
  },
}

export default function PlaygroundPage() {
  return (
    <PageShell>
      <div className="flex flex-col items-center gap-4 text-center max-w-2xl mx-auto mb-8">
        <h1 className="text-[#37322F] text-4xl sm:text-5xl font-normal font-serif leading-tight text-balance">
          Fable 5 AI Playground
        </h1>
        <p className="text-[rgba(55,50,47,0.70)] text-base sm:text-lg font-medium font-sans leading-relaxed text-pretty">
          Test a single prompt on real, free open-weight models. The Playground is the scalpel for refining one
          prompt — for a full back-and-forth conversation, use the{" "}
          <Link href="/chat" className="underline underline-offset-2">
            Chat
          </Link>
          .
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <PlaygroundClient models={PLAYGROUND_MODELS} />
        <p className="mt-3 text-center text-xs text-[rgba(55,50,47,0.55)] font-sans">
          Prefer a back-and-forth conversation?{" "}
          <Link href="/chat" className="underline underline-offset-2 hover:text-[#37322F]">
            Try the Chat →
          </Link>
        </p>
      </div>

      <section aria-labelledby="playground-how" className="max-w-3xl mx-auto mt-12 flex flex-col gap-6">
        <h2 id="playground-how" className="text-[#37322F] text-2xl sm:text-3xl font-semibold font-sans tracking-tight">
          How the Playground works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2">
            <h3 className="text-[#37322F] text-base font-semibold font-sans">1. Pick a mode and model</h3>
            <p className="text-[rgba(55,50,47,0.70)] text-sm font-sans leading-relaxed">
              Four modes cover the common jobs: refining a prompt, drafting creative text, structured analysis, and
              prompt-safety review. Models are curated free routes from the{" "}
              <Link href="/models" className="underline underline-offset-2 hover:text-[#37322F]">
                model directory
              </Link>
              .
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-[#37322F] text-base font-semibold font-sans">2. Run on a live model</h3>
            <p className="text-[rgba(55,50,47,0.70)] text-sm font-sans leading-relaxed">
              Your prompt is sent server-side to OpenRouter with automatic fallback: if one free provider is busy, the
              request is rerouted to the next model in the list, and the output header shows which model answered.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-[#37322F] text-base font-semibold font-sans">3. Save what works</h3>
            <p className="text-[rgba(55,50,47,0.70)] text-sm font-sans leading-relaxed">
              When a refined prompt performs well, keep it. The{" "}
              <Link href="/templates" className="underline underline-offset-2 hover:text-[#37322F]">
                template library
              </Link>{" "}
              has 40+ proven scaffolds you can adapt instead of starting from scratch.
            </p>
          </div>
        </div>
        <p className="text-[rgba(55,50,47,0.55)] text-xs font-sans leading-relaxed border-t border-[rgba(55,50,47,0.12)] pt-4">
          Transparency: Anthropic&rsquo;s Fable 5 is a paid model ($10/$50 per million tokens via the Claude API), so
          this free Playground runs open-weight models (GPT-OSS, Kimi, Llama, Qwen, GLM) through OpenRouter instead —
          use it to refine prompt structure, then run the finished prompt in your own Claude app or API account.
          Requests are rate-limited per visitor to keep the service free. See the{" "}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-[#37322F]">
            privacy policy
          </Link>{" "}
          for how prompt data is handled.
        </p>
      </section>
    </PageShell>
  )
}
