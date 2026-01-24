'use client'

import { useEffect, useState } from 'react'

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-20">
      {/* Decorative elements */}
      <div className="absolute top-20 right-[10%] w-64 h-64 border-2 border-[var(--color-ink)] rounded-full opacity-5 animate-spin-slow" />
      <div className="absolute bottom-40 left-[5%] w-32 h-32 border-2 border-[var(--color-ink)] opacity-5" style={{ transform: 'rotate(45deg)' }} />
      <div className="absolute top-1/3 right-[20%] w-4 h-4 bg-[var(--color-rust)] rounded-full opacity-40" />

      <div className="container-editorial">
        {/* Pre-title */}
        <div
          className={`flex items-center gap-4 mb-8 ${
            mounted ? 'animate-reveal-up opacity-100' : 'opacity-0'
          }`}
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em] opacity-60">
            Senior Product Engineer (R+D)
          </span>
          <span className="w-16 h-px bg-[var(--color-ink)] opacity-30" />
        </div>

        {/* Main title */}
        <div className="relative">
          <h1
            className={`heading-massive ${
              mounted ? 'animate-reveal-up delay-100 opacity-100' : 'opacity-0'
            }`}
          >
            Elon
          </h1>
          <h1
            className={`heading-massive flex items-baseline gap-4 ${
              mounted ? 'animate-reveal-up delay-200 opacity-100' : 'opacity-0'
            }`}
          >
            <span className="italic-accent text-[0.7em]">Zito</span>
            <span className="text-[var(--color-rust)]">*</span>
          </h1>
        </div>

        {/* Subtitle */}
        <div
          className={`mt-12 max-w-xl ${
            mounted ? 'animate-reveal-up delay-300 opacity-100' : 'opacity-0'
          }`}
        >
          <p className="font-serif text-xl md:text-2xl leading-relaxed">
            Architecting intelligent systems with{' '}
            <span className="italic">agentic AI</span>,{' '}
            <span className="italic">LLMs</span>, and{' '}
            <span className="italic">full-stack engineering</span>.
          </p>
        </div>

        {/* CTA Row */}
        <div
          className={`mt-16 flex flex-wrap items-center gap-8 ${
            mounted ? 'animate-reveal-up delay-400 opacity-100' : 'opacity-0'
          }`}
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-4 px-8 py-4 bg-[var(--color-ink)] text-[var(--color-bone)] font-mono text-sm uppercase tracking-widest hover:bg-[var(--color-rust)] transition-colors duration-300"
          >
            Get in Touch
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          <a
            href="#experience"
            className="font-mono text-sm uppercase tracking-widest link-underline"
          >
            View Experience
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 ${
            mounted ? 'animate-fade-in delay-600 opacity-100' : 'opacity-0'
          }`}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-40 vertical-text">
            Scroll
          </span>
          <div className="w-px h-12 bg-[var(--color-ink)] opacity-20 animate-scroll-bounce" />
        </div>
      </div>

      {/* Side decoration */}
      <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2">
        <div className="vertical-text font-mono text-[10px] uppercase tracking-[0.3em] opacity-30">
          Syracuse, NY — 2024
        </div>
      </div>
    </section>
  )
}
