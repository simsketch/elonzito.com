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
                Generative AI certified principal engineer, specializing in leveraging{' '}
                <span className="italic text-[var(--color-rust)]">LLMs, GenAI, Agentic Frameworks</span>{' '}
                and NLP to create automated solutions that enhance productivity and reduce errors.
              </p>
            </div>

            <div
              className={`${
                isVisible ? 'animate-reveal-up delay-300 opacity-100' : 'opacity-0'
              }`}
            >
              <p className="font-mono text-sm leading-relaxed opacity-70 max-w-2xl">
                Architect of end-to-end technology solutions across full-stack development,
                leadership, QA automation, and Agile methodologies. Expertise spans e-commerce
                platforms, mobile development, UX/UI design, and developer mentorship with a
                focus on creating solutions that drive technological advancement.
              </p>
            </div>

            {/* Education */}
            <div
              className={`mt-12 pt-8 border-t border-[var(--color-ink)]/10 ${
                isVisible ? 'animate-reveal-up delay-350 opacity-100' : 'opacity-0'
              }`}
            >
              <h3 className="font-mono text-xs uppercase tracking-[0.3em] opacity-50 mb-4">
                Education & Certifications
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="font-display text-lg">Generative AI with Large Language Models</div>
                  <div className="font-mono text-xs opacity-50">Coursera — May 2024</div>
                </div>
                <div>
                  <div className="font-display text-lg">AA Graphic Design</div>
                  <div className="font-mono text-xs opacity-50">Palm Beach State College — GPA 3.65</div>
                </div>
                <div>
                  <div className="font-display text-lg">College Credit Certificate in Information Technology</div>
                  <div className="font-mono text-xs opacity-50">Palm Beach State College</div>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div
              className={`mt-8 ${
                isVisible ? 'animate-reveal-up delay-400 opacity-100' : 'opacity-0'
              }`}
            >
              <h3 className="font-mono text-xs uppercase tracking-[0.3em] opacity-50 mb-4">
                Languages
              </h3>
              <div className="flex flex-wrap gap-6">
                <div>
                  <span className="font-display text-lg">English</span>
                  <span className="font-mono text-xs opacity-50 ml-2">Native</span>
                </div>
                <div>
                  <span className="font-display text-lg">Spanish</span>
                  <span className="font-mono text-xs opacity-50 ml-2">Very Good</span>
                </div>
                <div>
                  <span className="font-display text-lg">Portuguese</span>
                  <span className="font-mono text-xs opacity-50 ml-2">Working Knowledge</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div
              className={`grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t-2 border-[var(--color-ink)]/10 ${
                isVisible ? 'animate-reveal-up delay-500 opacity-100' : 'opacity-0'
              }`}
            >
              {[
                { value: '14+', label: 'Years Experience' },
                { value: '13', label: 'Companies' },
                { value: '3', label: 'Startups Founded' },
                { value: '5', label: 'Team Lead Roles' },
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
