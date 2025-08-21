/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['cdnjs.cloudflare.com'],
  },
}

module.exports = nextConfig