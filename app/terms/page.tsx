import type { Metadata } from "next"
import PageShell from "../../components/page-shell"
import { siteUrl } from "../../lib/site"

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of use for fable5.io: an independent, free prompt workspace. Acceptable use of the Playground, third-party model output, and liability limits.",
  alternates: { canonical: `${siteUrl}/terms` },
}

const SECTION_HEADING = "text-[#37322F] text-xl font-semibold font-sans tracking-tight mt-8 mb-3"
const PARAGRAPH = "text-[rgba(55,50,47,0.75)] text-sm font-sans leading-relaxed mb-3"

export default function TermsPage() {
  return (
    <PageShell>
      <article className="max-w-2xl mx-auto">
        <h1 className="text-[#37322F] text-4xl font-normal font-serif leading-tight mb-2">Terms of Use</h1>
        <p className="text-[rgba(55,50,47,0.50)] text-xs font-sans mb-8">Last updated: June 10, 2026</p>

        <p className={PARAGRAPH}>
          By using fable5.io you agree to these terms. If you do not agree, please do not use the site. The short
          version: this is a free, independent informational tool — use it lawfully, expect no warranties, and verify
          AI output before relying on it.
        </p>

        <h2 className={SECTION_HEADING}>1. What the service is</h2>
        <p className={PARAGRAPH}>
          fable5.io provides a prompt-planning workspace, a prompt template library, an AI model directory, and a
          Playground that routes prompts to third-party open-weight models via OpenRouter. It is an independent
          community resource: it is not affiliated with, endorsed by, or operated by Anthropic, the developer of the
          Claude Fable 5 model, and it does not sell or provide official Fable 5 access.
        </p>

        <h2 className={SECTION_HEADING}>2. Acceptable use</h2>
        <p className={PARAGRAPH}>
          You agree not to use the Playground or any part of the site to generate or attempt to generate unlawful,
          harmful, or abusive content; to violate the usage policies of OpenRouter or the upstream model providers;
          to probe, overload, or circumvent rate limits on our API endpoints; or to scrape the service in a way that
          degrades it for others. We may block traffic that violates these rules.
        </p>

        <h2 className={SECTION_HEADING}>3. AI output and third-party services</h2>
        <p className={PARAGRAPH}>
          Playground responses are produced by third-party models outside our control. AI output can be inaccurate,
          incomplete, or biased, and is provided for evaluation and drafting purposes only — it is not professional,
          legal, medical, or financial advice. Model availability, pricing data, and behaviour can change without
          notice. You are responsible for reviewing output before using it.
        </p>

        <h2 className={SECTION_HEADING}>4. Intellectual property</h2>
        <p className={PARAGRAPH}>
          You keep all rights to the prompts you submit. The prompt templates published on this site are free to use,
          adapt, and redistribute, with or without attribution. Site design and original text are © fable5.io.
          &ldquo;Fable 5&rdquo; refers to Anthropic&rsquo;s Claude Fable 5 model; Claude and Fable are
          Anthropic&rsquo;s marks, and no trademark ownership or affiliation is claimed.
        </p>

        <h2 className={SECTION_HEADING}>5. No warranty; limitation of liability</h2>
        <p className={PARAGRAPH}>
          The service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;, without warranties of any kind,
          express or implied. To the maximum extent permitted by applicable law, fable5.io and its operators are not
          liable for any indirect, incidental, or consequential damages arising from use of the site or reliance on
          its content or AI output. The service is free of charge; our total liability for any claim is limited to
          the amount you paid to use it (zero).
        </p>

        <h2 className={SECTION_HEADING}>6. Changes and contact</h2>
        <p className={PARAGRAPH}>
          We may update these terms as the site evolves; the date above reflects the latest revision. Continued use
          after changes means acceptance. Questions: hello@fable5.io.
        </p>
      </article>
    </PageShell>
  )
}
