"use client"

import { useState } from "react"

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "What is Fable 5?",
    answer:
      "Fable 5 is the primary keyword tracked by this independent prompt workspace. The site helps users plan, structure, and compare Fable 5 AI prompts while clearly separating verified notes from assumptions.",
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

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <div className="w-full flex justify-center items-start" id="faq">
      <div className="flex-1 px-4 md:px-12 py-16 md:py-20 flex flex-col lg:flex-row justify-start items-start gap-6 lg:gap-12">
        {/* Left column */}
        <div className="w-full lg:flex-1 flex flex-col justify-center items-start gap-4 lg:py-5">
          <div className="w-full text-[#49423D] text-4xl font-semibold leading-tight font-sans tracking-tight">
            Frequently Asked Questions
          </div>
          <div className="w-full text-[#605A57] text-base font-normal leading-7 font-sans">
            Everything you need to know about the Fable 5 AI guide and prompt workspace.
          </div>
          <div className="mt-2 px-3 py-2 bg-[rgba(55,50,47,0.04)] border border-[rgba(55,50,47,0.10)] rounded-lg">
            <p className="text-[11px] text-[rgba(55,50,47,0.55)] font-sans leading-relaxed">
              fable5.io is an independent resource. Not affiliated with any official Fable 5 publisher.
            </p>
          </div>
        </div>

        {/* Right column */}
        <div className="w-full lg:flex-1 flex flex-col justify-center items-center">
          <div className="w-full flex flex-col">
            {faqData.map((item, index) => {
              const isOpen = openItems.includes(index)
              return (
                <div key={index} className="w-full border-b border-[rgba(73,66,61,0.16)] overflow-hidden">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-5 py-[18px] flex justify-between items-center gap-5 text-left hover:bg-[rgba(73,66,61,0.02)] transition-colors duration-200"
                    aria-expanded={isOpen}
                  >
                    <div className="flex-1 text-[#49423D] text-base font-medium leading-6 font-sans">
                      {item.question}
                    </div>
                    <ChevronDownIcon
                      className={`w-6 h-6 text-[rgba(73,66,61,0.60)] shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-5 pb-[18px] text-[#605A57] text-sm font-normal leading-6 font-sans">
                      {item.answer}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
