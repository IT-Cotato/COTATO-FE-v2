'use client';

import {useEffect, useRef} from 'react';
import {useSearchParams} from 'next/navigation';
import {useOAuthLogin} from '@/hooks/mutations/useAuth';

export const OAuthCallbackHandler = () => {
  const params = useSearchParams();
  const {mutate} = useOAuthLogin();

  const hasRequested = useRef(false);

  const receivedState = params.get('state');
  const savedState = sessionStorage.getItem('oauth_state');
  if (receivedState !== savedState) {
    // CSRF 공격 가능성 - 요청 거부
    throw new Error('Invalid state parameter');
  }

  useEffect(() => {
    if (hasRequested.current) return;
    hasRequested.current = true;

    const error = params.get('error');
    if (error) {
      console.error('[OAuth error]', error, params.get('error_description'));
      alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
      window.location.href = '/';
      return;
    }

    const code = params.get('code');
    if (!code) {
      console.error('Authorization code not found');
      alert('인증 코드를 찾을 수 없습니다.');
      window.location.href = '/';
      return;
    }

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
