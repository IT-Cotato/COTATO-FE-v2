import {ROUTES} from '@/constants/routes';

export const OAUTH_STATE_KEY = 'oauth_state';

export const startGoogleLogin = () => {
  if (typeof window === 'undefined') {
    console.error('startGoogleLogin can only be called in browser environment');
    return;
  }

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  if (!clientId) {
    console.error('NEXT_PUBLIC_GOOGLE_CLIENT_ID is not configured');
    throw new Error(
      '구글 로그인 설정이 올바르지 않습니다. 관리자에게 문의해주세요.'
    );
  }

  const redirectUri = window.location.origin + ROUTES.OAUTH2_CALLBACK;

  const state = crypto.randomUUID();
  sessionStorage.setItem(OAUTH_STATE_KEY, state);

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    state: state,
    prompt: 'consent',
  });

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

  window.open(googleAuthUrl, '_self');
};
