/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.figma.com'],
  },
  // Configure for different environments
  env: {
    NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:5173',
  },
  // Proxy API requests to backend (similar to Vite proxy)
  async rewrites() {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'
    return [
      {
        source: '/api/v1/auth/:path*',
        destination: `${apiBaseUrl}/api/v1/auth/:path*`,
      },
      {
        source: '/api/v1/email-verification/:path*',
        destination: `${apiBaseUrl}/api/v1/email-verification/:path*`,
      },
      {
        source: '/api/v1/organizations/:path*',
        destination: `${apiBaseUrl}/api/v1/organizations/:path*`,
      },
    ]
  },
}

module.exports = nextConfig



