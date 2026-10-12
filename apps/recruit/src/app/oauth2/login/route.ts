import {NextRequest, NextResponse} from 'next/server';
import {
  AUTH_COOKIE,
  AUTH_COOKIE_OPTIONS,
  OAUTH_STATE_MAX_AGE_SECONDS,
} from '@/lib/auth/constants';
import {getSafeReturnTo, serializeOAuthState} from '@/lib/auth/oauth';
import {isTrustedOrigin} from '@/lib/auth/origin';
import {ROUTES} from '@/constants/routes';

const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';

/**
 * 구글 로그인 시작
 * CSRF 방지용 state와 로그인 후 돌아갈 경로를 HttpOnly 쿠키에 저장하고 구글 인증 페이지로 보낸다.
 */
export const GET = (request: NextRequest) => {
  const {origin, searchParams} = request.nextUrl;

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  if (!clientId || !isTrustedOrigin(origin)) {
    console.error('[OAuth] login is not configured for origin', origin);
    return new NextResponse('로그인 설정이 올바르지 않습니다.', {status: 400});
  }

  const state = crypto.randomUUID();
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: origin + ROUTES.OAUTH2_CALLBACK,
    response_type: 'code',
    scope: 'openid email profile',
    state,
    prompt: 'consent',
  });

  const response = NextResponse.redirect(`${GOOGLE_AUTH_URL}?${params}`);
  response.cookies.set(
    AUTH_COOKIE.OAUTH_STATE,
    serializeOAuthState({
      state,
      returnTo: getSafeReturnTo(searchParams.get('returnTo')),
    }),
    {...AUTH_COOKIE_OPTIONS, maxAge: OAUTH_STATE_MAX_AGE_SECONDS}
  );
  return response;
};
