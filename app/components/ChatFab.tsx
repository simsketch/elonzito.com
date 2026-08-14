'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

/**
 * Floating entry point to /chat.
 *
 * Rendered from the root layout so it follows the visitor down every page.
 * It hides itself on /chat — a button that navigates to the page you are
 * already on is noise, and it would sit on top of the composer.
 */
export default function ChatFab() {
  const pathname = usePathname()
  if (pathname?.startsWith('/chat')) return null

  return (
    <Link
      href="/chat"
      aria-label="Ask the assistant about Elon"
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-0 rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-ink)] py-3 pl-4 pr-4 text-[var(--color-bone)] shadow-[4px_4px_0_var(--color-rust)] outline-none transition-[transform,box-shadow,background-color,gap,padding] duration-300 hover:gap-2 hover:bg-[var(--color-rust)] hover:pr-5 hover:shadow-[4px_4px_0_var(--color-ink)] focus-visible:ring-2 focus-visible:ring-[var(--color-rust)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bone)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none motion-reduce:transition-none sm:bottom-8 sm:right-8"
    >
      {/* Speech bubble with an ascending three-dot "thinking" rhythm. Drawn
          rather than imported so the stroke weight matches the site's 2px rules. */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="shrink-0 transition-transform duration-300 group-hover:-rotate-6 motion-reduce:transition-none motion-reduce:group-hover:rotate-0"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        <circle cx="8.5" cy="12" r="0.6" fill="currentColor" />
        <circle cx="12" cy="12" r="0.6" fill="currentColor" />
        <circle cx="15.5" cy="12" r="0.6" fill="currentColor" />
      </svg>

      {/* Label unfurls on hover. max-width rather than display so it can
          animate; hidden from a11y tree since the link is already labelled. */}
      <span
        aria-hidden="true"
        className="max-w-0 overflow-hidden whitespace-nowrap font-mono text-xs uppercase tracking-widest opacity-0 transition-[max-width,opacity] duration-300 group-hover:max-w-[10rem] group-hover:opacity-100 motion-reduce:transition-none"
      >
        Ask about Elon
      </span>

      {/* Live-ish dot, echoing the header's "Available" indicator. */}
      <span
        aria-hidden="true"
        className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-[var(--color-bone)] bg-[var(--color-sage)] motion-safe:animate-pulse"
      />
    </Link>
  )
}
