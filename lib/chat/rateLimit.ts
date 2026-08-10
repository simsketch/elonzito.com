/** Requests permitted per IP per {@link WINDOW_MS}. */
export const MAX_REQUESTS = 10

/** Sliding window length, 10 minutes. */
export const WINDOW_MS = 10 * 60 * 1000

/**
 * Hit timestamps per IP.
 *
 * Module scope, so it survives between invocations on a warm serverless
 * instance — and is lost on a cold one. **This limiter is per instance, not
 * global.** It stops casual abuse and accidental loops; it cannot stop a
 * distributed attacker. The AI Gateway key's monthly budget is the control that
 * actually bounds spend. See §6.2 of the design spec.
 */
const hits = new Map<string, number[]>()

/** Drop every record outside the current window. Bounds memory growth. */
function prune(now: number): void {
  for (const [ip, times] of hits) {
    const live = times.filter((t) => now - t < WINDOW_MS)
    if (live.length === 0) hits.delete(ip)
    else hits.set(ip, live)
  }
}

/**
 * Record a request and report whether it is allowed.
 *
 * @param now injectable clock, so the window is testable without waiting
 * @returns `retryAfter` in whole seconds, 0 when allowed
 */
export function checkRateLimit(
  ip: string,
  now: number = Date.now()
): { ok: boolean; retryAfter: number } {
  prune(now)

  const times = hits.get(ip) ?? []

  if (times.length >= MAX_REQUESTS) {
    const oldest = times[0]
    const retryAfter = Math.ceil((WINDOW_MS - (now - oldest)) / 1000)
    return { ok: false, retryAfter: Math.max(retryAfter, 1) }
  }

  times.push(now)
  hits.set(ip, times)
  return { ok: true, retryAfter: 0 }
}

/** Test seam. Not used in production code. */
export function resetRateLimits(): void {
  hits.clear()
}
