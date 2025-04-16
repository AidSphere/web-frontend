
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
  }
  /* config options here */
};

module.exports = nextConfig;