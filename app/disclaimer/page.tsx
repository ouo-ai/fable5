import type { Metadata } from "next"
import PageShell from "../../components/page-shell"
import { siteUrl } from "../../lib/site"

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "fable5.io is an independent resource with no official Fable 5 affiliation. What that means for model claims, AI output, and third-party data on this site.",
  alternates: { canonical: `${siteUrl}/disclaimer` },
}

const SECTION_HEADING = "text-[#37322F] text-xl font-semibold font-sans tracking-tight mt-8 mb-3"
const PARAGRAPH = "text-[rgba(55,50,47,0.75)] text-sm font-sans leading-relaxed mb-3"

export default function DisclaimerPage() {
  return (
    <PageShell>
      <article className="max-w-2xl mx-auto">
        <h1 className="text-[#37322F] text-4xl font-normal font-serif leading-tight mb-2">Disclaimer</h1>
        <p className="text-[rgba(55,50,47,0.50)] text-xs font-sans mb-8">Last updated: June 10, 2026</p>

        <h2 className={SECTION_HEADING}>Independence</h2>
        <p className={PARAGRAPH}>
          fable5.io is an independent community resource. It is not affiliated with, endorsed by, sponsored by, or
          operated by Anthropic, the developer of the Claude Fable 5 model. &ldquo;Claude&rdquo; and &ldquo;Fable&rdquo;
          are Anthropic&rsquo;s marks, used on this site only to describe the model the guide covers; no trademark
          ownership is claimed. If a rights holder has concerns, contact hello@fable5.io.
        </p>

        <h2 className={SECTION_HEADING}>No official access or insider information</h2>
        <p className={PARAGRAPH}>
          This site does not sell or provide access to the official Fable 5 model, and it has no insider information
          about unreleased products. Official channels are the Claude apps, the Claude API, AWS, Google Cloud,
          Microsoft Foundry, and authorized routers such as OpenRouter. Access notes on this site summarize public
          announcements with dates and sources. Be cautious of any third party selling &ldquo;Fable 5 access
          keys&rdquo; outside official channels.
        </p>

        <h2 className={SECTION_HEADING}>AI-generated content</h2>
        <p className={PARAGRAPH}>
          The Playground returns output from third-party open-weight models (such as GPT-OSS, Llama, Qwen, Kimi, and
          GLM) routed through OpenRouter. That output is machine-generated, may be wrong or outdated, and does not
          represent the views of fable5.io. Always verify important claims independently before acting on them.
        </p>

        <h2 className={SECTION_HEADING}>Third-party data and links</h2>
        <p className={PARAGRAPH}>
          Model names, context windows, and pricing in the model directory come from the public OpenRouter API and
          can lag behind provider changes. External links are provided for convenience; we do not control and are not
          responsible for third-party sites or services.
        </p>

        <h2 className={SECTION_HEADING}>Informational purposes only</h2>
        <p className={PARAGRAPH}>
          Everything on this site — guides, templates, comparisons, and tool output — is for general information and
          drafting purposes. It is not professional advice of any kind. Decisions you make based on this material are
          your own responsibility.
        </p>
      </article>
    </PageShell>
  )
}
