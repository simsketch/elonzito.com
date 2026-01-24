import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Elon Zito — Principal Software Engineer',
  description: 'Principal Software Engineer specializing in Generative AI, full-stack development, and building products that matter.',
  keywords: ['Software Engineer', 'Generative AI', 'Full Stack', 'React', 'Node.js', 'Python'],
  authors: [{ name: 'Elon Zito' }],
  openGraph: {
    title: 'Elon Zito — Principal Software Engineer',
    description: 'Principal Software Engineer specializing in Generative AI and full-stack development.',
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
