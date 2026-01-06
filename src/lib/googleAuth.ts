export const startGoogleLogin = () => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
  const redirectUri =
    window.location.origin +
    process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI_ENDPOINT!;

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    state: 'state_parameter_passthrough_value',
    prompt: 'consent',
  });

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

  window.open(googleAuthUrl, '_self');
};
