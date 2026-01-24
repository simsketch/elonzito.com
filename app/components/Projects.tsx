'use client'

import { useEffect, useRef, useState } from 'react'

const startups = [
  {
    title: "TouchGuides",
    description: "Everything you need to host! TouchGuides allows hosts to create personalized recommendations for their guests, ensuring a unique and memorable stay.",
    link: "https://touchguides.com/",
    tags: ["React", "Node.js", "MongoDB", "Founder"],
    period: "Feb 2023 — Present",
    location: "Syracuse, NY",
    number: "01"
  },
  {
    title: "Greenlight Dining",
    description: "On-demand dining mobile app and web portal enabling real-time restaurant discovery and reservations. Full-stack application with real-time updates.",
    link: "https://apkpure.com/greenlight-dining/com.a2zCreative.greenlight",
    tags: ["React Native", "ReactJS", "Node", "MongoDB", "Co-founder"],
    period: "2018 — 2019",
    location: "Lake Worth, FL",
    number: "02"
  },
  {
    title: "Cutetitos Match Game",
    description: "Mobile game that reached the Top 100 in the App Store Family Category. Engaging gameplay mechanics with delightful animations and sound design.",
    link: "https://apkpure.com/cutetitos-match-game/com.basicfun.cutetitos/download/1.0.0",
    tags: ["iOS", "Game Development", "Swift"],
    period: "2018",
    number: "03"
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
              Startups I&apos;ve founded, side projects, and community work.
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
          {startups.map((project, index) => (
            <a
              key={project.title}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`group card-brutal p-8 flex flex-col ${
                isVisible ? 'animate-reveal-up opacity-100' : 'opacity-0'
              }`}
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              {/* Project number */}
              <span className="font-display text-5xl text-[var(--color-ink)]/10 group-hover:text-[var(--color-rust)]/20 transition-colors">
                {project.number}
              </span>

              {/* Title */}
              <h3 className="font-display text-2xl tracking-wide mt-4 group-hover:text-[var(--color-rust)] transition-colors">
                {project.title}
              </h3>

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
              <div className="mt-6 flex items-center gap-2 font-mono text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                View Project
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </a>
          ))}
        </div>

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
