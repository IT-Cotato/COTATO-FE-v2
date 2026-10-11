/**
 * 클라이언트 인증 상태 유틸
 * 토큰은 HttpOnly 쿠키로 서버(BFF)만 다루므로, 클라이언트는 사용자 정보와 캐시만 정리한다.
 */

/** HttpOnly 쿠키 전환 이전에 localStorage에 저장하던 토큰 키 */
const LEGACY_TOKEN_KEYS = ['accessToken', 'refreshToken'];

/** 이전 버전이 남긴 localStorage 토큰 제거 */
export const removeLegacyTokens = () => {
  try {
    LEGACY_TOKEN_KEYS.forEach((key) => localStorage.removeItem(key));
  } catch {
    // localStorage 접근이 막힌 환경에서는 정리할 것도 없다.
  }
};

/** React Query 캐시와 전역 인증 상태 초기화 */
export const resetAuthState = async () => {
  try {
    const {getQueryClient} = await import('../../app/providers');
    getQueryClient().clear();

    const {useAuthStore} = await import('../../store/useAuthStore');
    useAuthStore.getState().logout();
  } catch (error) {
    console.error('Failed to reset auth state:', error);
  }
};
