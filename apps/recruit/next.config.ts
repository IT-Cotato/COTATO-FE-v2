import type {NextConfig} from 'next';
import svgrConfig from '@repo/svgr-config';
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  webpack: svgrConfig.webpack,
  turbopack: svgrConfig.turbopack,
};

export default withBundleAnalyzer(nextConfig);
