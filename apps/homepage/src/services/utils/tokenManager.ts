/**
 * 토큰 관리 유틸리티
 * - accessToken: localStorage에 저장
 * - refreshToken: localStorage에 저장
 */

export const ACCESS_TOKEN_KEY = 'accessToken';

/**
 * Access Token 저장 (localStorage)
 */
export const setAccessToken = (token: string | null) => {
  if (token) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
};

/**
 * Access Token 조회 (localStorage)
 */
export const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

/**
 * 모든 토큰 삭제
 */
export const clearTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

/**
 * 토큰 존재 여부 확인
 */
export const hasTokens = (): boolean => {
  return !!getAccessToken();
};

/**
 * 전역 상태 및 토큰 클리어
 */
export const clearAuthState = async () => {
  try {
    // 1. 토큰 삭제
    clearTokens();

    // 2. React Query 캐시 클리어
    if (typeof window !== 'undefined') {
      const {getQueryClient} = await import('../../app/providers');
      const queryClient = getQueryClient();
      queryClient.clear();
    }

    // 3. 전역 상태 초기화
    if (typeof window !== 'undefined') {
      const {useAuthStore} = await import('../../store/useAuthStore');
      useAuthStore.getState().logout();
    }
  } catch (error) {
    console.error('Failed to clear auth state:', error);
  }
};
