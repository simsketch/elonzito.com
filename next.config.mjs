/** @type {import('next').NextConfig} */

/**
 * Security headers.
 *
 * No `script-src` directive: this site loads Google Analytics and Next's own
 * inline bootstrap, so any workable script policy would need `unsafe-inline`,
 * which buys nothing against XSS. The directives below are the ones that hold
 * their value without a nonce pipeline — they shut down clickjacking, base-tag
 * hijacking, form exfiltration, and plugin embedding.
 */
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      'upgrade-insecure-requests',
    ].join('; '),
  },
]

const nextConfig = {
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
  async redirects() {
    return [
      {
        source: '/meet',
        destination: 'https://meet.google.com/zru-afot-rha',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
