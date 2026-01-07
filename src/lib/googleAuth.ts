export const startGoogleLogin = () => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const redirectUriEndpoint =
    process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI_ENDPOINT;

  if (!clientId || !redirectUriEndpoint) {
    console.error('NEXT_PUBLIC_GOOGLE_REDIRECT_URI_ENDPOINT is not configured');
    throw new Error(
      '구글 로그인 설정이 올바르지 않습니다. 관리자에게 문의해주세요.'
    );
  }

  const redirectUri = window.location.origin + redirectUriEndpoint;

  const state = crypto.randomUUID();
  sessionStorage.setItem('oauth_state', state);

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
