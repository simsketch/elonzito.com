'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const INITIAL_VISIBLE = 6

const startups = [
  {
    title: "TimeIQ",
    description: "Smart scheduling platform that eliminates email-based meeting coordination. Shareable booking links with calendar sync, automatic timezone detection, and configurable buffer times.",
    link: "https://timeiq.app/",
    image: "/projects/timeiq.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Founder"],
    period: "2024 — Present",
    number: "01"
  },
  {
    title: "DocumentIQ",
    description: "Browser-based document signing platform. Upload documents, send a signing link, and collect digital signatures — no downloads or paper required.",
    link: "https://documentiq.app/",
    image: "/projects/documentiq.png",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Founder"],
    period: "2024 — Present",
    number: "02"
  },
  {
    title: "DevToolbox",
    description: "Native desktop app bundling 36+ developer utilities — JSON formatter, UUID generator, JWT decoder, regex tester, and more — with a visual pipeline builder for chaining tools into custom workflows.",
    link: "https://devtoolbox.store/",
    image: "/projects/devtoolbox.png",
    github: "https://github.com/simsketch/devtoolbox",
    tags: ["Rust", "Tauri", "Desktop", "Founder"],
    period: "2024 — Present",
    number: "03"
  },
  {
    title: "FreeUpSpace",
    description: "macOS utility that detects and safely removes cached files, build artifacts, and dependencies from developer tools like Docker, Xcode, and Node.js to reclaim disk space.",
    link: "https://freeupspace.app/",
    image: "/projects/freeupspace.png",
    github: "https://github.com/simsketch/freeupspace",
    tags: ["Swift", "macOS", "Native", "Founder"],
    period: "2024 — Present",
    number: "04"
  },
  {
    title: "TouchGuides",
    description: "Everything you need to host! TouchGuides allows hosts to create personalized recommendations for their guests, ensuring a unique and memorable stay.",
    link: "https://touchguides.com/",
    image: "/projects/touchguides.png",
    tags: ["React", "Node.js", "MongoDB", "Founder"],
    period: "Feb 2023 — Present",
    location: "Syracuse, NY",
    number: "05"
  },
  {
    title: "Avilon AI",
    description: "AI-powered conversation rehearsal platform. Create digital twins from a photo and voice sample, then practice difficult conversations with realistic lip-synced video responses.",
    link: "https://avilonai.com/",
    image: "/projects/avilonai.png",
    github: "https://github.com/simsketch/avilonai.com",
    tags: ["Next.js", "TypeScript", "AI/ML", "Founder"],
    period: "2024 — Present",
    number: "06"
  },
  {
    title: "CampsiteIQ",
    description: "All-in-one campground management software with an AI reservation assistant, digital guidebooks, and a centralized operations dashboard for properties and analytics.",
    link: "https://campsiteiq.com/",
    image: "/projects/campsiteiq.png",
    tags: ["Astro", "TypeScript", "AI", "Founder"],
    period: "2024 — Present",
    number: "07"
  },
  {
    title: "HealthCompass",
    description: "AI personal health intelligence platform that analyzes uploaded medical documents — lab results, imaging, and genetic tests — and provides actionable insights with biomarker tracking.",
    link: "https://eloiva.com/",
    image: "/projects/healthcompass.png",
    tags: ["Next.js", "TypeScript", "AI/ML", "Founder"],
    period: "2024 — Present",
    number: "08"
  },
  {
    title: "KidCash",
    description: "Digital allowance tracker that helps parents manage children's allowances and monitor savings goals with a fun, kid-friendly interface.",
    link: "https://kidcash.online/",
    image: "/projects/kidcash.png",
    github: "https://github.com/simsketch/kidcash",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Founder"],
    period: "2024 — Present",
    number: "09"
  },
  {
    title: "Reserve.Team",
    description: "AI-powered restaurant reservation system with a voice assistant that answers calls, books tables, and manages modifications 24/7 without staff intervention.",
    link: "https://reserve.team/",
    image: "/projects/reserveteam.png",
    github: "https://github.com/simsketch/ai-reservation-bot",
    tags: ["Next.js", "TypeScript", "AI", "Founder"],
    period: "2024 — Present",
    number: "10"
  },
  {
    title: "Brainstamp",
    description: "Flashcard learning system that generates print-ready, duplex-aligned PDFs from text, image OCR, or Spanish verb conjugation tables. Study digitally with keyboard shortcuts or print perfectly aligned cards.",
    link: "https://brainstamp.online/",
    image: "/projects/brainstamp.png",
    github: "https://github.com/simsketch/brainstamp",
    tags: ["Next.js", "TypeScript", "Tesseract.js", "Founder"],
    period: "2025 — Present",
    number: "11"
  },
  {
    title: "Build The Door",
    description: "Curated startup ideas platform with validated business opportunities, pain score analysis, market research, MVP execution plans, and a Founder Fit Quiz to match entrepreneurs with the right ideas.",
    link: "https://buildthedoor.com/",
    image: "/projects/buildthedoor.png",
    github: "https://github.com/simsketch/buildthedoor",
    tags: ["Next.js", "TypeScript", "MongoDB", "AI", "Founder"],
    period: "2025 — Present",
    number: "12"
  },
  {
    title: "NeuroQuant",
    description: "Multi-strategy AI trading arena where Claude-powered agents autonomously execute options and equity strategies. Real-time leaderboard tracks performance across iron condors, covered calls, momentum swings, and more.",
    link: "#",
    github: "https://github.com/simsketch/neuroquant",
    tags: ["Python", "FastAPI", "Next.js", "AI", "Founder"],
    period: "2025 — Present",
    number: "13"
  },
  {
    title: "FeedbackIQ",
    description: "Drop a widget on your site, collect user feedback, and let an AI agent read your codebase and open a pull request — automatically turning suggestions into code changes.",
    link: "https://feedbackiq.app/",
    github: "https://github.com/simsketch/feedbackiq",
    tags: ["Next.js", "TypeScript", "AI", "Founder"],
    period: "2025 — Present",
    number: "14"
  },
  {
    title: "FrameIQ",
    description: "Native macOS screen capture app with screenshots, recordings, annotations, and a full media library — built with a beautiful, modern interface for Apple Silicon and Intel.",
    link: "https://frameiq.app/",
    image: "/projects/frameiq.png",
    github: "https://github.com/simsketch/frameiq",
    tags: ["Swift", "macOS", "Native", "Founder"],
    period: "2025 — Present",
    number: "15"
  },
  {
    title: "CloudMatch",
    description: "Interactive learning tool for mastering AWS-to-GCP service mappings. Study 61+ equivalencies across 11 categories with flashcards, timed quizzes, and matching games.",
    link: "#",
    image: "/projects/cloudmatch.png",
    github: "https://github.com/simsketch/cloudmatch",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Founder"],
    period: "2025 — Present",
    number: "16"
  },
  {
    title: "TaxIQ",
    description: "AI-powered tax strategy and wealth-building platform built on a 6-phase financial transformation framework with an AI copilot for personalized tax optimization.",
    link: "https://taxiq.app/",
    github: "https://github.com/simsketch/taxiq",
    tags: ["Next.js", "TypeScript", "AI", "Founder"],
    period: "2025 — Present",
    number: "17"
  },
  {
    title: "OddsIQ",
    description: "Prediction market auto-trader that finds mispriced markets on Kalshi, builds your edge, and trades automatically. You set the rules — it executes.",
    link: "https://oddsiq.app/",
    image: "/projects/oddsiq.png",
    github: "https://github.com/simsketch/oddsiq",
    tags: ["Next.js", "TypeScript", "AI", "Founder"],
    period: "2025 — Present",
    number: "18"
  },
  {
    title: "BoardIQ",
    description: "Board meeting platform for creating stunning board books, tracking reader engagement in real-time, managing votes on resolutions, and collaborating with your entire board.",
    link: "https://boardiq.app/",
    image: "/projects/boardiq.png",
    github: "https://github.com/simsketch/boardiq",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Founder"],
    period: "2025 — Present",
    number: "19"
  },
  {
    title: "4hoy",
    description: "Task management app that reveals Task Debt — a visual system showing the real cost of waiting. It treats aging tasks differently from fresh ones so you focus on what truly matters.",
    link: "https://4hoy.com/",
    image: "/projects/4hoy.png",
    github: "https://github.com/simsketch/4hoy",
    tags: ["React", "TypeScript", "Vite", "Founder"],
    period: "2025 — Present",
    number: "20"
  }
]

