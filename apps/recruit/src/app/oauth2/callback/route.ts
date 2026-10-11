import {NextRequest, NextResponse} from 'next/server';
import {
  AUTH_COOKIE,
  AUTH_COOKIE_OPTIONS,
  LOGIN_ERROR,
  LOGIN_ERROR_PARAM,
  LoginError,
} from '@/lib/auth/constants';
import {exchangeGoogleCode} from '@/lib/auth/backend';
import {parseOAuthState} from '@/lib/auth/oauth';
import {isTrustedOrigin} from '@/lib/auth/origin';
import {setSessionCookies} from '@/lib/auth/session';
import {ROUTES} from '@/constants/routes';

/**
 * 구글 OAuth 콜백
 * 서버에서 인가 코드를 토큰으로 교환하고 HttpOnly 쿠키로 저장한 뒤 원래 페이지로 리다이렉트한다.
 * 토큰이 브라우저 JS를 거치지 않으므로, 클라이언트가 토큰을 저장하는 동안 AuthProvider가
 * 초기화되며 생기던 race condition이 구조적으로 발생하지 않는다.
 */
export const GET = async (request: NextRequest) => {
  const {origin, searchParams} = request.nextUrl;

  const savedState = parseOAuthState(
    request.cookies.get(AUTH_COOKIE.OAUTH_STATE)?.value
  );

  const redirectTo = (path: string, error?: LoginError) => {
    const url = new URL(path, origin);
    if (error) url.searchParams.set(LOGIN_ERROR_PARAM, error);

    const response = NextResponse.redirect(url);
    response.cookies.set(AUTH_COOKIE.OAUTH_STATE, '', {
      ...AUTH_COOKIE_OPTIONS,
      maxAge: 0,
    });
    return response;
  };

  if (!savedState || savedState.state !== searchParams.get('state')) {
    console.error('[CSRF detection] State parameter mismatch');
    return redirectTo(ROUTES.HOME, LOGIN_ERROR.STATE);
  }

  const error = searchParams.get('error');
  if (error) {
    console.error(
      '[OAuth error]',
      error,
      searchParams.get('error_description')
    );
    return redirectTo(ROUTES.HOME, LOGIN_ERROR.OAUTH);
  }

  const code = searchParams.get('code');
  if (!code) {
    console.error('Authorization code not found');
    return redirectTo(ROUTES.HOME, LOGIN_ERROR.CODE);
  }

  if (!isTrustedOrigin(origin)) {
    console.error('[OAuth] untrusted redirect origin', origin);
    return redirectTo(ROUTES.HOME, LOGIN_ERROR.LOGIN);
  }

  const result = await exchangeGoogleCode(
    code,
    origin + ROUTES.OAUTH2_CALLBACK
  );
  if (!result.ok) {
    console.error('[Login failed]', result.reason);
    return redirectTo(ROUTES.HOME, LOGIN_ERROR.LOGIN);
  }

  const response = redirectTo(savedState.returnTo);
  setSessionCookies(response.cookies, result.tokens);
  return response;
};
