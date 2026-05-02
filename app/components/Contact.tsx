'use client'

import { useEffect, useRef, useState } from 'react'
import { socialLinks } from './socialLinks'

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-32 relative overflow-hidden"
    >
      {/* Background decoration - right half on lg, full width behind contact info on mobile */}
      <div className="hidden lg:block absolute top-0 right-0 w-1/2 h-full bg-[var(--color-ink)] -z-10" />

      <div className="container-editorial">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left side - CTA */}
          <div>
            <div
              className={`${
                isVisible ? 'animate-reveal-up opacity-100' : 'opacity-0'
              }`}
            >
              <span className="number-indicator">05</span>
              <h2 className="heading-large mt-4">
                Let&apos;s<br />
                <span className="italic-accent">work</span><br />
                together<span className="text-[var(--color-rust)]">.</span>
              </h2>
            </div>

            <p
              className={`font-serif text-xl leading-relaxed mt-8 max-w-md opacity-70 ${
                isVisible ? 'animate-reveal-up delay-200 opacity-100' : 'opacity-0'
              }`}
            >
              Currently available for freelance projects, consulting, and full-time opportunities.
            </p>

            <a
              href="mailto:simsketch@gmail.com"
              className={`group inline-flex items-center gap-4 mt-12 ${
                isVisible ? 'animate-reveal-up delay-300 opacity-100' : 'opacity-0'
              }`}
            >
              <span className="px-8 py-4 bg-[var(--color-rust)] text-[var(--color-bone)] font-mono text-sm uppercase tracking-widest hover:bg-[var(--color-ink)] transition-colors duration-300">
                Send Email
              </span>
              <svg
                className="w-6 h-6 text-[var(--color-rust)] transform group-hover:translate-x-2 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Right side - Contact info */}
          <div className="bg-[var(--color-ink)] lg:bg-transparent -mx-8 px-8 py-12 lg:mx-0 lg:px-0 lg:py-0 lg:pl-16 text-[var(--color-bone)]">
            <div
              className={`space-y-12 ${
                isVisible ? 'animate-reveal-up delay-400 opacity-100' : 'opacity-0'
              }`}
            >
              {/* Email */}
              <div>
                <h3 className="font-mono text-xs uppercase tracking-[0.3em] opacity-50 mb-4">
                  Email
                </h3>
                <a
                  href="mailto:simsketch@gmail.com"
                  className="font-serif text-2xl md:text-3xl italic hover:text-[var(--color-rust)] transition-colors"
                >
                  simsketch@gmail.com
                </a>
              </div>

              {/* Phone */}
              <div>
                <h3 className="font-mono text-xs uppercase tracking-[0.3em] opacity-50 mb-4">
                  Phone
                </h3>
                <a
                  href="tel:+15615039444"
                  className="font-display text-2xl md:text-3xl tracking-wide hover:text-[var(--color-rust)] transition-colors"
                >
                  (561) 503-9444
                </a>
              </div>

              {/* Location */}
              <div>
                <h3 className="font-mono text-xs uppercase tracking-[0.3em] opacity-50 mb-4">
                  Location
                </h3>
                <p className="font-display text-2xl md:text-3xl tracking-wide">
                  Syracuse, NY
                </p>
              </div>

              {/* Social links */}
              <div>
                <h3 className="font-mono text-xs uppercase tracking-[0.3em] opacity-50 mb-4">
                  Find Me
                </h3>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 border border-[var(--color-bone)]/20 hover:border-[var(--color-rust)] hover:text-[var(--color-rust)] transition-colors"
                      aria-label={link.name}
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-1/4 w-2 h-2 bg-[var(--color-rust)] rounded-full" />
    </section>
  )
}