const proBono = [
  {
    title: "Worthy of Love",
    description: "Managed a charitable organization's entire donation and eCommerce web application, helping support their mission to serve communities in need.",
    link: "https://www.worthyoflovela.org/",
    tags: ["WordPress", "PHP", "PayPal", "DevOps"],
    period: "2014 — 2018",
    location: "Los Angeles"
  }
]

const mentorship = {
  title: "Coding Mentor",
  organization: "Yoyo Code",
  description: "Working with friends, family, acquaintances, and colleagues to help them along their path to becoming successful programmers. Partnered with the local library to provide free programming resources for the community using the freeCodeCamp.org curriculum.",
  period: "2018 — Present",
  location: "Syracuse"
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [showAll, setShowAll] = useState(false)

  const visibleProjects = showAll ? startups : startups.slice(0, INITIAL_VISIBLE)

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
      id="projects"
      ref={sectionRef}
      className="py-32 bg-[var(--color-cream)] relative"
    >
      <div className="container-editorial">
        {/* Section header */}
        <div className="grid lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-3">
            <div
              className={`${
                isVisible ? 'animate-reveal-up opacity-100' : 'opacity-0'
              }`}
            >
              <span className="number-indicator">04</span>
              <h2 className="heading-section mt-2">Projects</h2>
              <div className="w-12 h-1 bg-[var(--color-rust)] mt-4" />
            </div>
          </div>
          <div className="lg:col-span-9">
            <p
              className={`font-serif text-xl md:text-2xl leading-relaxed opacity-70 max-w-2xl ${
                isVisible ? 'animate-reveal-up delay-100 opacity-100' : 'opacity-0'
              }`}
            >
              Products I&apos;ve built — from AI-powered platforms to developer tools and native apps.
            </p>
          </div>
        </div>

        {/* Startups header */}
        <h3 className={`font-mono text-xs uppercase tracking-[0.3em] opacity-50 mb-8 ${
          isVisible ? 'animate-reveal-up delay-150 opacity-100' : 'opacity-0'
        }`}>
          Startups & Products
        </h3>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProjects.map((project, index) => (
            <div
              key={project.title}
              className={`group card-brutal flex flex-col overflow-hidden ${
                isVisible ? 'animate-reveal-up opacity-100' : 'opacity-0'
              }`}
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              {/* Screenshot */}
              {project.image && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative w-full aspect-[16/10] overflow-hidden border-b-2 border-[var(--color-ink)]"
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </a>
              )}

              <div className="p-8 flex flex-col flex-1">
                {/* Project number + GitHub */}
                <div className="flex items-center justify-between">
                  <span className="font-display text-5xl text-[var(--color-ink)]/10 group-hover:text-[var(--color-rust)]/20 transition-colors">
                    {project.number}
                  </span>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 opacity-30 hover:opacity-100 hover:text-[var(--color-rust)] transition-all"
                      aria-label={`${project.title} on GitHub`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                  )}
                </div>

                {/* Title */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-2xl tracking-wide mt-4 group-hover:text-[var(--color-rust)] transition-colors"
                >
                  {project.title}
                </a>

                {/* Period */}
                <div className="font-mono text-xs opacity-40 mt-1">
                  {project.period} {project.location && `• ${project.location}`}
                </div>

                {/* Description */}
                <p className="font-mono text-sm leading-relaxed opacity-60 mt-4 flex-1">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`font-mono text-[10px] uppercase tracking-wider ${
                        tag === 'Founder' || tag === 'Co-founder'
                          ? 'text-[var(--color-rust)]'
                          : 'opacity-40'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Arrow */}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center gap-2 font-mono text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  View Project
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Show All / Show Less toggle */}
        {startups.length > INITIAL_VISIBLE && (
          <div className={`mt-12 text-center ${
            isVisible ? 'animate-reveal-up delay-500 opacity-100' : 'opacity-0'
          }`}>
            <button
              onClick={() => setShowAll(!showAll)}
              className="font-mono text-sm uppercase tracking-widest link-underline cursor-pointer"
            >
              {showAll ? 'Show Less' : `Show All Projects (${startups.length})`}
            </button>
          </div>
        )}

        {/* Pro Bono Section */}
        <div className={`mt-20 pt-16 border-t-2 border-[var(--color-ink)]/10 ${
          isVisible ? 'animate-reveal-up delay-500 opacity-100' : 'opacity-0'
        }`}>
          <h3 className="font-mono text-xs uppercase tracking-[0.3em] opacity-50 mb-8">
            Pro Bono & Community
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Worthy of Love */}
            <a
              href={proBono[0].link}
              target="_blank"
              rel="noopener noreferrer"
              className="group card-brutal p-8"
            >
              <h4 className="font-display text-xl tracking-wide group-hover:text-[var(--color-rust)] transition-colors">
                {proBono[0].title}
              </h4>
              <div className="font-mono text-xs opacity-40 mt-1">
                {proBono[0].period} • {proBono[0].location}
              </div>
              <p className="font-mono text-sm leading-relaxed opacity-60 mt-4">
                {proBono[0].description}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {proBono[0].tags.map((tag) => (
                  <span key={tag} className="font-mono text-[10px] uppercase tracking-wider opacity-40">
                    {tag}
                  </span>
                ))}
              </div>
            </a>

            {/* Mentorship */}
            <div className="card-brutal p-8">
              <h4 className="font-display text-xl tracking-wide">
                {mentorship.title}
              </h4>
              <div className="font-serif italic opacity-70">{mentorship.organization}</div>
              <div className="font-mono text-xs opacity-40 mt-1">
                {mentorship.period} • {mentorship.location}
              </div>
              <p className="font-mono text-sm leading-relaxed opacity-60 mt-4">
                {mentorship.description}
              </p>
            </div>
          </div>
        </div>

        {/* GitHub CTA */}
        <div
          className={`mt-16 pt-12 border-t-2 border-[var(--color-ink)]/10 text-center ${
            isVisible ? 'animate-reveal-up delay-600 opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex flex-wrap justify-center gap-8">
            <a
              href="https://github.com/simsketch"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-mono text-sm uppercase tracking-widest link-underline"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub
            </a>
            <a
              href="https://codepen.io/simsketch"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-mono text-sm uppercase tracking-widest link-underline"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l10 6.5v7L12 22 2 15.5v-7L12 2zm0 2.311L4.077 9.5 12 14.689 19.923 9.5 12 4.311zM4 10.653v4.694l6 3.9v-4.694l-6-3.9zm16 0l-6 3.9v4.694l6-3.9v-4.694z" />
              </svg>
              CodePen
            </a>
            <a
              href="https://dribbble.com/simsketch"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-mono text-sm uppercase tracking-widest link-underline"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
              </svg>
              Dribbble
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
