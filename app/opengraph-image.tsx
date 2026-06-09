import { ImageResponse } from "next/og"

export const alt = "Fable 5 AI — Independent Model Guide & Prompt Workspace"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#F7F5F3",
          padding: "64px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: 9999,
              backgroundColor: "#37322F",
              display: "flex",
            }}
          />
          <div style={{ fontSize: 30, color: "#37322F", fontWeight: 700, display: "flex" }}>fable5.io</div>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              fontSize: 112,
              color: "#37322F",
              fontWeight: 700,
              letterSpacing: "-4px",
              display: "flex",
            }}
          >
            Fable 5
          </div>
          <div style={{ fontSize: 38, color: "#5B544E", display: "flex" }}>
            Independent AI model guide & prompt workspace
          </div>
        </div>

        <div style={{ display: "flex", gap: 14 }}>
          {["Prompt Planner", "40+ Templates", "Access Tracker", "Model Notes"].map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                padding: "10px 22px",
                borderRadius: 9999,
                border: "1.5px solid rgba(55,50,47,0.25)",
                backgroundColor: "#FFFFFF",
                color: "#37322F",
                fontSize: 22,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  )
}
