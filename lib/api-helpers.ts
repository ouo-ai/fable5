import { NextRequest, NextResponse } from "next/server"

/** Shared helpers for the API routes: client IP, rate limiting, error shape, upstream mapping. */

export function getClientIp(request: NextRequest): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
}

interface RateLimiterOptions {
  windowMs: number
  maxRequests: number
}

/**
 * Best-effort per-instance limiter; serverless instances each keep their own window,
 * which is acceptable for free demo endpoints backed by free-tier models.
 */
export function createRateLimiter(options: RateLimiterOptions): (ip: string) => boolean {
  const hits = new Map<string, { count: number; resetAt: number }>()
  return function isRateLimited(ip: string): boolean {
    const now = Date.now()
    const entry = hits.get(ip)
    if (!entry || entry.resetAt <= now) {
      hits.set(ip, { count: 1, resetAt: now + options.windowMs })
      return false
    }
    entry.count += 1
    return entry.count > options.maxRequests
  }
}

export function errorResponse(status: number, code: string, message: string): NextResponse {
  return NextResponse.json({ data: null, error: { message, code } }, { status })
}

export interface UpstreamErrorMapping {
  status: number
  code: string
  message: string
}

/** Map an OpenRouter non-200 status to a sanitized client-facing error. */
export function mapUpstreamStatus(status: number): UpstreamErrorMapping {
  if (status === 401 || status === 403) {
    return { status: 502, code: "UPSTREAM_AUTH", message: "The live model service rejected the configuration." }
  }
  if (status === 402) {
    return { status: 502, code: "UPSTREAM_CREDITS", message: "The live model service is temporarily unavailable." }
  }
  if (status === 429) {
    return { status: 429, code: "UPSTREAM_BUSY", message: "Free model capacity is busy right now. Try again shortly." }
  }
  return { status: 502, code: "UPSTREAM_ERROR", message: "The model provider returned an error. Try another model." }
}
