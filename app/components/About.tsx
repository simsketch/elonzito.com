'use client'

import { useEffect, useRef, useState } from 'react'

export default function About() {
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
      id="about"
      ref={sectionRef}
      className="py-32 relative"
    >
      <div className="container-editorial">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Section label */}
          <div className="lg:col-span-3">
            <div
              className={`${
                isVisible ? 'animate-reveal-up opacity-100' : 'opacity-0'
              }`}
            >
              <span className="number-indicator">01</span>
              <h2 className="heading-section mt-2">About</h2>
              <div className="w-12 h-1 bg-[var(--color-rust)] mt-4" />
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-9">
            <div
              className={`${
                isVisible ? 'animate-reveal-up delay-200 opacity-100' : 'opacity-0'
              }`}
            >
              <p className="font-serif text-2xl md:text-3xl lg:text-4xl leading-snug mb-8">
                Principal Software Engineer certified in{' '}
                <span className="italic text-[var(--color-rust)]">Generative AI</span>,
                specializing in leveraging LLMs, GenAI, and NLP to create automated
                solutions that enhance productivity.
              </p>
            </div>

            <div
              className={`${
                isVisible ? 'animate-reveal-up delay-300 opacity-100' : 'opacity-0'
              }`}
            >
              <p className="font-mono text-sm leading-relaxed opacity-70 max-w-2xl">
                Experienced in architecting end-to-end technology solutions across
                full-stack development, team leadership, QA automation, and Agile
                methodologies. Technical expertise spans e-commerce platforms, mobile
                development (React Native, Ionic), UX/UI design, and developer mentorship
                with a focus on creating solutions that drive technological advancement.
              </p>
            </div>

            {/* Stats */}
            <div
              className={`grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t-2 border-[var(--color-ink)]/10 ${
                isVisible ? 'animate-reveal-up delay-400 opacity-100' : 'opacity-0'
              }`}
            >
              {[
                { value: '10+', label: 'Years Experience' },
                { value: '50+', label: 'Projects Delivered' },
                { value: '5', label: 'Companies' },
                { value: '∞', label: 'Lines of Code' },
              ].map((stat, index) => (
                <div key={index}>
                  <div className="font-display text-4xl md:text-5xl text-[var(--color-rust)]">
                    {stat.value}
                  </div>
                  <div className="font-mono text-xs uppercase tracking-wider opacity-60 mt-2">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-1/3 h-px bg-gradient-to-r from-transparent via-[var(--color-ink)]/10 to-transparent" />
    </section>
  )
}
