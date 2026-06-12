export interface FAQItem {
  question: string
  answer: string
}

/**
 * Single source of truth for FAQ content.
 * Rendered visibly in components/faq-section.tsx and emitted as
 * FAQPage JSON-LD in app/layout.tsx — keep both in sync by editing here only.
 * Facts current as of June 10, 2026 (Anthropic announcement, API docs, OpenRouter).
 */
export const faqData: FAQItem[] = [
  {
    question: "What is Fable 5?",
    answer:
      "Fable 5 (Claude Fable 5) is Anthropic's most powerful generally available AI model, released on June 9, 2026. It is a Mythos-class conversational model made safe for general use, with state-of-the-art results across software engineering, knowledge work, vision, and scientific research — positioned as a new tier above Claude Opus 4.8.",
  },
  {
    question: "Is fable5.io an official Anthropic or Fable 5 site?",
    answer:
      "No. fable5.io is an independent community guide and prompt workspace. It is not affiliated with, endorsed by, or operated by Anthropic. Claude and Fable are Anthropic's marks, used here only to describe the model this guide covers.",
  },
  {
    question: "How can I access the Fable 5 model?",
    answer:
      "Fable 5 is available in the Claude apps on paid plans (included on Pro, Max, Team, and seat-based Enterprise until June 22, 2026, with usage credits afterwards), via the Claude API under the model ID claude-fable-5, on AWS, Google Cloud, and Microsoft Foundry, in GitHub Copilot, and through routers such as OpenRouter (anthropic/claude-fable-5).",
  },
  {
    question: "How much does Fable 5 cost?",
    answer:
      "API pricing is $10 per million input tokens and $50 per million output tokens — double Claude Opus 4.8 — with a 1M-token context window and up to 128K output tokens. Prompt caching offers a 90% input-token discount on cached content. App availability depends on your Claude plan.",
  },
  {
    question: "Is the free chat on fable5.io the real Fable 5 model?",
    answer:
      "No. 'Fable 5' here is the brand name of this site's own free assistant, not Anthropic's Claude Fable 5 model. The real Claude Fable 5 is available only through official channels: the Claude apps, the Claude API, and the major cloud platforms.",
  },
  {
    question: "What's the difference between the Chat and the Playground?",
    answer:
      "The Chat is a free, claude-style streaming conversation: multi-turn, Markdown answers, and history saved in your browser. The Playground is a one-shot tool for refining a single prompt with four structured modes (Refine, Creative, Analytical, Safety Review) on free open-weight models. Neither is Anthropic's Fable 5 itself.",
  },
  {
    question: "Which AI models power the Playground?",
    answer:
      "Free open-weight models routed through OpenRouter — currently OpenAI GPT-OSS 120B, Moonshot Kimi K2.6, Meta Llama 3.3 70B, Qwen3 Next 80B, and GLM 4.5 Air, with automatic fallback when a free provider is busy. The Models page lists context windows and pricing for the wider catalogue, refreshed daily.",
  },
]
