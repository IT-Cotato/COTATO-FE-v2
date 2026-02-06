'use client';

import {ReactNode, Suspense} from 'react';

export const SuspenseWrapper = ({
  children,
  fallback = 'Loading...',
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) => {
  return <Suspense fallback={fallback}>{children}</Suspense>;
};
