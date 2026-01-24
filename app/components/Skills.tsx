'use client'

import { useEffect, useRef, useState } from 'react'

const skillCategories = [
  {
    category: "Expert",
    color: "var(--color-rust)",
    skills: [
      "JavaScript", "TypeScript", "Node.js", "React", "Vue", "Svelte", "Next.js", "MongoDB",
      "React Native", "Expo", "iOS",
      ".NET", "C#", "MSSQL", ".NET Core",
      "PHP", "MySQL", "Laravel",
      "AWS", "Serverless", "Docker", "Kubernetes", "Terraform",
      "CRM", "Salesforce", "Zoho", "FreshSales",
      "Adobe Creative Suite",
      "WordPress", "WooCommerce",
      "DevOps", "Heroku", "Digital Ocean", "Vercel", "Linux", "Supabase", "VPC"
    ]
  },
  {
    category: "Experienced",
    color: "var(--color-sage)",
    skills: [
      "Python", "Generative AI", "LLMs", "RAG", "Vector DBs",
      "AngularJS", "Angular", "GraphQL", "Ionic Framework"
    ]
  },
  {
    category: "Skillful",
    color: "var(--color-slate)",
    skills: [
      "Python", "Django", "Flask", "FastAPI", "Elixir", "PyTorch"
    ]
  },
  {
    category: "Beginner",
    color: "var(--color-charcoal)",
    skills: [
      "Kotlin", "Flutter", "Dart", "Android"
    ]
  }
]

export default function Skills() {
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
      id="skills"
      ref={sectionRef}
      className="py-32 relative"
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
              <span className="number-indicator">03</span>
              <h2 className="heading-section mt-2">Skills</h2>
              <div className="w-12 h-1 bg-[var(--color-rust)] mt-4" />
            </div>
          </div>
          <div className="lg:col-span-9">
            <p
              className={`font-serif text-xl md:text-2xl leading-relaxed opacity-70 max-w-2xl ${
                isVisible ? 'animate-reveal-up delay-100 opacity-100' : 'opacity-0'
              }`}
            >
              Technologies I&apos;ve worked with across the full stack, from databases to deployment.
            </p>
          </div>
        </div>

        {/* Skills grid */}
        <div className="space-y-16">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.category}
              className={`${
                isVisible ? 'animate-reveal-up opacity-100' : 'opacity-0'
              }`}
              style={{ animationDelay: `${(categoryIndex + 2) * 100}ms` }}
            >
              {/* Category header */}
              <div className="flex items-center gap-4 mb-6">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: category.color }}
                />
                <h3 className="font-display text-xl tracking-wider">
                  {category.category}
                </h3>
                <div className="flex-1 h-px bg-[var(--color-ink)]/10" />
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skill}
                    className="tag hover:border-[var(--color-rust)] cursor-default"
                    style={{
                      animationDelay: `${(categoryIndex * 100) + (skillIndex * 20)}ms`
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Featured technologies */}
        <div
          className={`mt-24 pt-16 border-t-2 border-[var(--color-ink)]/10 ${
            isVisible ? 'animate-reveal-up delay-500 opacity-100' : 'opacity-0'
          }`}
        >
          <h3 className="font-mono text-xs uppercase tracking-[0.3em] opacity-50 mb-8">
            Currently Focused On
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: 'Agentic AI', desc: 'LangChain, CrewAI, Mastra.js' },
              { name: 'RAG Systems', desc: 'AWS Bedrock, Vector DBs' },
              { name: 'DevOps', desc: 'Terraform, ECS, CI/CD' },
              { name: 'Full Stack', desc: 'Next.js, FastAPI, Node.js' },
            ].map((tech, index) => (
              <div key={tech.name} className="group">
                <div className="font-display text-2xl md:text-3xl group-hover:text-[var(--color-rust)] transition-colors">
                  {tech.name}
                </div>
                <div className="font-mono text-xs opacity-50 mt-2">
                  {tech.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-ink)]/10 to-transparent" />
    </section>
  )
}
