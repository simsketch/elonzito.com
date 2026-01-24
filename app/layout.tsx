import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Elon Zito — Solutions Architect & Senior Product Engineer',
  description: 'Generative AI certified engineer specializing in LLMs, Agentic Frameworks, and full-stack development. Building intelligent systems that drive technological advancement.',
  keywords: ['Solutions Architect', 'Product Engineer', 'Generative AI', 'LLMs', 'RAG', 'Full Stack', 'React', 'Node.js', 'Python', 'AWS'],
  authors: [{ name: 'Elon Zito' }],
  openGraph: {
    title: 'Elon Zito — Solutions Architect & Senior Product Engineer',
    description: 'Generative AI certified engineer specializing in LLMs, Agentic Frameworks, and full-stack development.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <div className="noise-overlay" aria-hidden="true" />
      </body>
    </html>
  )
}
