/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    domains: ['abhaytechnicals.com', 'darkgreen-goat-677875.hostingersite.com'],
    unoptimized: true,
  },
  async rewrites() {
    const apiBase = process.env.INTERNAL_API_URL || 'http://127.0.0.1:5000';
    return [
      {
        source: '/api/v1/:path*',
        destination: `${apiBase}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
