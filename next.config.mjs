/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api-gumroad.schoenberger.dev',
      },
      {
        protocol: 'http',
        hostname: '[::1]',
      },
      {
        protocol: 'https',
        hostname: 'assets.gumroad.com',
      },
    ],
  },
};

export default nextConfig;
