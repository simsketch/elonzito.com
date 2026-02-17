import './globals.css'
import Script from 'next/script'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Elon Zito — Solutions Architect & Senior Product Engineer',
  description: 'Generative AI certified engineer specializing in LLMs, Agentic Frameworks, and full-stack development. Building intelligent systems that drive technological advancement.',
  keywords: ['Solutions Architect', 'Product Engineer', 'Generative AI', 'LLMs', 'RAG', 'Full Stack', 'React', 'Node.js', 'Python', 'AWS'],
  authors: [{ name: 'Elon Zito' }],
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-dark-32x32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'Elon Zito — Solutions Architect & Senior Product Engineer',
    description: 'Generative AI certified engineer specializing in LLMs, Agentic Frameworks, and full-stack development.',
    type: 'website',
    url: 'https://www.elonzito.com',
    images: [
      {
        url: 'https://www.elonzito.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Elon Zito — Solutions Architect & Senior Product Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Elon Zito — Solutions Architect & Senior Product Engineer',
    description: 'Generative AI certified engineer specializing in LLMs, Agentic Frameworks, and full-stack development.',
    images: ['https://www.elonzito.com/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-J3Q5ZW2PGP" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-J3Q5ZW2PGP', { site: location.hostname });
        `}</Script>
      </head>
      <body>
        {children}
        <div className="noise-overlay" aria-hidden="true" />
      </body>
    </html>
  )
}
