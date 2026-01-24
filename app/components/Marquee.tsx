'use client'

export default function Marquee() {
  const items = [
    'Agentic AI & LLMs',
    'Full-Stack Development',
    'React & Next.js',
    'Python & FastAPI',
    'AWS & Terraform',
    'Team Leadership',
    'RAG Systems',
    'DevOps & CI/CD',
  ]

  return (
    <div className="py-6 bg-[var(--color-ink)] text-[var(--color-bone)] overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...items, ...items].map((item, index) => (
          <span
            key={index}
            className="mx-8 font-display text-lg tracking-wider uppercase flex items-center gap-8"
          >
            {item}
            <span className="text-[var(--color-rust)]">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
