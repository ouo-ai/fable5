import type { Metadata } from "next"
import PageShell from "../../components/page-shell"
import { siteUrl } from "../../lib/site"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How fable5.io handles data: cookieless analytics, transient Playground prompt processing via OpenRouter, no accounts, no ads, no data sales.",
  alternates: { canonical: `${siteUrl}/privacy` },
}

const SECTION_HEADING = "text-[#37322F] text-xl font-semibold font-sans tracking-tight mt-8 mb-3"
const PARAGRAPH = "text-[rgba(55,50,47,0.75)] text-sm font-sans leading-relaxed mb-3"

export default function PrivacyPage() {
  return (
    <PageShell>
      <article className="max-w-2xl mx-auto">
        <h1 className="text-[#37322F] text-4xl font-normal font-serif leading-tight mb-2">Privacy Policy</h1>
        <p className="text-[rgba(55,50,47,0.50)] text-xs font-sans mb-8">Last updated: June 10, 2026</p>

        <p className={PARAGRAPH}>
          fable5.io is an independent informational site and prompt workspace. It has no user accounts, shows no ads,
          and sells no personal data. This page explains the two places where data is processed at all.
        </p>

        <h2 className={SECTION_HEADING}>1. Playground prompts</h2>
        <p className={PARAGRAPH}>
          When you use the Playground, the text you submit is sent through our server to OpenRouter, a third-party
          model-routing service, which forwards it to the open-weight model you selected. We do not store your
          prompts or the model output — they pass through transiently to generate the response. Our server logs
          record only technical metadata (timestamp, model id, response status, character counts), never prompt
          content.
        </p>
        <p className={PARAGRAPH}>
          OpenRouter and the upstream model providers process your prompt under their own policies, and free-tier
          model providers may retain or train on submitted data. Treat the Playground like a public tool: do not
          submit personal, confidential, or sensitive information. See the OpenRouter privacy policy at
          openrouter.ai/privacy for details on their handling.
        </p>

        <h2 className={SECTION_HEADING}>2. Analytics</h2>
        <p className={PARAGRAPH}>
          We use a self-hosted instance of Plausible Analytics, a privacy-focused, cookieless analytics tool. It
          collects aggregate statistics only — page views, referrer, country, and device class — without cookies,
          without persistent identifiers, and without tracking you across other sites. No advertising or fingerprint
          tracking scripts are present.
        </p>

        <h2 className={SECTION_HEADING}>3. Email</h2>
        <p className={PARAGRAPH}>
          If you email us (for example via the early-access link), we keep the correspondence to reply to you. We do
          not add you to marketing lists or share your address.
        </p>

        <h2 className={SECTION_HEADING}>4. Your choices</h2>
        <p className={PARAGRAPH}>
          You can use the entire site without the Playground; the home-page planner and templates run without sending
          anything to third parties. To have correspondence deleted, email hello@fable5.io. Since we hold no
          accounts and store no prompt data, there is typically nothing further to delete.
        </p>

        <h2 className={SECTION_HEADING}>5. Changes</h2>
        <p className={PARAGRAPH}>
          We will update this page if data handling changes, and adjust the date above. Material changes (for
          example, ever storing prompts) would be flagged prominently on the affected pages.
        </p>
      </article>
    </PageShell>
  )
}
