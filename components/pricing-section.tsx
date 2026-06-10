const tiers = [
  {
    name: "Open Workspace",
    price: "Free",
    description: "Use the Fable 5 chat, playground, and templates with no account.",
    items: ["Streaming chat on open models", "42 prompt templates", "Daily model directory", "Fable 5 access tracker"],
  },
  {
    name: "Research Pack",
    price: "Planned",
    description: "A deeper Fable 5 AI research kit for people tracking sources and tests.",
    items: ["Expanded template library", "Comparison worksheets", "Source-review labels", "Exportable prompt notes"],
  },
  {
    name: "Team Review",
    price: "Planned",
    description: "Shared review workflows for teams evaluating Fable 5 model claims.",
    items: ["Shared prompt library", "Team comparison notes", "Custom review checklist", "Update notifications"],
  },
]

function CheckIcon({ color = "#5F8B7E" }: { color?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M10 3L4.5 8.5L2 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function PricingSection() {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-2">
      <div className="self-stretch px-6 md:px-24 py-12 md:py-16 border-b border-[rgba(55,50,47,0.12)] flex justify-center items-center gap-6">
        <div className="w-full max-w-[620px] px-6 py-5 overflow-hidden rounded-lg flex flex-col justify-start items-center gap-4">
          <div className="px-[14px] py-[6px] bg-white shadow-[0px_0px_0px_4px_rgba(55,50,47,0.05)] overflow-hidden rounded-[90px] flex justify-start items-center gap-[8px] border border-[rgba(2,6,23,0.08)]">
            <span className="text-[#37322F] text-xs font-medium font-sans">Workspace Levels</span>
          </div>
          <h2 className="self-stretch text-center text-[#49423D] text-3xl md:text-5xl font-semibold leading-tight md:leading-[60px] font-sans tracking-tight">
            Start with the public Fable 5 guide
          </h2>
          <div className="self-stretch text-center text-[#605A57] text-base font-normal leading-7 font-sans">
            The current Fable 5 prompt workspace is free. Additional research packs are shown as planned roadmap items,
            not active checkout plans.
          </div>
        </div>
      </div>

      <div className="self-stretch border-b border-t border-[rgba(55,50,47,0.12)] flex justify-center items-center">
        <div className="grid w-full grid-cols-1 md:grid-cols-3">
          {tiers.map((tier, index) => (
            <div
              key={tier.name}
              className={`min-h-[360px] px-6 py-6 border-r last:border-r-0 border-[rgba(50,45,43,0.12)] flex flex-col justify-between gap-8 ${
                index === 1 ? "bg-[#37322F] text-white" : "bg-transparent text-[#37322F]"
              }`}
            >
              <div className="flex flex-col gap-4">
                <div>
                  <div className={`text-lg font-medium leading-7 font-sans ${index === 1 ? "text-[#FBFAF9]" : ""}`}>
                    {tier.name}
                  </div>
                  <div
                    className={`mt-2 max-w-[260px] text-sm font-normal leading-5 font-sans ${
                      index === 1 ? "text-[#D8D2CC]" : "text-[rgba(41,37,35,0.70)]"
                    }`}
                  >
                    {tier.description}
                  </div>
                </div>
                <div className={`font-serif text-5xl ${index === 1 ? "text-[#F0EFEE]" : "text-[#37322F]"}`}>
                  {tier.price}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {tier.items.map((item) => (
                  <div key={item} className="flex items-center gap-[13px]">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <CheckIcon color={index === 1 ? "#FFB86B" : "#5F8B7E"} />
                    </div>
                    <span
                      className={`flex-1 text-[12.5px] font-normal leading-5 font-sans ${
                        index === 1 ? "text-[#F0EFEE]" : "text-[rgba(55,50,47,0.80)]"
                      }`}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
