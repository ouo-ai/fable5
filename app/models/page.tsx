import type { Metadata } from "next"
import Link from "next/link"
import PageShell from "../../components/page-shell"
import ModelsTable from "../../components/models-table"
import { fetchOpenRouterModels, PLAYGROUND_MODELS, type ModelRow } from "../../lib/openrouter"
import { siteUrl } from "../../lib/site"

export const revalidate = 86400

export const metadata: Metadata = {
  title: "AI Model Directory — Context Windows & Pricing",
  description:
    "Browse 300+ AI models with context windows, prompt and output pricing, and modality — refreshed daily from the OpenRouter catalogue. Compare free models for Fable 5 prompt work.",
  alternates: { canonical: `${siteUrl}/models` },
  openGraph: {
    title: "AI Model Directory — Context Windows & Pricing",
    description:
      "300+ AI models with context windows, pricing, and modality, refreshed daily. Compare free models for prompt work.",
    url: `${siteUrl}/models`,
  },
}

async function getModelRows(): Promise<ModelRow[] | null> {
  try {
    return await fetchOpenRouterModels()
  } catch (cause) {
    console.error(
      JSON.stringify({ level: "error", event: "models_catalogue_fetch_failed", message: String(cause) }),
    )
    return null
  }
}

export default async function ModelsPage() {
  const rows = await getModelRows()

  return (
    <PageShell>
      <div className="flex flex-col items-center gap-4 text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-[#37322F] text-4xl sm:text-5xl font-normal font-serif leading-tight text-balance">
          AI model directory
        </h1>
        <p className="text-[rgba(55,50,47,0.70)] text-base sm:text-lg font-medium font-sans leading-relaxed text-pretty">
          Context windows, pricing, and modality for the models available through OpenRouter — the catalogue behind
          the <Link href="/playground" className="underline underline-offset-2">Fable 5 Playground</Link>. Data
          refreshes daily from the public OpenRouter API.
        </p>
      </div>

      <section aria-labelledby="fable5-heading" className="mb-10">
        <h2 id="fable5-heading" className="text-[#37322F] text-2xl font-semibold font-sans tracking-tight mb-4">
          Where Fable 5 sits
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 px-5 py-4 bg-[#37322F] rounded-lg text-white">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-base font-semibold font-sans">Claude Fable 5</span>
              <code className="text-[11px] font-mono text-white/60">anthropic/claude-fable-5</code>
            </div>
            <p className="mt-1 text-xs text-white/70 font-sans leading-relaxed">
              Anthropic&rsquo;s flagship, released June 9, 2026 — the most expensive and most capable Claude tier.
              Read the full breakdown in the{" "}
              <Link href="/#guide" className="underline underline-offset-2 text-white/90 hover:text-white">
                Fable 5 guide
              </Link>
              .
            </p>
          </div>
          <div className="flex gap-4 sm:gap-6 text-center shrink-0">
            <div>
              <div className="text-lg font-semibold font-serif">1M</div>
              <div className="text-[10px] text-white/60 font-sans uppercase tracking-wider">context</div>
            </div>
            <div>
              <div className="text-lg font-semibold font-serif">$10</div>
              <div className="text-[10px] text-white/60 font-sans uppercase tracking-wider">in / 1M tok</div>
            </div>
            <div>
              <div className="text-lg font-semibold font-serif">$50</div>
              <div className="text-[10px] text-white/60 font-sans uppercase tracking-wider">out / 1M tok</div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="curated-heading" className="mb-10">
        <h2 id="curated-heading" className="text-[#37322F] text-2xl font-semibold font-sans tracking-tight mb-4">
          Playground picks — free models we route to
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {PLAYGROUND_MODELS.map((model) => (
            <div
              key={model.id}
              className="flex flex-col gap-1.5 px-4 py-3 bg-white rounded-lg border border-[rgba(55,50,47,0.10)] shadow-[0px_1px_3px_rgba(55,50,47,0.05)]"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[#37322F] text-sm font-semibold font-sans">{model.label}</span>
                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 shrink-0">
                  free · {Math.round(model.contextLength / 1024)}K ctx
                </span>
              </div>
              <p className="text-xs text-[rgba(55,50,47,0.60)] font-sans leading-relaxed">{model.note}</p>
              <code className="text-[10px] text-[rgba(55,50,47,0.40)] font-mono">{model.id}</code>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[11px] text-[rgba(55,50,47,0.45)] font-sans">
          Verified working on June 10, 2026. Free routes are rate-limited upstream and can be busy at peak times — the
          Playground falls back through this list automatically.
        </p>
      </section>

      <section aria-labelledby="catalogue-heading">
        <h2 id="catalogue-heading" className="text-[#37322F] text-2xl font-semibold font-sans tracking-tight mb-4">
          Full catalogue
        </h2>
        {rows ? (
          <ModelsTable rows={rows} />
        ) : (
          <div className="px-4 py-6 rounded-lg border border-amber-200 bg-amber-50 text-amber-800 text-sm font-sans">
            The live catalogue could not be loaded right now. The curated picks above are still accurate — refresh
            this page later for the full list.
          </div>
        )}
        <p className="mt-4 text-[rgba(55,50,47,0.55)] text-xs font-sans leading-relaxed border-t border-[rgba(55,50,47,0.12)] pt-4">
          Source: the public OpenRouter models API. Prices are USD per million tokens as reported by OpenRouter and
          can change without notice — always confirm on the provider&rsquo;s page before budgeting. fable5.io is not
          affiliated with OpenRouter or any model provider; this directory exists because picking a model is step one
          of good prompt work.
        </p>
      </section>
    </PageShell>
  )
}
