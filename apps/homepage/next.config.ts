import type {NextConfig} from 'next';
import svgrConfig from '@repo/svgr-config';

const nextConfig: NextConfig = {
  webpack: svgrConfig.webpack,
  turbopack: svgrConfig.turbopack,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
