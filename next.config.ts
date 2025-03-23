import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
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

export default nextConfig;
