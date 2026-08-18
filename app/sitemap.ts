import type { MetadataRoute } from 'next'

import { SITE_URL } from './siteUrl'

/**
 * The site is one long page plus /chat, so the sitemap is deliberately small —
 * listing #about, #experience and friends would just be the same URL five times.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/chat`, changeFrequency: 'monthly', priority: 0.8 },
  ]
}
