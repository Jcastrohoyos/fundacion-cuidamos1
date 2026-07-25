/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    remotePatterns: [],
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: '/colombia',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
