import type React from "react"
import type { Metadata } from "next"
import { Inter, Instrument_Serif } from "next/font/google"
import "./globals.css"
import { faqData } from "../lib/faq-data"
import { siteUrl } from "../lib/site"

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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Fable 5 AI — Independent Model Guide & Prompt Workspace",
    template: "%s | Fable 5",
  },
  description:
    "Independent guide to Anthropic's Fable 5 model — specs, API pricing, access channels, 42 prompt templates, and a free playground for testing prompt structure.",
  keywords: [
    "Fable 5",
    "Fable 5 AI",
    "Claude Fable 5",
    "Fable 5 model",
    "Fable 5 pricing",
    "Fable 5 API",
    "Fable 5 access",
    "Fable 5 prompts",
    "Fable 5 prompt guide",
    "Fable 5 prompt templates",
    "Fable 5 AI model",
    "Fable 5 workspace",
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
    title: "Fable 5 AI — Independent Model Guide & Prompt Workspace",
    description:
      "Anthropic's Fable 5 model, explained independently: specs, API pricing, access channels, prompt templates, and a free testing playground.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@fable5io",
    creator: "@fable5io",
    title: "Fable 5 AI — Independent Model Guide & Prompt Workspace",
    description:
      "Anthropic's Fable 5 model, explained independently: specs, pricing, access, prompt templates, and a free testing playground.",
  },
  generator: "v0.app",
}

const jsonLdWebsite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Fable 5",
  alternateName: ["fable5.io", "Fable 5 AI", "Claude Fable 5 guide"],
  url: siteUrl,
  description:
    "Independent guide and prompt workspace for Anthropic's Fable 5 model. Not affiliated with Anthropic.",
}

const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "fable5.io",
  url: siteUrl,
  logo: `${siteUrl}/icon-512.png`,
  sameAs: ["https://twitter.com/fable5io", "https://github.com/fable5io"],
}

const jsonLdSoftwareApp = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Fable 5 Prompt Workspace",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  url: siteUrl,
  description:
    "An independent Fable 5 prompt planner and guide. Design structured prompts, test them on free open models, and track public Fable 5 specs and access notes.",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
}

const jsonLdFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
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
      name: "Fable 5 Guide",
      item: `${siteUrl}/#guide`,
    },
    {
      "@type": "ListItem",
      position: 4,
      name: "FAQ",
      item: `${siteUrl}/#faq`,
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable} antialiased bg-[#F7F5F3]`}>
      <head>
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
        <script
          id="ld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
