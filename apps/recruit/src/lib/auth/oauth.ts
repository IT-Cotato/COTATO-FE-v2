import {ROUTES} from '@/constants/routes';

interface OAuthState {
  state: string;
  returnTo: string;
}

/**
 * 로그인 후 돌아갈 경로 검증 (open redirect 방지)
 * 같은 origin의 절대 경로만 허용하고, OAuth 경로는 홈으로 대체한다.
 */
export const getSafeReturnTo = (returnTo: string | null) => {
  if (
    !returnTo?.startsWith('/') ||
    returnTo.startsWith('//') ||
    returnTo.startsWith('/\\') ||
    returnTo.startsWith('/oauth2/')
  ) {
    return ROUTES.HOME;
  }
  return returnTo;
};

export const serializeOAuthState = (value: OAuthState) => JSON.stringify(value);

export const parseOAuthState = (raw: string | undefined): OAuthState | null => {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<OAuthState>;
    if (typeof parsed.state !== 'string') return null;
    return {
      state: parsed.state,
      returnTo: getSafeReturnTo(parsed.returnTo ?? null),
    };
  } catch {
    return null;
  }
};
