/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Empty turbopack config to silence Next.js 16 warning
  turbopack: {},
  webpack: (config) => {
    // Required for Convex to work properly in Next.js
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
};

module.exports = nextConfig;
