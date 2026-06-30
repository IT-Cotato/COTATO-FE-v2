import type {NextConfig} from 'next';
import svgrConfig from '@repo/svgr-config';
import {withSentryConfig} from '@sentry/nextjs';

const nextConfig: NextConfig = {
  webpack: svgrConfig.webpack,
  turbopack: svgrConfig.turbopack,
};

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  silent: !process.env.CI,
  widenClientFileUpload: true,
});
