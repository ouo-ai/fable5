import type { MetadataRoute } from "next"
import { siteUrl } from "../lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return [
    { url: siteUrl, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${siteUrl}/chat`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/playground`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/models`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${siteUrl}/templates`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/disclaimer`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ]
}
