import type { MetadataRoute } from 'next'

import { SITE_URL } from './siteUrl'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Nothing here renders for a crawler and each hit costs an LLM call.
      disallow: '/api/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
