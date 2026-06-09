"use client"

import { useState } from "react"
import { TEMPLATE_CATEGORIES } from "../lib/templates-data"

export default function TemplateLibrary() {
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const categories =
    activeCategory === "all"
      ? TEMPLATE_CATEGORIES
      : TEMPLATE_CATEGORIES.filter((category) => category.id === activeCategory)

  const handleCopy = async (key: string, prompt: string) => {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopiedKey(key)
      setTimeout(() => setCopiedKey((current) => (current === key ? null : current)), 1500)
    } catch {
      // Clipboard can be unavailable (permissions, http) — selecting text manually still works.
    }
  }

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Template category">
        <button
          onClick={() => setActiveCategory("all")}
          aria-pressed={activeCategory === "all"}
          className={`px-3 py-1.5 rounded-full text-xs font-medium font-sans border transition-colors duration-150 ${
            activeCategory === "all"
              ? "bg-[#37322F] text-white border-[#37322F]"
              : "bg-white text-[rgba(55,50,47,0.70)] border-[rgba(55,50,47,0.14)] hover:border-[rgba(55,50,47,0.30)]"
          }`}
        >
          All
        </button>
        {TEMPLATE_CATEGORIES.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            aria-pressed={activeCategory === category.id}
            className={`px-3 py-1.5 rounded-full text-xs font-medium font-sans border transition-colors duration-150 ${
              activeCategory === category.id
                ? "bg-[#37322F] text-white border-[#37322F]"
                : "bg-white text-[rgba(55,50,47,0.70)] border-[rgba(55,50,47,0.14)] hover:border-[rgba(55,50,47,0.30)]"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {categories.map((category) => (
        <section key={category.id} aria-labelledby={`category-${category.id}`} className="flex flex-col gap-4">
          <h2
            id={`category-${category.id}`}
            className="text-[#37322F] text-xl sm:text-2xl font-semibold font-sans tracking-tight"
          >
            {category.label}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {category.templates.map((template) => {
              const key = `${category.id}-${template.title}`
              const isCopied = copiedKey === key
              return (
                <div
                  key={key}
                  className="flex flex-col gap-2 px-4 py-3.5 bg-white border border-[rgba(55,50,47,0.10)] rounded-lg shadow-[0px_1px_3px_rgba(55,50,47,0.04)]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-[#37322F] text-sm font-semibold font-sans">{template.title}</h3>
                    <button
                      onClick={() => void handleCopy(key, template.prompt)}
                      className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-medium font-sans border transition-colors ${
                        isCopied
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-white text-[rgba(55,50,47,0.60)] border-[rgba(55,50,47,0.14)] hover:border-[rgba(55,50,47,0.35)] hover:text-[#37322F]"
                      }`}
                      aria-label={`Copy template: ${template.title}`}
                    >
                      {isCopied ? "Copied ✓" : "Copy"}
                    </button>
                  </div>
                  <p className="text-xs text-[rgba(55,50,47,0.65)] font-sans leading-relaxed whitespace-pre-wrap">
                    {template.prompt}
                  </p>
                </div>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
