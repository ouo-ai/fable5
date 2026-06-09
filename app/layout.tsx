import type React from "react"
import type { Metadata } from "next"
import { Inter, Instrument_Serif } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: ["400"],
  display: "swap",
  preload: true,
})

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://fable5.io").replace(/\/$/, "")

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Fable 5 — Independent AI Model Guide & Prompt Workspace",
    template: "%s | Fable 5",
  },
  description:
    "Fable 5 prompt workspace for AI keyword research. Plan prompts, compare model notes, track access signals, and review sources with an independent guide.",
  keywords: [
    "Fable 5",
    "Fable 5 AI",
    "Fable 5 model",
    "Fable 5 prompt guide",
    "Fable 5 AI model",
    "fable5",
    "AI prompt workspace",
    "AI model comparison",
    "Fable 5 guide",
  ],
  authors: [{ name: "fable5.io" }],
  creator: "fable5.io",
  publisher: "fable5.io",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Fable 5",
    title: "Fable 5 — Independent AI Model Guide & Prompt Workspace",
    description:
      "Explore Fable 5 through an independent prompt guide. Build, compare, and refine prompt plans with transparent Fable 5 model notes.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fable 5 — Independent AI Model Guide & Prompt Workspace",
    description:
      "Craft better prompts for Fable 5 AI. Independent guide covering Fable 5 model prompts, safety checklists, and access-tracking notes.",
    creator: "@fable5io",
  },
  generator: "v0.app",
}

const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Fable 5",
  url: siteUrl,
  description:
    "Independent AI model guide and prompt workspace for Fable 5. No official affiliation is claimed.",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${siteUrl}/?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
}

const jsonLdSoftwareApp = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Fable 5 Prompt Workspace",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  url: siteUrl,
  description:
    "An independent Fable 5 AI prompt planner and guide. Design structured prompts, compare prompt formats, and track public access notes.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
}

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Fable 5?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fable 5 is the primary keyword tracked by this independent prompt workspace. The site helps users organize prompts, access notes, and model-comparison questions without claiming official status.",
      },
    },
    {
      "@type": "Question",
      name: "Is fable5.io an official Fable 5 product?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. fable5.io is an independent community guide and prompt workspace. It does not claim affiliation with any official Fable 5 publisher, developer, or platform owner.",
      },
    },
    {
      "@type": "Question",
      name: "What can I do with the Fable 5 prompt workspace?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can craft and plan structured prompts for Fable 5 AI, select prompt modes, preview structured guidance, and use templates before testing prompts in your own tools.",
      },
    },
    {
      "@type": "Question",
      name: "Does this give me live access to the Fable 5 AI model?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The workspace generates structured prompt plans and guidance, not live model output. Think of it as a prompt design tool, not a Fable 5 API client.",
      },
    },
  ],
}

const jsonLdBreadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Prompt Planner",
      item: `${siteUrl}/#prompt-planner`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "FAQ",
      item: `${siteUrl}/#faq`,
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable} antialiased bg-[#F7F5F3]`}>
      <head>
        <link rel="canonical" href={siteUrl} />
        <script defer data-domain="fable5.io" src="https://plau.origai.net/js/script.js"></script>
        <script
          id="ld-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
        />
        <script
          id="ld-app"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftwareApp) }}
        />
        <script
          id="ld-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
        />
        <script
          id="ld-breadcrumb"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
