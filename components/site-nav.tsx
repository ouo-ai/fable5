import Image from "next/image"
import Link from "next/link"

const NAV_LINKS: Array<{ label: string; href: string; mdUp?: boolean }> = [
  { label: "Chat", href: "/chat" },
  { label: "Playground", href: "/playground" },
  { label: "Models", href: "/models" },
  { label: "Templates", href: "/templates" },
  { label: "Guide", href: "/#guide", mdUp: true },
  { label: "FAQ", href: "/#faq", mdUp: true },
]

export default function SiteNav() {
  return (
    <nav
      aria-label="Main navigation"
      className="w-full h-12 sm:h-14 md:h-16 lg:h-[84px] absolute left-0 top-0 flex justify-center items-center z-20 px-4 sm:px-6"
    >
      <div className="w-full h-0 absolute left-0 top-6 sm:top-7 md:top-8 lg:top-[42px] border-t border-[rgba(55,50,47,0.12)] shadow-[0px_1px_0px_white]" />
      <div className="w-full max-w-[calc(100%-32px)] sm:max-w-[calc(100%-48px)] lg:max-w-[700px] h-10 sm:h-11 md:h-12 py-1.5 px-3 sm:px-4 pr-2 sm:pr-3 bg-[#F7F5F3] backdrop-blur-sm shadow-[0px_0px_0px_2px_white] overflow-hidden rounded-[50px] flex justify-between items-center relative z-30">
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#2F3037] text-base sm:text-lg lg:text-xl font-medium font-sans"
          >
            <Image
              src="/icon-192.png"
              alt=""
              width={28}
              height={28}
              className="size-7 rounded-[8px] border border-[rgba(55,50,47,0.10)] shadow-[0px_1px_2px_rgba(55,50,47,0.12)]"
            />
            fable5
          </Link>
          <div className="pl-4 sm:pl-5 hidden sm:flex flex-row gap-3 sm:gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[rgba(49,45,43,0.80)] text-[13px] font-medium font-sans hover:text-[#37322F] transition-colors ${
                  link.mdUp ? "hidden md:inline" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <a
            href="mailto:hello@fable5.io?subject=Fable%205%20updates"
            className="px-3 md:px-[14px] py-1 sm:py-[6px] bg-white shadow-[0px_1px_2px_rgba(55,50,47,0.12)] rounded-full flex justify-center items-center"
          >
            <span className="text-[#37322F] text-[13px] font-medium font-sans">Get updates</span>
          </a>
        </div>
      </div>
    </nav>
  )
}
