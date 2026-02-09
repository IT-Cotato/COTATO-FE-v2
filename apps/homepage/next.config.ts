import type {NextConfig} from 'next';
import svgrConfig from '@repo/svgr-config';

const nextConfig: NextConfig = {
  webpack: svgrConfig.webpack,
  turbopack: svgrConfig.turbopack,

  /** 추후에 삭제될 (picsum) 더미이미지를 위해 설정함 */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
