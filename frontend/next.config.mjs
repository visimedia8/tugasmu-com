/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async rewrites() {
    return {
      fallback: [
        {
          source: '/api/:path*',
          destination: process.env.NODE_ENV === 'development' 
            ? 'http://127.0.0.1:8787/api/:path*' 
            : 'https://tugasmu-api.johananggo.workers.dev/api/:path*',
        },
      ]
    };
  },
};

export default nextConfig;
