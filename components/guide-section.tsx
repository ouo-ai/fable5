interface GuideEntry {
  id: string
  title: string
  body: string
}

const guideEntries: GuideEntry[] = [
  {
    id: "what-is-fable-5",
    title: "What is Fable 5?",
    body: "Fable 5 is an AI model name that has drawn growing search interest from writers, researchers, and developers. Because official, verifiable documentation is limited, this guide treats every claim about the Fable 5 model carefully: notes are labelled as verified, unverified, or pending review. Instead of repeating rumors, fable5.io focuses on what you can control today — writing better prompts, keeping organized research notes, and checking sources before you rely on them.",
  },
  {
    id: "how-to-prompt-fable-5",
    title: "How to write effective Fable 5 prompts",
    body: "Strong Fable 5 prompts follow the same structure that works across modern AI models: a clear role, one sentence of context, a specific task, an explicit output format, and hard constraints such as length or tone. The prompt planner above turns a rough idea into that structure in seconds. Start small, test one variable at a time, and save the versions that work as templates so every Fable 5 AI session begins from a proven scaffold.",
  },
  {
    id: "fable-5-use-cases",
    title: "Fable 5 AI use cases",
    body: "The workspace supports five common use cases: creative writing and world-building, analytical research summaries, prompt safety reviews, side-by-side model comparisons, and reusable template design. Each mode produces a structured plan you can paste into whatever AI tools you already use — so your Fable 5 research stays portable, repeatable, and easy to audit later.",
  },
  {
    id: "fable-5-access",
    title: "How to track Fable 5 access safely",
    body: "Search interest around Fable 5 access attracts scams. Treat any site that sells early-access keys, asks for unusual payments, or promises private Fable 5 API endpoints with extreme caution. fable5.io only tracks public access signals — official announcements, documented releases, and verifiable sources — and labels everything else as unverified. You should never need to share credentials or pay an unknown third party to follow Fable 5 news.",
  },
  {
    id: "fable-5-comparison",
    title: "Comparing Fable 5 with other AI models",
    body: "Honest comparisons need identical prompts, recorded settings, and dated notes. The comparison worksheet keeps Fable 5 model observations separate from assumptions, so you never mistake a community impression for an official benchmark. When data is missing, the worksheet says so — a clear unverified label is more useful than a confident guess.",
  },
  {
    id: "independent-fable-5-guide",
    title: "Why an independent Fable 5 guide?",
    body: "fable5.io is independent by design. It claims no affiliation with any Fable 5 publisher, sells no access, and runs no paid placements. That independence means the guide can say plainly what is verified and what is not — and update freely as public information about Fable 5 AI evolves. If you spot an error, use the contact link in the footer to report it.",
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
            A plain-language Fable 5 AI guide: what the model name means, how to prompt well, and how
            to follow access news without falling for hype.
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
