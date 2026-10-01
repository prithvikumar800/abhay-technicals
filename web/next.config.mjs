/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    domains: ['abhaytechnicals.com'],
    unoptimized: true,
  },
};

export default nextConfig;
