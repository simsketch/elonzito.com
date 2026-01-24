'use client'

import { useEffect, useRef, useState } from 'react'

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/simsketch',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
      </svg>
    )
  },
  {
    name: 'CodePen',
    url: 'https://codepen.io/simsketch',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l10 6.5v7L12 22 2 15.5v-7L12 2zm0 2.311L4.077 9.5 12 14.689 19.923 9.5 12 4.311zM4 10.653v4.694l6 3.9v-4.694l-6-3.9zm16 0l-6 3.9v4.694l6-3.9v-4.694z" />
      </svg>
    )
  },
  {
    name: 'Stack Overflow',
    url: 'https://stackoverflow.com/users/1579789/simsketch',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M15.725 0l-1.72 1.277 6.39 8.588 1.72-1.277L15.725 0zm-3.94 3.418l-1.369 1.644 8.225 6.85 1.369-1.644-8.225-6.85zm-3.15 4.465l-.905 1.94 9.702 4.517.905-1.94-9.702-4.517zm-1.85 4.86l-.44 2.093 10.473 2.201.44-2.092-10.473-2.203zM2.252 18.93v2.164h15.036v-2.164H2.252z" />
      </svg>
    )
  },
  {
    name: 'Dribbble',
    url: 'https://dribbble.com/simsketch',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
      </svg>
    )
  }
]

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
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[var(--color-ink)] -z-10" />

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
          <div className="lg:pl-16 text-[var(--color-bone)]">
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
                <div className="flex gap-6">
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
      <div className="absolute bottom-40 right-1/4 w-24 h-24 border border-[var(--color-ink)]/10 rounded-full" />
    </section>
  )
}
