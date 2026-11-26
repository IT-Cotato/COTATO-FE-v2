import type {NextConfig} from 'next';
import svgrConfig from '@repo/svgr-config';
import {withSentryConfig} from '@sentry/nextjs';

const nextConfig: NextConfig = {
  webpack: svgrConfig.webpack,
  turbopack: svgrConfig.turbopack,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/*/homepage/**',
      },
      ...(process.env.NODE_ENV !== 'production' &&
      process.env.NEXT_PUBLIC_HOMEPAGE_IMAGE_PREVIEW === 'true'
        ? [
            {
              protocol: 'http' as const,
              hostname: '127.0.0.1',
              port: '18110',
              pathname: '/v1/api/homepage-images/local-file',
            },
          ]
        : []),
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
        // S3 호스트
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

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: !process.env.CI,
  widenClientFileUpload: true,
});
