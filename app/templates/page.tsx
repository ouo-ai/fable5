import type { Metadata } from "next"
import Link from "next/link"
import PageShell from "../../components/page-shell"
import TemplateLibrary from "../../components/template-library"
import { TEMPLATE_COUNT } from "../../lib/templates-data"
import { siteUrl } from "../../lib/site"

export const metadata: Metadata = {
  title: "Fable 5 Prompt Templates — 42 Copy-and-Customize Scaffolds",
  description:
    "42 free Fable 5 prompt templates across creative writing, research, coding, marketing, learning, productivity, and safety review. Copy, fill the brackets, and run.",
  alternates: { canonical: `${siteUrl}/templates` },
  openGraph: {
    title: "Fable 5 Prompt Templates — 42 Copy-and-Customize Scaffolds",
    description:
      "Free prompt templates across creative writing, research, coding, marketing, learning, productivity, and safety review.",
    url: `${siteUrl}/templates`,
  },
}

export default function TemplatesPage() {
  return (
    <PageShell>
      <div className="flex flex-col items-center gap-4 text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-[#37322F] text-4xl sm:text-5xl font-normal font-serif leading-tight text-balance">
          Fable 5 prompt templates
        </h1>
        <p className="text-[rgba(55,50,47,0.70)] text-base sm:text-lg font-medium font-sans leading-relaxed text-pretty">
          {TEMPLATE_COUNT} ready-to-paste prompts for chatting with Anthropic&rsquo;s Fable 5 — across creative
          writing, research, coding, marketing, learning, productivity, and review. Fill in the [brackets], paste
          into your Claude app, or test the structure first in the{" "}
          <Link href="/playground" className="underline underline-offset-2">
            free Playground
          </Link>
          .
        </p>
      </div>

      <TemplateLibrary />

      <section aria-labelledby="template-tips" className="max-w-3xl mx-auto mt-14 flex flex-col gap-4">
        <h2 id="template-tips" className="text-[#37322F] text-2xl font-semibold font-sans tracking-tight">
          How to get the most from these templates
        </h2>
        <p className="text-[rgba(55,50,47,0.70)] text-sm font-sans leading-relaxed">
          Templates work because they pin down the parts models guess at: the role, the audience, the output format,
          and the limits. Replace every bracket before running — a half-filled template produces vague output. Change
          one variable at a time when iterating, so you know what caused the improvement. And when a customized
          version works well for Fable 5 prompt research, save your own copy; the best template library is the one
          you grow yourself.
        </p>
        <p className="text-[rgba(55,50,47,0.55)] text-xs font-sans leading-relaxed">
          All templates are original to fable5.io and free to use anywhere, with or without attribution. They are
          model-agnostic: they work in the{" "}
          <Link href="/playground" className="underline underline-offset-2">
            Playground
          </Link>{" "}
          and in any AI tool listed in the{" "}
          <Link href="/models" className="underline underline-offset-2">
            model directory
          </Link>
          .
        </p>
      </section>
    </PageShell>
  )
}
