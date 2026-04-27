/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
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
