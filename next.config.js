/** @type {import('next').NextConfig} */
// headers() y redirects() se ignora con output:'export' (Next no los aplica).
// Ambos viven en vercel.json, donde sí los procesa la plataforma de despliegue.
const nextConfig = {
  output: 'export',
  images: {
    remotePatterns: [],
    unoptimized: true,
  },
}

module.exports = nextConfig
