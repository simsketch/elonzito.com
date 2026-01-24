'use client'

import { useEffect, useRef, useState } from 'react'

const experiences = [
  {
    title: "Senior Software Engineer",
    company: "uShip",
    period: "Jan 2022 — Present",
    location: "Remote — Austin, TX",
    highlights: [
      "Architected enterprise-scale GenAI solutions leveraging Document Loaders, Text Embeddings, RAG, vector stores, and LLM frameworks",
      "Led development of AI-powered products using OpenAI Vision API, Python, BeautifulSoup, FastAPI, Flask and custom PyTorch models",
      "Designed and maintained full-stack applications using Next.js, Node.js while implementing microservices architecture",
      "Built and maintained containerized deployment architecture using Docker, Kubernetes, and IaC tools"
    ]
  },
  {
    title: "Principal Software Engineer",
    company: "Ambrose Health",
    period: "Oct 2019 — Dec 2021",
    location: "Deerfield Beach, FL",
    highlights: [
      "Architected and implemented distributed microservices architecture using AWS services",
      "Designed and built mission-critical integration platforms connecting diverse systems",
      "Established robust CI/CD pipelines with blue/green deployment strategies",
      "Created modular frontend applications using React, Angular, and Vue"
    ]
  },
  {
    title: "Software Engineer",
    company: "Extreme Reach",
    period: "Jan 2013 — Oct 2019",
    location: "Remote — Needham, MA",
    highlights: [
      "Led development of high-traffic media platforms for ABC & Fox News using AngularJS and .NET/C#",
      "Architected and optimized cross-platform infrastructure using configuration management tools",
      "Developed automated testing and web scraping solutions using Puppeteer for quality assurance",
      "Built scalable database architecture using MySQL and MS SQL Server"
    ]
  },
  {
    title: "Senior Frontend Developer",
    company: "Adopt-a-Pet",
    period: "Feb 2019 — Oct 2019",
    location: "Contract — Claremont, CA",
    highlights: [
      "Architected and developed high-performance search engine using Vue.js, Vuex, Apollo GraphQL, Hasura, and PostgreSQL",
      "Led mobile-first redesign of web platform with device-specific optimizations",
      "Established comprehensive testing strategy using Cypress, Selenium, and Jest",
      "Enhanced search algorithm efficiency through implementation of advanced filtering and fuzzy matching"
    ]
  },
  {
    title: "Senior Front End Developer",
    company: "Basic Fun!",
    period: "Aug 2018 — Feb 2019",
    location: "Contract — Boca Raton, FL",
    highlights: [
      "Architected and developed brand-focused web platforms using React with custom hooks",
      "Built scalable multi-brand infrastructure using Laravel PHP",
      "Created and optimized responsive email campaigns using Adobe Creative Suite",
      "Implemented SEO-optimized content strategy through technical copywriting and metadata optimization"
    ]
  }
]

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-32 bg-[var(--color-ink)] text-[var(--color-bone)] relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-bone) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container-editorial relative">
        {/* Section header */}
        <div className="grid lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-3">
            <div
              className={`${
                isVisible ? 'animate-reveal-up opacity-100' : 'opacity-0'
              }`}
            >
              <span className="number-indicator text-[var(--color-bone)]/50">02</span>
              <h2 className="heading-section mt-2">Experience</h2>
              <div className="w-12 h-1 bg-[var(--color-rust)] mt-4" />
            </div>
          </div>
          <div className="lg:col-span-9">
            <p
              className={`font-serif text-xl md:text-2xl leading-relaxed opacity-70 max-w-2xl ${
                isVisible ? 'animate-reveal-up delay-100 opacity-100' : 'opacity-0'
              }`}
            >
              A decade of building products, leading teams, and pushing the boundaries
              of what&apos;s possible with code.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-0">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`group grid lg:grid-cols-12 gap-8 py-12 border-t border-[var(--color-bone)]/10 hover:bg-[var(--color-bone)]/5 transition-colors duration-300 ${
                isVisible ? 'animate-reveal-up opacity-100' : 'opacity-0'
              }`}
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              {/* Left column - Meta */}
              <div className="lg:col-span-4 flex flex-col gap-2">
                <div className="font-mono text-xs uppercase tracking-wider opacity-50">
                  {exp.period}
                </div>
                <h3 className="font-display text-2xl tracking-wide group-hover:text-[var(--color-rust)] transition-colors">
                  {exp.title}
                </h3>
                <div className="font-serif italic text-lg opacity-80">
                  {exp.company}
                </div>
                <div className="font-mono text-xs opacity-40 mt-1">
                  {exp.location}
                </div>
              </div>

              {/* Right column - Details */}
              <div className="lg:col-span-8">
                <ul className="space-y-3">
                  {exp.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="font-mono text-sm leading-relaxed opacity-70 pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-[var(--color-rust)] before:rounded-full"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-32 h-32 border border-[var(--color-bone)]/10 rounded-full" />
      <div className="absolute bottom-20 left-20 w-16 h-16 border border-[var(--color-bone)]/10" style={{ transform: 'rotate(45deg)' }} />
    </section>
  )
}
