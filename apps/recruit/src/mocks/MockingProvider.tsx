'use client';

import {useEffect, useState} from 'react';

const isMockingEnabled =
  process.env.NODE_ENV === 'development' &&
  process.env.NEXT_PUBLIC_API_MOCKING === 'true';

/** development 환경에서만 MSW를 초기화하고, 워커가 준비될 때까지 children 렌더링을 지연한다. */
export const MockingProvider = ({children}: {children: React.ReactNode}) => {
  const [isReady, setIsReady] = useState(!isMockingEnabled);

  useEffect(() => {
    if (!isMockingEnabled) return;

    import('@/mocks/browser').then(({worker}) => {
      worker.start({onUnhandledRequest: 'bypass'}).then(() => setIsReady(true));
    });
  }, []);

  if (!isReady) return null;
  return children;
};
