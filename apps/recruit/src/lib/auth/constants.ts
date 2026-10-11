/**
 * 인증 쿠키·헤더 상수
 * 클라이언트 번들에서도 import되므로 비밀값이나 서버 전용 코드를 두지 않는다.
 */

const isProduction = process.env.NODE_ENV === 'production';

/**
 * production에서는 __Host- 접두사로 Secure·Path=/·Domain 미지정을 브라우저가 강제한다.
 * (cotato.kr 하위 도메인 간 쿠키 공유/덮어쓰기 차단)
 */
const cookieName = (name: string) => (isProduction ? `__Host-${name}` : name);

export const AUTH_COOKIE = {
  ACCESS_TOKEN: cookieName('recruit_at'),
  REFRESH_TOKEN: cookieName('recruit_rt'),
  OAUTH_STATE: cookieName('recruit_oauth_state'),
} as const;

export const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: isProduction,
  sameSite: 'lax',
  path: '/',
} as const;

/** access 쿠키를 토큰 exp보다 먼저 만료시켜, 백엔드에서 만료되기 전에 갱신이 일어나도록 한다. */
export const ACCESS_TOKEN_EXPIRY_SKEW_SECONDS = 60;

export const OAUTH_STATE_MAX_AGE_SECONDS = 5 * 60;

/**
 * BFF가 "다른 요청이 이미 토큰을 회전시켰다"고 판단했을 때 붙이는 응답 헤더.
 * 클라이언트는 이 헤더가 있는 401만 1회 재시도한다.
 */
export const AUTH_RETRY_HEADER = 'x-auth-retry';

/** OAuth 콜백 실패 시 홈으로 돌려보내며 붙이는 쿼리 파라미터 */
export const LOGIN_ERROR_PARAM = 'loginError';

export const LOGIN_ERROR = {
  STATE: 'state',
  OAUTH: 'oauth',
  CODE: 'code',
  LOGIN: 'login',
} as const;

export type LoginError = (typeof LOGIN_ERROR)[keyof typeof LOGIN_ERROR];
