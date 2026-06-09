import type React from "react"
import SiteNav from "./site-nav"
import FooterSection from "./footer-section"

/** Shared shell for subpages: rail lines, floating nav, content slot, footer. */
export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-full min-h-screen relative bg-[#F7F5F3] overflow-x-hidden flex flex-col items-center">
      <div
        className="pointer-events-none absolute inset-y-0 left-1/2 w-full max-w-[1060px] -translate-x-1/2"
        aria-hidden="true"
      >
        <div className="w-px h-full absolute left-0 top-0 bg-[rgba(55,50,47,0.12)] shadow-[1px_0px_0px_white] hidden lg:block" />
        <div className="w-px h-full absolute right-0 top-0 bg-[rgba(55,50,47,0.12)] shadow-[1px_0px_0px_white] hidden lg:block" />
      </div>

      <div className="w-full max-w-[1060px] relative pt-[9px]">
        <SiteNav />
        <div className="pt-24 sm:pt-28 lg:pt-32 pb-12 px-4 sm:px-6 lg:px-8">{children}</div>
        <FooterSection />
      </div>
    </main>
  )
}
