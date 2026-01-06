'use client';

import {useEffect, useRef} from 'react';
import {useSearchParams} from 'next/navigation';

export default function OAuthCallbackPage() {
  const params = useSearchParams();

  const hasRequested = useRef(false);

  useEffect(() => {
    if (hasRequested.current) return;

    const code = params.get('code');
    if (!code) {
      console.error('Authorization code not found');
      return;
    }

    hasRequested.current = true;

    const redirectUri =
      window.location.origin +
      process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI_ENDPOINT!;

    console.log('code >>', code);
    console.log('redirectUri >>', redirectUri);
  }, [, params]);

  return <div>Google 로그인 처리 중...</div>;
}
