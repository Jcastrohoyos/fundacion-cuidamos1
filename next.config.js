/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [],
    unoptimized: true,
  },
  output: 'export',
}

module.exports = nextConfig
