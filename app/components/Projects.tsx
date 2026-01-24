'use client'

import { useEffect, useRef, useState } from 'react'

const projects = [
  {
    title: "TouchGuides",
    description: "A platform allowing hosts to create personalized recommendations for their guests, ensuring a unique and memorable stay. Built with modern web technologies for seamless user experience.",
    link: "https://touchguides.com/",
    tags: ["React", "Node.js", "MongoDB"],
    number: "01"
  },
  {
    title: "Greenlight Dining",
    description: "On-demand dining mobile app and web portal enabling real-time restaurant discovery and reservations. Full-stack application with real-time updates.",
    link: "https://github.com/simsketch/greenlight",
    tags: ["React Native", "ReactJS", "Node", "MongoDB"],
    number: "02"
  },
  {
    title: "Cutetitos Match Game",
    description: "Mobile game that reached the Top 100 in the App Store Family Category. Engaging gameplay mechanics with delightful animations and sound design.",
    link: "https://appadvice.com/app/cutetitos-stickers/1436535267",
    tags: ["iOS", "Game Development", "Swift"],
    number: "03"
  }
]

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
              Selected work from personal projects and side ventures.
            </p>
          </div>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
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

              {/* Description */}
              <p className="font-mono text-sm leading-relaxed opacity-60 mt-4 flex-1">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] uppercase tracking-wider opacity-40"
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

        {/* GitHub CTA */}
        <div
          className={`mt-20 pt-12 border-t-2 border-[var(--color-ink)]/10 text-center ${
            isVisible ? 'animate-reveal-up delay-600 opacity-100' : 'opacity-0'
          }`}
        >
          <a
            href="https://github.com/simsketch"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 font-mono text-sm uppercase tracking-widest link-underline"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            More on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
