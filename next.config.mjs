/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "brettbaileymenscoaching.s3.ca-central-1.amazonaws.com"
            }
        ]
    },
    env: {
        MC_ID: process.env.MC_ID,
        GA_ID: process.env.GA_ID,
        HOSTNAME: process.env.HOSTNAME,
        S3_BUCKET: process.env.S3_BUCKET,
        YT_VID_URL: process.env.YT_VID_URL,
        HOSTING_URL: process.env.HOSTING_URL,
        NOTION_TEMPLATE_URL: process.env.NOTION_TEMPLATE_URL,
        STRIPE_URL_ENDPOINT: process.env.STRIPE_URL_ENDPOINT
    }
};

export default nextConfig;
