interface GuideEntry {
  id: string
  title: string
  body: string
}

/** Facts current as of June 10, 2026 — sources: Anthropic announcement and API docs, OpenRouter catalogue. */
const guideEntries: GuideEntry[] = [
  {
    id: "what-is-fable-5",
    title: "What is Fable 5?",
    body: "Claude Fable 5 is Anthropic's flagship AI model, released on June 9, 2026. Anthropic describes it as a Mythos-class model made safe for general use: its capabilities exceed any model the company has previously made generally available, with state-of-the-art results in software engineering, knowledge work, vision, and scientific research. New safeguards block responses in specific high-risk areas, and a small share of sensitive queries are answered by Claude Opus 4.8 instead.",
  },
  {
    id: "fable-5-specs",
    title: "Fable 5 specs and pricing",
    body: "Fable 5 offers a 1M-token context window and up to 128K output tokens. API pricing is $10 per million input tokens and $50 per million output tokens — double Opus 4.8 — with a 90% input discount on cached prompt content. The model uses adaptive thinking only: classic sampling knobs like temperature and top_p are removed, so output style is steered through prompting, and an effort parameter (low to max) trades depth against speed and cost.",
  },
  {
    id: "fable-5-access",
    title: "How to get access to Fable 5",
    body: "Official channels: the Claude apps on paid plans (included on Pro, Max, Team, and seat-based Enterprise until June 22, 2026, then via usage credits), the Claude API under the model ID claude-fable-5, AWS, Google Cloud, and Microsoft Foundry, and GitHub Copilot. Routers such as OpenRouter list it as anthropic/claude-fable-5. Be cautious of anyone selling Fable 5 access keys outside these channels — you never need a third-party reseller.",
  },
  {
    id: "how-to-prompt-fable-5",
    title: "How to prompt Fable 5",
    body: "Fable 5 follows instructions more literally than older models, which rewards precise prompts: state the role, one line of context, the task, the output format, and hard constraints. For long agentic tasks, put the full specification in the first message rather than drip-feeding it. Because sampling parameters are gone, ask for variation explicitly when you want it. The free Chat on this site is a quick place to practice, and the Playground refines a single prompt before you spend Fable 5 tokens.",
  },
  {
    id: "fable-5-comparison",
    title: "Fable 5 vs other Claude models",
    body: "Choose by task value: Fable 5 ($10/$50 per million tokens) is the ceiling for hard, high-stakes work; Claude Opus 4.8 ($5/$25) remains extremely strong at half the price; Sonnet 4.6 ($3/$15) balances speed and intelligence; Haiku 4.5 ($1/$5) handles fast, simple tasks. All current models share the adaptive-thinking API surface, so the same well-structured prompt ports across tiers — run it on a cheaper model first and escalate only when quality demands it.",
  },
  {
    id: "independent-fable-5-guide",
    title: "Why an independent Fable 5 guide?",
    body: "fable5.io is not an Anthropic property — it is an independent workspace that aggregates public Fable 5 information with dates and sources: the Anthropic announcement, the Claude API docs, and the OpenRouter catalogue. Specs and pricing can change after publication, so every figure here is dated, and official sources always win on conflict. Spotted an error? Use the contact link in the footer to report it.",
  },
]

export default function GuideSection() {
  return (
    <section
      id="guide"
      aria-labelledby="guide-heading"
      className="w-full border-b border-[rgba(55,50,47,0.12)]"
    >
      <div className="px-6 sm:px-10 py-10 sm:py-14 flex flex-col gap-10">
        <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-full border border-[rgba(2,6,23,0.08)] shadow-[0px_0px_0px_4px_rgba(55,50,47,0.05)] text-[#37322F] text-xs font-medium font-sans">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
              <path d="M2 1h6a1 1 0 011 1v7L5 7.5 1 9V2a1 1 0 011-1z" fill="#37322F" />
            </svg>
            Fable 5 Guide
          </div>
          <h2
            id="guide-heading"
            className="text-[#37322F] text-3xl sm:text-4xl font-semibold font-sans leading-tight tracking-tight text-balance"
          >
            Everything you need to know about Fable 5
          </h2>
          <p className="text-[rgba(55,50,47,0.70)] text-base font-normal font-sans leading-relaxed">
            A plain-language guide to Anthropic&rsquo;s Fable 5 model: what it is, what it costs, how
            to access it, and how to prompt it well. Facts dated June 10, 2026.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 max-w-4xl mx-auto w-full">
          {guideEntries.map((entry) => (
            <article key={entry.id} id={entry.id} className="flex flex-col gap-2">
              <h3 className="text-[#37322F] text-lg font-semibold font-sans leading-snug">
                {entry.title}
              </h3>
              <p className="text-[rgba(55,50,47,0.70)] text-sm font-normal font-sans leading-relaxed">
                {entry.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
