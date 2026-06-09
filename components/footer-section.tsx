import Image from "next/image"

export default function FooterSection() {
  return (
    <footer className="w-full pt-10 flex flex-col justify-start items-start">
      {/* Main content */}
      <div className="self-stretch flex flex-col md:flex-row justify-between items-stretch pb-8">
        {/* Brand */}
        <div className="p-4 md:p-8 flex flex-col justify-start items-start gap-6">
          <div className="flex items-center gap-2.5 text-[#49423D] text-xl font-semibold leading-4 font-sans">
            <Image
              src="/icon-192.png"
              alt=""
              width={32}
              height={32}
              className="size-8 rounded-[9px] border border-[rgba(55,50,47,0.10)] shadow-[0px_1px_2px_rgba(55,50,47,0.12)]"
            />
            fable5
          </div>
          <div className="text-[rgba(73,66,61,0.70)] text-sm font-normal leading-5 font-sans max-w-[200px]">
            Independent guide &amp; prompt workspace for Anthropic&rsquo;s Fable 5 model.
          </div>
          <div className="text-[rgba(73,66,61,0.45)] text-xs font-normal leading-5 font-sans max-w-[220px]">
            Independent resource. Not affiliated with Anthropic.
          </div>

          {/* Social */}
          <div className="flex justify-start items-start gap-4">
            <a href="https://twitter.com/fable5io" aria-label="fable5 on X (Twitter)" className="w-6 h-6 flex items-center justify-center hover:opacity-70 transition-opacity">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="#49423D" />
              </svg>
            </a>
            <a href="https://github.com/fable5io" aria-label="fable5 on GitHub" className="w-6 h-6 flex items-center justify-center hover:opacity-70 transition-opacity">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.374-12-12-12z" fill="#49423D" />
              </svg>
            </a>
          </div>
        </div>

        {/* Nav columns */}
        <div className="self-stretch p-4 md:p-8 flex flex-col sm:flex-row flex-wrap justify-start sm:justify-between items-start gap-6 md:gap-8">
          <div className="flex flex-col justify-start items-start gap-3 flex-1 min-w-[120px]">
            <div className="text-[rgba(73,66,61,0.50)] text-sm font-medium leading-5 font-sans">Workspace</div>
            <div className="flex flex-col justify-end items-start gap-2">
              {[
                { label: "Prompt Planner", href: "/#prompt-planner" },
                { label: "Playground", href: "/playground" },
                { label: "Templates", href: "/templates" },
                { label: "Model Directory", href: "/models" },
                { label: "Fable 5 Guide", href: "/#guide" },
              ].map((item) => (
                <a key={item.label} href={item.href} className="text-[#49423D] text-sm font-normal leading-5 font-sans hover:text-[#37322F] transition-colors">
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-start items-start gap-3 flex-1 min-w-[120px]">
            <div className="text-[rgba(73,66,61,0.50)] text-sm font-medium leading-5 font-sans">Info</div>
            <div className="flex flex-col justify-center items-start gap-2">
              {[
                { label: "About", href: "/#guide" },
                { label: "FAQ", href: "/#faq" },
                { label: "Pricing", href: "/#pricing" },
                { label: "Contact", href: "mailto:hello@fable5.io" },
              ].map((item) => (
                <a key={item.label} href={item.href} className="text-[#49423D] text-sm font-normal leading-5 font-sans hover:text-[#37322F] transition-colors">
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-start items-start gap-3 flex-1 min-w-[120px]">
            <div className="text-[rgba(73,66,61,0.50)] text-sm font-medium leading-5 font-sans">Legal</div>
            <div className="flex flex-col justify-center items-start gap-2">
              {[
                { label: "Terms of Use", href: "/terms" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Disclaimer", href: "/disclaimer" },
              ].map((item) => (
                <a key={item.label} href={item.href} className="text-[#49423D] text-sm font-normal leading-5 font-sans hover:text-[#37322F] transition-colors">
                  {item.label}
                </a>
              ))}
              <div className="mt-1 text-[11px] text-[rgba(73,66,61,0.40)] font-sans leading-4">
                fable5.io is not affiliated with Anthropic.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom hatch bar */}
      <div className="self-stretch h-12 relative overflow-hidden border-t border-b border-[rgba(55,50,47,0.12)]" aria-hidden="true">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <div className="w-full h-full relative">
            {Array.from({ length: 400 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-[300px] h-16 border border-[rgba(3,7,18,0.08)]"
                style={{ left: `${i * 300 - 600}px`, top: "-120px", transform: "rotate(-45deg)", transformOrigin: "top left" }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="w-full px-4 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-[11px] text-[rgba(73,66,61,0.45)] font-sans">
          &copy; {new Date().getFullYear()} fable5.io — Independent resource
        </p>
        <p className="text-[11px] text-[rgba(73,66,61,0.35)] font-sans text-center">
          &quot;Fable 5&quot; refers to Anthropic&rsquo;s Claude Fable 5 model. Claude and Fable are Anthropic&rsquo;s
          marks; this independent site claims no affiliation.
        </p>
      </div>
    </footer>
  )
}
