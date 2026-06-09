"use client"

import { useMemo, useState } from "react"
import type { ModelRow } from "../lib/openrouter"

const DISPLAY_LIMIT = 100

function formatContext(tokens: number): string {
  if (tokens >= 1_000_000) return `${(tokens / 1_000_000).toFixed(tokens % 1_000_000 === 0 ? 0 : 1)}M`
  if (tokens >= 1_000) return `${Math.round(tokens / 1_024)}K`
  return tokens > 0 ? String(tokens) : "—"
}

function formatPrice(perM: number): string {
  if (perM === 0) return "Free"
  if (perM < 0.01) return `$${perM.toFixed(4)}`
  return `$${perM.toFixed(2)}`
}

export default function ModelsTable({ rows }: { rows: ModelRow[] }) {
  const [query, setQuery] = useState("")
  const [freeOnly, setFreeOnly] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return rows.filter((row) => {
      if (freeOnly && !row.isFree) return false
      if (!q) return true
      return row.name.toLowerCase().includes(q) || row.id.toLowerCase().includes(q)
    })
  }, [rows, query, freeOnly])

  const visible = filtered.slice(0, DISPLAY_LIMIT)

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by model name or id…"
          aria-label="Search models"
          className="flex-1 max-w-md px-4 py-2 text-sm font-sans text-[#37322F] placeholder:text-[rgba(55,50,47,0.35)] bg-white border border-[rgba(55,50,47,0.14)] rounded-lg focus:outline-none focus:border-[rgba(55,50,47,0.40)]"
        />
        <label className="inline-flex items-center gap-2 text-sm font-sans text-[rgba(55,50,47,0.70)] cursor-pointer select-none">
          <input
            type="checkbox"
            checked={freeOnly}
            onChange={(e) => setFreeOnly(e.target.checked)}
            className="accent-[#37322F]"
          />
          Free models only
        </label>
        <span className="text-xs font-sans text-[rgba(55,50,47,0.45)]">
          {filtered.length} of {rows.length} models
        </span>
      </div>

      <div className="w-full overflow-x-auto rounded-lg border border-[rgba(55,50,47,0.12)] bg-white">
        <table className="w-full text-xs font-sans border-collapse min-w-[640px]">
          <thead>
            <tr className="bg-[#F7F5F3]">
              <th className="text-left px-3 py-2.5 text-[rgba(55,50,47,0.55)] font-medium border-b border-[rgba(55,50,47,0.10)]">
                Model
              </th>
              <th className="text-right px-3 py-2.5 text-[rgba(55,50,47,0.55)] font-medium border-b border-[rgba(55,50,47,0.10)]">
                Context
              </th>
              <th className="text-right px-3 py-2.5 text-[rgba(55,50,47,0.55)] font-medium border-b border-[rgba(55,50,47,0.10)]">
                Prompt $/M
              </th>
              <th className="text-right px-3 py-2.5 text-[rgba(55,50,47,0.55)] font-medium border-b border-[rgba(55,50,47,0.10)]">
                Output $/M
              </th>
              <th className="text-left px-3 py-2.5 text-[rgba(55,50,47,0.55)] font-medium border-b border-[rgba(55,50,47,0.10)]">
                Modality
              </th>
            </tr>
          </thead>
          <tbody>
            {visible.map((row) => (
              <tr key={row.id} className="bg-white even:bg-[#FAFAF9]">
                <td className="px-3 py-2 border-b border-[rgba(55,50,47,0.06)]">
                  <div className="flex items-center gap-2">
                    <span className="text-[#37322F] font-medium">{row.name}</span>
                    {row.isFree && (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                        free
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-[rgba(55,50,47,0.40)] font-mono">{row.id}</div>
                </td>
                <td className="px-3 py-2 text-right text-[rgba(55,50,47,0.70)] border-b border-[rgba(55,50,47,0.06)]">
                  {formatContext(row.contextLength)}
                </td>
                <td className="px-3 py-2 text-right text-[rgba(55,50,47,0.70)] border-b border-[rgba(55,50,47,0.06)]">
                  {formatPrice(row.promptPerM)}
                </td>
                <td className="px-3 py-2 text-right text-[rgba(55,50,47,0.70)] border-b border-[rgba(55,50,47,0.06)]">
                  {formatPrice(row.completionPerM)}
                </td>
                <td className="px-3 py-2 text-[rgba(55,50,47,0.60)] border-b border-[rgba(55,50,47,0.06)] whitespace-nowrap">
                  {row.modality}
                </td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={5} className="px-3 py-8 text-center text-[rgba(55,50,47,0.45)]">
                  No models match this search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {filtered.length > DISPLAY_LIMIT && (
        <p className="text-[11px] text-[rgba(55,50,47,0.45)] font-sans">
          Showing the first {DISPLAY_LIMIT} of {filtered.length} matches — refine the search to narrow results.
        </p>
      )}
    </div>
  )
}
