/** Canonical site origin, shared by metadata, sitemap, robots and API headers. */
export const siteUrl: string = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://fable5.io").replace(/\/$/, "")
