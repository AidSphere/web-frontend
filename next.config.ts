
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   reactStrictMode: true,
  swcMinify: true,
  images:{
    domains: ['images.unsplash.com'],
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'flowbite.com',
        port: '',
        pathname: '**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: 'api.qrserver.com'
      }
    ]
  },
  serverActions: {
    bodySizeLimit: '10mb', // Increase the limit (e.g., to 10MB)
  },
  /* config options here */
};

module.exports = nextConfig;