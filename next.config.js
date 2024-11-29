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
      turboMode: true,  // Enable Turbopack for development builds (experimental)
    },
  };
  