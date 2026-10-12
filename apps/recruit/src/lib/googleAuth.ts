import {ROUTES} from '@/constants/routes';
import {
  isMockingEnabled,
  MOCK_APPLICANT_TOKEN,
  setMockSessionToken,
} from '@/mocks/session';

/**
 * 구글 로그인 시작
 * state 생성·저장은 서버(/oauth2/login)가 HttpOnly 쿠키로 처리하고,
 * 로그인 후에는 현재 페이지로 돌아온다.
 */
export const startGoogleLogin = () => {
  if (typeof window === 'undefined') {
    console.error('startGoogleLogin can only be called in browser environment');
    return;
  }

  if (isMockingEnabled) {
    // MSW 모드: 구글/백엔드 대신 APPLICANT 목 세션으로 로그인 (STAFF는 mocks/data/store.ts 참고)
    setMockSessionToken(MOCK_APPLICANT_TOKEN);
    window.location.reload();
    return;
  }

  const returnTo = window.location.pathname + window.location.search;
  window.location.assign(
    `${ROUTES.OAUTH2_LOGIN}?${new URLSearchParams({returnTo})}`
  );
};
