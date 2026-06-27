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

    import('@/mocks/browser')
      .then(({worker}) =>
        worker.start({
          onUnhandledRequest(request, print) {
            // Next.js 개발 도구, GTM 등 외부 요청은 모킹 대상이 아니므로 통과시키고,
            // 우리 앱의 API 요청만 누락된 핸들러를 에러로 드러낸다.
            if (new URL(request.url).pathname.startsWith('/api/')) {
              print.error();
            }
          },
        })
      )
      .catch((error) => {
        console.error('Failed to start MSW worker:', error);
      })
      .finally(() => setIsReady(true));
  }, []);

  if (!isReady) return null;
  return children;
};
