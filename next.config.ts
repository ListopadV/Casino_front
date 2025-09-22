import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */


  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["localhost"],
     remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
    ],
  },
};
export default nextConfig;


