/**
 * MSW 모드 전용 세션
 * 실제 세션은 HttpOnly 쿠키라 브라우저에서 동작하는 MSW 핸들러가 읽을 수 없고,
 * 로그인 콜백은 서버 Route Handler라 MSW로 모킹할 수 없다.
 * 그래서 MSW 모드에서는 JS로 읽을 수 있는 목 토큰 쿠키로 로그인 상태를 흉내 낸다. (development 전용)
 */

export const isMockingEnabled =
  process.env.NODE_ENV === 'development' &&
  process.env.NEXT_PUBLIC_API_MOCKING === 'true';

const MOCK_SESSION_COOKIE = 'msw_access_token';

export const MOCK_APPLICANT_TOKEN = 'mock-access-token-applicant';

export const getMockSessionToken = () =>
  document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith(`${MOCK_SESSION_COOKIE}=`))
    ?.slice(MOCK_SESSION_COOKIE.length + 1) ?? null;

export const setMockSessionToken = (token: string | null) => {
  document.cookie = token
    ? `${MOCK_SESSION_COOKIE}=${token}; path=/`
    : `${MOCK_SESSION_COOKIE}=; path=/; max-age=0`;
};
