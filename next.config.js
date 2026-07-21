/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [],
    unoptimized: true,
  },
}

module.exports = nextConfig
