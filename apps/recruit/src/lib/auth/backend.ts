import {
  getMeResponseSchema,
  GetMeResponse,
  oAuthLoginRequestSchema,
  oAuthLoginResponseSchema,
  refreshTokenRequestSchema,
  refreshTokenResponseSchema,
} from '@/schemas/auth/auth-schema';
import {
  createSuccessResponseSchema,
  ErrorResponseSchema,
} from '@/schemas/common/common-schema';
import {ENDPOINT} from '@/services/constant/endpoint';

/**
 * 백엔드(Spring) 직접 호출 — 서버(Route Handler, proxy.ts)에서만 사용한다.
 */

const BACKEND_TIMEOUT_MS = 10_000;

/** 백엔드가 refresh 토큰 불일치(이미 회전됨) 시 내려주는 에러 코드 */
const REFRESH_TOKEN_MISMATCH_CODE = 'A006';

export const getBackendBaseUrl = () => {
  // 서버 전용 API_BASE_URL을 우선 사용하고, 기존 배포 환경과의 호환을 위해 NEXT_PUBLIC_ 값으로 대체한다.
  const baseUrl =
    process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL;
  if (!baseUrl) {
    throw new Error(
      'API_BASE_URL is not defined. Please check your .env file.'
    );
  }
  return baseUrl;
};

/** path는 '/api/...'처럼 '/'로 시작하고, 필요하면 쿼리스트링을 포함한다. */
export const backendFetch = (path: string, init: RequestInit = {}) =>
  fetch(`${getBackendBaseUrl().replace(/\/$/, '')}${path}`, {
    ...init,
    cache: 'no-store',
    signal: AbortSignal.timeout(BACKEND_TIMEOUT_MS),
  });

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

/**
 * - rejected: 토큰/코드가 유효하지 않음 → 세션 종료
 * - rotated: 다른 요청이 같은 refresh 토큰을 먼저 회전시킴 → 세션 유지, 재시도 필요
 * - unavailable: 네트워크 오류·5xx → 세션 상태를 판단할 수 없음
 */
export type TokenResult =
  | {ok: true; tokens: TokenPair}
  | {ok: false; reason: 'rejected' | 'rotated' | 'unavailable'};

const tokenResponseSchema = createSuccessResponseSchema(
  oAuthLoginResponseSchema
);
const refreshResponseSchema = createSuccessResponseSchema(
  refreshTokenResponseSchema
);
const meResponseSchema = createSuccessResponseSchema(getMeResponseSchema);

const toFailure = async (response: Response): Promise<TokenResult> => {
  if (response.status >= 500) return {ok: false, reason: 'unavailable'};

  const error = ErrorResponseSchema.safeParse(
    await response.json().catch(() => null)
  );
  if (error.success && error.data.code === REFRESH_TOKEN_MISMATCH_CODE) {
    return {ok: false, reason: 'rotated'};
  }
  return {ok: false, reason: 'rejected'};
};

const postForTokens = async (
  path: string,
  body: unknown,
  schema: typeof tokenResponseSchema | typeof refreshResponseSchema
): Promise<TokenResult> => {
  try {
    const response = await backendFetch(path, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body),
    });
    if (!response.ok) return toFailure(response);

    const {data} = schema.parse(await response.json());
    return {
      ok: true,
      tokens: {accessToken: data.accessToken, refreshToken: data.refreshToken},
    };
  } catch (error) {
    console.error('[Auth backend request failed]', path, error);
    return {ok: false, reason: 'unavailable'};
  }
};

/** 구글 인가 코드를 백엔드 JWT로 교환 */
export const exchangeGoogleCode = (code: string, redirectUri: string) =>
  postForTokens(
    ENDPOINT.AUTH.LOGIN_GOOGLE,
    oAuthLoginRequestSchema.parse({code, redirectUri}),
    tokenResponseSchema
  );

/** refresh 토큰으로 access/refresh 토큰을 모두 재발급 (백엔드는 완전 회전 방식) */
export const requestTokenRefresh = (refreshToken: string) =>
  postForTokens(
    ENDPOINT.AUTH.REFRESH,
    refreshTokenRequestSchema.parse({refreshToken}),
    refreshResponseSchema
  );

export type CurrentUserResult =
  | {status: 'ok'; user: GetMeResponse}
  | {status: 'unauthorized'}
  | {status: 'unavailable'};

/** proxy.ts의 역할 검사용 — JWT에 role 클레임이 없어 백엔드에 조회한다. */
export const fetchCurrentUser = async (
  accessToken: string
): Promise<CurrentUserResult> => {
  try {
    const response = await backendFetch(ENDPOINT.AUTH.ME, {
      headers: {Authorization: `Bearer ${accessToken}`},
    });
    if (response.status === 401) return {status: 'unauthorized'};
    if (!response.ok) return {status: 'unavailable'};

    const {data} = meResponseSchema.parse(await response.json());
    return {status: 'ok', user: data};
  } catch (error) {
    console.error('[Auth backend request failed]', ENDPOINT.AUTH.ME, error);
    return {status: 'unavailable'};
  }
};
