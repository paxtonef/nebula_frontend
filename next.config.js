/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['res.cloudinary.com'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_AUTH0_DOMAIN: process.env.AUTH0_ISSUER_BASE_URL,
    NEXT_PUBLIC_AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
  },
};

module.exports = nextConfig;
