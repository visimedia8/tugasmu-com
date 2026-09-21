import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'development' 
          ? 'http://localhost:8787/api/:path*' 
          : 'https://tugasmu-api.johananggo.workers.dev/api/:path*',
      },
    ]
  },
};

export default nextConfig;
