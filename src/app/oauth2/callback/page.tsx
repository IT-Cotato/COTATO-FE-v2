'use client';

import {OAuthCallbackHandler} from '@/app/oauth2/callback/_components/OAuthCallbackHandler';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';

export default function OAuthCallbackPage() {
  return (
    <SuspenseWrapper>
      <OAuthCallbackHandler />
    </SuspenseWrapper>
  );
}
