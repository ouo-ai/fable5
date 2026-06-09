interface NumbersThatSpeakProps {
  width?: number | string
  height?: number | string
  className?: string
}

const metrics = [
  { label: "Prompt modes", value: "5", detail: "Creative, analytical, safety, compare, template" },
  { label: "Template queue", value: "40+", detail: "Reusable prompt structures to review and adapt" },
  { label: "Source labels", value: "3", detail: "Verified, unverified, pending review" },
]

export default function NumbersThatSpeak({ width = 482, height = 300, className = "" }: NumbersThatSpeakProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-[rgba(55,50,47,0.12)] bg-white shadow-[0px_10px_30px_rgba(55,50,47,0.08)] ${className}`}
      style={{ width, height }}
      role="img"
      aria-label="Fable 5 workspace coverage metrics"
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(55,50,47,0.05),transparent_42%,rgba(95,139,126,0.10))]" />
      <div className="relative flex h-full flex-col justify-between p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[11px] font-medium uppercase tracking-wide text-[rgba(55,50,47,0.45)]">
              Workspace map
            </div>
            <div className="mt-1 text-xl font-semibold text-[#37322F]">Fable 5 research coverage</div>
          </div>
          <div className="rounded-full border border-[rgba(55,50,47,0.12)] px-3 py-1 text-[11px] font-medium text-[#5F8B7E]">
            Live page
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-md border border-[rgba(55,50,47,0.10)] bg-[#FAFAF9] p-3">
              <div className="font-serif text-3xl text-[#37322F]">{metric.value}</div>
              <div className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-[rgba(55,50,47,0.55)]">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          {metrics.map((metric, index) => (
            <div key={metric.detail} className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-[#5F8B7E]" style={{ opacity: 0.45 + index * 0.2 }} />
              <div className="min-w-0 text-xs text-[rgba(55,50,47,0.65)]">{metric.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
