import { describe, it, expect, beforeEach } from 'vitest'
import { checkRateLimit, resetRateLimits, MAX_REQUESTS, WINDOW_MS } from './rateLimit'

describe('checkRateLimit', () => {
  beforeEach(() => resetRateLimits())

  it('allows up to MAX_REQUESTS in the window', () => {
    for (let i = 0; i < MAX_REQUESTS; i++) {
      expect(checkRateLimit('1.1.1.1', 1000).ok, `request ${i + 1}`).toBe(true)
    }
  })

  it('blocks the request after the limit', () => {
    for (let i = 0; i < MAX_REQUESTS; i++) checkRateLimit('1.1.1.1', 1000)
    const blocked = checkRateLimit('1.1.1.1', 1000)
    expect(blocked.ok).toBe(false)
    expect(blocked.retryAfter).toBeGreaterThan(0)
  })

  it('tracks each IP separately', () => {
    for (let i = 0; i < MAX_REQUESTS; i++) checkRateLimit('1.1.1.1', 1000)
    expect(checkRateLimit('2.2.2.2', 1000).ok).toBe(true)
  })

  it('allows again once the window has elapsed', () => {
    for (let i = 0; i < MAX_REQUESTS; i++) checkRateLimit('1.1.1.1', 1000)
    expect(checkRateLimit('1.1.1.1', 1000).ok).toBe(false)
    expect(checkRateLimit('1.1.1.1', 1000 + WINDOW_MS + 1).ok).toBe(true)
  })

  it('reports retryAfter in whole seconds, counting from the oldest hit', () => {
    for (let i = 0; i < MAX_REQUESTS; i++) checkRateLimit('1.1.1.1', 1000)
    const { retryAfter } = checkRateLimit('1.1.1.1', 1000)
    expect(retryAfter).toBe(Math.ceil(WINDOW_MS / 1000))
    expect(Number.isInteger(retryAfter)).toBe(true)
  })

  it('does not grow unboundedly: expired entries are pruned', () => {
    checkRateLimit('old-ip', 1000)
    // A later request from a different IP prunes anything outside the window.
    checkRateLimit('new-ip', 1000 + WINDOW_MS * 2)
    expect(checkRateLimit('old-ip', 1000 + WINDOW_MS * 2).ok).toBe(true)
  })
})
