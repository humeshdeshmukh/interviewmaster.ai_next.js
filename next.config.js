/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,  // Enable strict mode for better development experience

  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],  // Ensure Next.js recognizes TypeScript and JSX files

  webpack(config) {
    // You can extend the webpack configuration here if necessary
    return config;
  },

  // Setup redirects, for example:
  async redirects() {
    return [
      {
        source: '/old-route',   // Old URL
        destination: '/new-route',  // New URL
        permanent: true,  // Permanent redirect
      },
    ];
  },

  // Experimental settings for Turbopack (if you want to try it)
  experimental: {
    // turboMode was deprecated, no longer needed, remove it
    // Remove turboMode option completely
  },

  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,  // This ensures ESLint warnings won't block the build
  },

  // Define environment variables (for both build and runtime)
  env: {
    NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL,
    CONVEX_DEPLOYMENT: process.env.CONVEX_DEPLOYMENT,
    STRIPE_URL_ENDPOINT: process.env.STRIPE_URL_ENDPOINT,
    GA_ID: process.env.GA_ID,
    MC_ID: process.env.MC_ID,
  },
};
