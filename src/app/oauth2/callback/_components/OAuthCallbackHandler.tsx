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

    const redirectUri =
      window.location.origin +
      process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI_ENDPOINT!;

    mutate({code, redirectUri});
  }, [mutate, params]);

  return null;
};
