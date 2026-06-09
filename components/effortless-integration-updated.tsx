interface EffortlessIntegrationProps {
  width?: number | string
  height?: number | string
  className?: string
}

const workflow = [
  { label: "Draft", x: "14%", y: "48%" },
  { label: "Source", x: "34%", y: "18%" },
  { label: "Review", x: "64%", y: "18%" },
  { label: "Compare", x: "84%", y: "48%" },
  { label: "Export", x: "50%", y: "78%" },
]

export default function EffortlessIntegration({
  width = 482,
  height = 300,
  className = "",
}: EffortlessIntegrationProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-[rgba(55,50,47,0.12)] bg-white ${className}`}
      style={{ width, height }}
      role="img"
      aria-label="Fable 5 prompt workflow diagram"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(95,139,126,0.14),transparent_42%)]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 482 300" aria-hidden="true">
        <path
          d="M70 144 C130 55 305 55 410 144 C355 235 170 235 70 144Z"
          fill="none"
          stroke="rgba(55,50,47,0.16)"
          strokeWidth="1.5"
        />
        <path
          d="M164 72 C220 142 250 188 241 234"
          fill="none"
          stroke="rgba(55,50,47,0.12)"
          strokeWidth="1"
        />
        <path
          d="M318 72 C260 142 232 188 241 234"
          fill="none"
          stroke="rgba(55,50,47,0.12)"
          strokeWidth="1"
        />
      </svg>

      <div className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#37322F] text-center text-sm font-semibold leading-5 text-white shadow-[0px_12px_30px_rgba(55,50,47,0.22)]">
        Fable 5
        <br />
        workspace
      </div>

      {workflow.map((item) => (
        <div
          key={item.label}
          className="absolute flex h-14 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-md border border-[rgba(55,50,47,0.14)] bg-[#FAFAF9] text-xs font-semibold text-[#37322F] shadow-[0px_4px_12px_rgba(55,50,47,0.08)]"
          style={{ left: item.x, top: item.y }}
        >
          {item.label}
        </div>
      ))}
    </div>
  )
}
