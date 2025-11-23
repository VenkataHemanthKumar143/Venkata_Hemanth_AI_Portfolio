/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false, // Remove "X-Powered-By: Next.js" header
  devIndicators: false, // Completely disable all Next.js dev tools indicators (N symbol button)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com',
      },
    ],
  },
  eslint: {
    // Does NOT block the build on eslint errors
    ignoreDuringBuilds: true,
  },
  // Security: Disable source maps in production
  productionBrowserSourceMaps: false,
  // Compress responses
  compress: true,
};

module.exports = nextConfig;
