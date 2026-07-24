/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    remotePatterns: [],
    unoptimized: true,
  },
}

module.exports = nextConfig
