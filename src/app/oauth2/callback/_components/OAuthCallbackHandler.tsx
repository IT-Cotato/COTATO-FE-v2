'use client';

import {useEffect, useRef} from 'react';
import {useSearchParams} from 'next/navigation';
import {useOAuthLogin} from '@/hooks/mutations/useAuth';

export const OAuthCallbackHandler = () => {
  const params = useSearchParams();
  const {mutate} = useOAuthLogin();

  const hasRequested = useRef(false);

  useEffect(() => {
    if (hasRequested.current) return;

    const code = params.get('code');
    if (!code) {
      console.error('Authorization code not found');
      return;
    }

    hasRequested.current = true;

    const redirectEndpoint =
      process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI_ENDPOINT;
    if (!redirectEndpoint) {
      console.error(
        'NEXT_PUBLIC_GOOGLE_REDIRECT_URI_ENDPOINT is not configured'
      );
      alert('시스템 설정 오류입니다. 관리자에게 문의하세요.');
      window.location.href = '/';
      return;
    }

    const redirectUri = window.location.origin + redirectEndpoint;

    mutate({code, redirectUri});
  }, [mutate, params]);

  return null;
};
