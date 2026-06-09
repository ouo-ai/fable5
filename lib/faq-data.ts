export interface FAQItem {
  question: string
  answer: string
}

/**
 * Single source of truth for FAQ content.
 * Rendered visibly in components/faq-section.tsx and emitted as
 * FAQPage JSON-LD in app/layout.tsx — keep both in sync by editing here only.
 */
export const faqData: FAQItem[] = [
  {
    question: "What is Fable 5?",
    answer:
      "Fable 5 is an AI model name that people search for when they want prompt ideas, access updates, and model comparisons. fable5.io is an independent guide and prompt workspace built around that topic: it helps you plan structured Fable 5 prompts, keep source notes, and separate verified information from assumptions.",
  },
  {
    question: "Is fable5.io an official Fable 5 product?",
    answer:
      "No. fable5.io is an independent community resource and prompt workspace. It does not claim affiliation with any official Fable 5 publisher, developer, model provider, or platform owner.",
  },
  {
    question: "Does the Fable 5 prompt planner use the live Fable 5 AI model?",
    answer:
      "No. The prompt planner generates structured guidance and prompt plans; it does not call a live Fable 5 API or any other live AI endpoint. Think of it as a prompt design and planning tool that helps you craft better inputs before you use your own tools.",
  },
  {
    question: "What prompt modes does the Fable 5 workspace support?",
    answer:
      "The workspace currently supports five modes: Creative (narrative & world-building), Analytical (structured reasoning), Safety Check (responsible use review), Compare (side-by-side Fable 5 model notes), and Template (reusable prompt scaffolds). More modes will be added based on community feedback.",
  },
  {
    question: "How accurate is the Fable 5 model comparison data?",
    answer:
      "Comparison notes are planning aids, not official benchmarks. We label assumptions clearly and recommend verifying claims against authoritative sources before making decisions based on them.",
  },
  {
    question: "How do I get early access updates for Fable 5 AI?",
    answer:
      "Use the Get early access link to request updates. We track public Fable 5 AI access signals and do not claim special access to unreleased Fable 5 capabilities.",
  },
]
