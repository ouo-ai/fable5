"use client"

import { useState, useEffect } from "react"
import type React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function TestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const testimonials = [
    {
      quote:
        "Turn a loose Fable 5 AI idea into a repeatable prompt plan with role, task, format, constraints, and review notes.",
      name: "Prompt planning",
      company: "Use case",
      initials: "PP",
    },
    {
      quote:
        "Compare Fable 5 model assumptions against the same prompt in tools you already have, then label the result as verified or unverified.",
      name: "Comparison review",
      company: "Use case",
      initials: "CR",
    },
    {
      quote:
        "Run a fast safety and source checklist before you publish, share, or rely on any Fable 5 prompt output.",
      name: "Safety checklist",
      company: "Use case",
      initials: "SC",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true)
      setTimeout(() => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
        setTimeout(() => setIsTransitioning(false), 100)
      }, 300)
    }, 10000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  const handleNavigationClick = (index: number) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveTestimonial(index)
      setTimeout(() => setIsTransitioning(false), 100)
    }, 300)
  }

  const current = testimonials[activeTestimonial]

  return (
    <div className="w-full border-b border-[rgba(55,50,47,0.12)] flex flex-col justify-center items-center">
      <div className="self-stretch px-2 overflow-hidden flex justify-start items-center bg-background border-b border-l-0 border-r-0 border-t-0">
        <div className="flex-1 py-14 flex flex-col md:flex-row justify-center items-end gap-6">
          <div className="self-stretch px-3 md:px-12 justify-center items-start gap-4 flex flex-col md:flex-row">
            {/* Avatar placeholder */}
            <div
              className="w-20 h-20 md:w-24 md:h-24 rounded-xl flex-shrink-0 flex items-center justify-center bg-[#37322F] transition-all duration-700 ease-in-out"
              style={{
                opacity: isTransitioning ? 0.6 : 1,
                transform: isTransitioning ? "scale(0.95)" : "scale(1)",
              }}
              aria-hidden="true"
            >
              <span className="text-white text-xl font-semibold font-sans">{current.initials}</span>
            </div>

            <div className="flex-1 px-6 py-6 overflow-hidden flex flex-col justify-start items-start gap-6 pb-0 pt-0">
              <div
                className="self-stretch flex flex-col text-[#49423D] text-2xl md:text-[30px] font-medium leading-10 md:leading-[42px] font-sans h-[180px] md:h-[168px] overflow-hidden line-clamp-5 transition-all duration-700 ease-in-out tracking-tight"
                style={{ filter: isTransitioning ? "blur(4px)" : "blur(0px)" }}
              >
                &ldquo;{current.quote}&rdquo;
              </div>
              <div
                className="self-stretch flex flex-col justify-start items-start gap-1 transition-all duration-700 ease-in-out"
                style={{ filter: isTransitioning ? "blur(4px)" : "blur(0px)" }}
              >
                <div className="text-[rgba(73,66,61,0.90)] text-base font-semibold leading-6 font-sans">
                  {current.name}
                </div>
                <div className="text-[rgba(73,66,61,0.60)] text-sm font-medium leading-5 font-sans">
                  {current.company}
                </div>
              </div>
            </div>
          </div>

          {/* Nav arrows */}
          <div className="pr-6 justify-start items-start gap-[14px] flex">
            <button
              onClick={() => handleNavigationClick((activeTestimonial - 1 + testimonials.length) % testimonials.length)}
              aria-label="Previous testimonial"
              className="w-9 h-9 shadow-[0px_1px_2px_rgba(0,0,0,0.08)] overflow-hidden rounded-full border border-[rgba(0,0,0,0.15)] justify-center items-center gap-2 flex hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="h-5 w-5 text-[#46413E]" aria-hidden="true" />
            </button>
            <button
              onClick={() => handleNavigationClick((activeTestimonial + 1) % testimonials.length)}
              aria-label="Next testimonial"
              className="w-9 h-9 shadow-[0px_1px_2px_rgba(0,0,0,0.08)] overflow-hidden rounded-full border border-[rgba(0,0,0,0.15)] justify-center items-center gap-2 flex hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="h-5 w-5 text-[#46413E]" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
