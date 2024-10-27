/** @type {import('next').NextConfig} */
const nextConfig = {
    // Add performance optimizations
    swcMinify: true,
    compiler: {
        // Disable React.memo usage check for better compilation speed
        reactRemoveProperties: process.env.NODE_ENV === 'production',
        removeConsole: process.env.NODE_ENV === 'production',
    },
    // Cache build outputs
    experimental: {
        turbotrace: {
            logLevel: 'error'
        }
    },
    env: {
        MC_ID: process.env.MC_ID,
        GA_ID: process.env.GA_ID,
        HOSTING_URL: process.env.HOSTING_URL,
        STRIPE_URL_ENDPOINT: process.env.STRIPE_URL_ENDPOINT
    }
};

export default nextConfig;
