import Link from 'next/link'

export const metadata = {
  title: 'Page not found — Elon Zito',
}

export default function NotFound() {
  return (
    <main className="grid-pattern flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <span className="number-indicator">404</span>
      <h1 className="heading-massive mt-2">
        Lost<span className="text-[var(--color-rust)]">.</span>
      </h1>
      <div className="mt-6 h-1 w-12 bg-[var(--color-rust)]" />
      <p className="mt-8 max-w-md font-serif text-lg leading-relaxed">
        That page moved on. The work, the writing, and the rest of it are still
        where you left them.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="border-2 border-[var(--color-ink)] bg-[var(--color-ink)] px-8 py-3 font-mono text-xs uppercase tracking-widest text-[var(--color-bone)] transition-colors hover:bg-[var(--color-rust)] hover:border-[var(--color-rust)]"
        >
          Back to the site
        </Link>
        <Link
          href="/chat"
          className="border-2 border-[var(--color-ink)] px-8 py-3 font-mono text-xs uppercase tracking-widest transition-colors hover:border-[var(--color-rust)] hover:text-[var(--color-rust)]"
        >
          Ask about Elon
        </Link>
      </div>
    </main>
  )
}
