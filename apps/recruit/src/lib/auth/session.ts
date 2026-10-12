import type {NextRequest, NextResponse} from 'next/server';
import {
  ACCESS_TOKEN_EXPIRY_SKEW_SECONDS,
  AUTH_COOKIE,
  AUTH_COOKIE_OPTIONS,
} from '@/lib/auth/constants';
import {requestTokenRefresh, TokenPair, TokenResult} from '@/lib/auth/backend';

/**
 * HttpOnly 쿠키 기반 세션 유틸 — 서버(Route Handler, proxy.ts)에서만 사용한다.
 */

const FALLBACK_ACCESS_TOKEN_TTL_SECONDS = 60 * 60;
const FALLBACK_REFRESH_TOKEN_TTL_SECONDS = 7 * 24 * 60 * 60;

/**
 * 회전 결과를 재사용하는 시간.
 * 같은 refresh 토큰으로 조금 늦게 도착한 동시 요청도 새 토큰을 받게 해 A006(불일치)을 피한다.
 */
const ROTATION_REUSE_WINDOW_MS = 30_000;

type ResponseCookies = NextResponse['cookies'];

/** 쿠키 수명 계산용으로만 exp를 읽는다. 서명 검증은 백엔드가 담당한다. */
const getJwtExpiry = (token: string): number | null => {
  try {
    const payload = token.split('.')[1];
    if (!payload) return null;
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const {exp} = JSON.parse(atob(base64)) as {exp?: unknown};
    return typeof exp === 'number' ? exp : null;
  } catch {
    return null;
  }
};

export const getSessionTokens = (request: NextRequest) => ({
  accessToken: request.cookies.get(AUTH_COOKIE.ACCESS_TOKEN)?.value,
  refreshToken: request.cookies.get(AUTH_COOKIE.REFRESH_TOKEN)?.value,
});

export const setSessionCookies = (
  cookies: ResponseCookies,
  {accessToken, refreshToken}: TokenPair
) => {
  const now = Math.floor(Date.now() / 1000);
  const accessExpiry =
    getJwtExpiry(accessToken) ?? now + FALLBACK_ACCESS_TOKEN_TTL_SECONDS;
  const refreshExpiry =
    getJwtExpiry(refreshToken) ?? now + FALLBACK_REFRESH_TOKEN_TTL_SECONDS;

  cookies.set(AUTH_COOKIE.ACCESS_TOKEN, accessToken, {
    ...AUTH_COOKIE_OPTIONS,
    maxAge: Math.max(accessExpiry - now - ACCESS_TOKEN_EXPIRY_SKEW_SECONDS, 0),
  });
  cookies.set(AUTH_COOKIE.REFRESH_TOKEN, refreshToken, {
    ...AUTH_COOKIE_OPTIONS,
    maxAge: Math.max(refreshExpiry - now, 0),
  });
};

export const clearSessionCookies = (cookies: ResponseCookies) => {
  cookies.set(AUTH_COOKIE.ACCESS_TOKEN, '', {
    ...AUTH_COOKIE_OPTIONS,
    maxAge: 0,
  });
  cookies.set(AUTH_COOKIE.REFRESH_TOKEN, '', {
    ...AUTH_COOKIE_OPTIONS,
    maxAge: 0,
  });
};

/** 응답에 반영할 세션 쿠키 변경 */
export type SessionUpdate =
  | {type: 'set'; tokens: TokenPair}
  | {type: 'clear'}
  | null;

export const applySessionUpdate = (
  cookies: ResponseCookies,
  update: SessionUpdate
) => {
  if (update?.type === 'set') setSessionCookies(cookies, update.tokens);
  if (update?.type === 'clear') clearSessionCookies(cookies);
};

const inflightRefreshes = new Map<string, Promise<TokenResult>>();
const recentRotations = new Map<
  string,
  {result: TokenResult; expiresAt: number}
>();

const hashToken = async (token: string) => {
  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(token)
  );
  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, '0')
  ).join('');
};

/**
 * refresh 토큰 회전 (single-flight + 결과 재사용)
 *
 * 백엔드는 refresh 시 refresh 토큰까지 새로 발급하고 이전 토큰을 즉시 무효화한다.
 * 같은 브라우저의 동시 요청들이 각자 refresh하면 두 번째부터 A006으로 실패하므로,
 * 같은 서버 인스턴스 안에서는
 * - 진행 중인 회전이 있으면 그 결과를 함께 기다리고
 * - 직전에 끝난 회전이 있으면 그 결과(새 토큰)를 그대로 돌려준다.
 * 다른 인스턴스와의 경합은 호출부가 'rotated' 결과로 처리한다.
 */
export const rotateSession = async (
  refreshToken: string
): Promise<TokenResult> => {
  const key = await hashToken(refreshToken);
  const now = Date.now();

  for (const [cachedKey, cached] of recentRotations) {
    if (cached.expiresAt <= now) recentRotations.delete(cachedKey);
  }

  const recent = recentRotations.get(key);
  if (recent) return recent.result;

  const inflight = inflightRefreshes.get(key);
  if (inflight) return inflight;

  const rotation = requestTokenRefresh(refreshToken)
    .then((result) => {
      if (result.ok) {
        recentRotations.set(key, {
          result,
          expiresAt: Date.now() + ROTATION_REUSE_WINDOW_MS,
        });
      }
      return result;
    })
    .finally(() => inflightRefreshes.delete(key));

  inflightRefreshes.set(key, rotation);
  return rotation;
};
