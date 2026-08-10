'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)

      // Determine active section
      const sections = ['about', 'experience', 'skills', 'projects', 'contact']
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 200) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Blog', href: 'https://medium.com/@simsketch', external: true },
    { label: 'Chat', href: '/chat' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-bone/95 backdrop-blur-sm border-b-2 border-[var(--color-ink)] text-[var(--color-ink)]'
          : 'text-[var(--color-bone)]'
      }`}
    >
      {/* Scrim. Before the first scroll the header floats over the retro
          computer, whose CRT is near-black — ink-on-black left the nav
          invisible. Light text plus this gradient keeps it legible over the
          3D scene and over the light static fallback alike. */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-black/60 via-black/25 to-transparent transition-opacity duration-500 ${
          isScrolled ? 'opacity-0' : 'opacity-100'
        }`}
      />

      <nav className="container-editorial relative z-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="#"
          className="font-display text-xl tracking-wider hover:text-[var(--color-rust)] transition-colors"
        >
          EZ<span className="text-[var(--color-rust)]">.</span>
        </Link>

        {/* Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.label}>
              {item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-widest link-underline transition-colors hover:text-[var(--color-rust)]"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  href={item.href}
                  className={`font-mono text-xs uppercase tracking-widest link-underline transition-colors ${
                    activeSection === item.href.slice(1)
                      ? 'text-[var(--color-rust)]'
                      : 'hover:text-[var(--color-rust)]'
                  }`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Status indicator */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-[var(--color-sage)] rounded-full animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest opacity-60">
            Available
          </span>
        </div>
      </nav>
    </header>
  )
}
