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
      {
        //S3 호스트
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_S3_HOSTNAME || '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
