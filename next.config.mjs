/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['localhost', 'your-backend-domain.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/api/:path*', // Your backend URL
      },
      {
        source: '/sitemap.xml',
        destination: 'http://localhost:8080/api/sitemap.xml',
      }
    ]
  }
}

export default nextConfig;
