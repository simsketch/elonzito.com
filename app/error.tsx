'use client'

import { useEffect } from 'react'
import Link from 'next/link'

/**
 * Route-level error boundary. Client component by requirement — Next needs to
 * re-render it in the browser to offer the retry.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[app] unhandled error:', error)
  }, [error])

  return (
    <main className="grid-pattern flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <span className="number-indicator">500</span>
      <h1 className="heading-large mt-2">
        Something broke<span className="text-[var(--color-rust)]">.</span>
      </h1>
      <div className="mt-6 h-1 w-12 bg-[var(--color-rust)]" />
      <p className="mt-8 max-w-md font-serif text-lg leading-relaxed">
        An error on this end, not yours. Try again — and if it keeps happening,
        Elon would genuinely like to know at{' '}
        <a
          className="link-underline text-[var(--color-rust)]"
          href="mailto:simsketch@gmail.com"
        >
          simsketch@gmail.com
        </a>
        .
      </p>
      {error.digest && (
        <p className="mt-4 font-mono text-xs text-ink-muted">
          Reference: {error.digest}
        </p>
      )}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={reset}
          className="border-2 border-[var(--color-ink)] bg-[var(--color-ink)] px-8 py-3 font-mono text-xs uppercase tracking-widest text-[var(--color-bone)] transition-colors hover:border-[var(--color-rust)] hover:bg-[var(--color-rust)]"
        >
          Try again
        </button>
        <Link
          href="/"
          className="border-2 border-[var(--color-ink)] px-8 py-3 font-mono text-xs uppercase tracking-widest transition-colors hover:border-[var(--color-rust)] hover:text-[var(--color-rust)]"
        >
          Back to the site
        </Link>
      </div>
    </main>
  )
}
