import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */


  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["localhost", "prized-festival-c69e982a8e.strapiapp.com"],
     remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'prized-festival-c69e982a8e.strapiapp.com',
        pathname: '/uploads/**',
      },
    ],
  },
};
export default nextConfig;


