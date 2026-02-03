import type {NextConfig} from 'next';
import svgrConfig from '@repo/svgr-config';

const nextConfig: NextConfig = {
  webpack: svgrConfig.webpack,
  turbopack: svgrConfig.turbopack,
};

export default nextConfig;
