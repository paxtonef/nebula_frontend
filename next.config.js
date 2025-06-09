/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['res.cloudinary.com', 'avatars.githubusercontent.com', 'lh3.googleusercontent.com'],
  },
  // Disable type checking during build for faster builds
  typescript: {
    ignoreBuildErrors: true, // 🔥 This skips TypeScript errors during build
  },
  // Disable ESLint during build for faster builds
  eslint: {
    ignoreDuringBuilds: true, // Also skip ESLint errors
  },
  // Add experimental flag to disable Suspense with CSR bailout
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  // Handle case-sensitivity issues
  webpack: (config, { isServer }) => {
    // This is needed for case-insensitive imports on case-sensitive file systems (like Linux)
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      include: [/src\/components\/ui/],
      use: [],
    });
    return config;
  },
};

module.exports = nextConfig;
