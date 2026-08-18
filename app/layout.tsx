import './globals.css'
import Script from 'next/script'
import type { Metadata } from 'next'

import ChatFab from './components/ChatFab'
import { SITE_URL } from './siteUrl'

/**
 * Person schema. Search engines use this to attribute the site to a named
 * person rather than inferring it from prose — it drives the knowledge panel
 * and rich results this site's audience (recruiters) arrive through.
 *
 * Every value here must stay true. A schema that disagrees with the page is
 * worse than none at all.
 */
const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Elon Zito',
  url: SITE_URL,
  email: 'mailto:simsketch@gmail.com',
  image: `${SITE_URL}/og-image.png`,
  jobTitle: 'Lead ML Engineer & Solutions Architect',
  description:
    'Machine learning and platform engineering leader who takes generative-AI systems from architecture to production in regulated enterprise environments.',
  knowsAbout: [
    'Machine Learning',
    'Large Language Models',
    'Retrieval-Augmented Generation',
    'Agentic AI',
    'Full-Stack Engineering',
    'Cloud Architecture',
    'UX/UI Design',
  ],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Palm Beach State College',
  },
  sameAs: [
    'https://www.linkedin.com/in/simsketch',
    'https://github.com/simsketch',
    'https://medium.com/@simsketch',
    'https://x.com/simsketch',
    'https://bsky.app/profile/elonzito.com',
    'https://stackoverflow.com/users/1579789/simsketch',
    'https://dribbble.com/simsketch',
    'https://codepen.io/simsketch',
    'https://www.youtube.com/@elonzito',
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: '/' },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
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
        <ChatFab />
        <div className="noise-overlay" aria-hidden="true" />
      </body>
    </html>
  )
}
