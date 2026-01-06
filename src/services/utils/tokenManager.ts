/**
 * 토큰 관리 유틸리티
 * - accessToken: localStorage에 저장
 * - refreshToken: localStorage에 저장
 */

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

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
 * Refresh Token 저장 (localStorage)
 */
export const setRefreshToken = (token: string | null) => {
  if (token) {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
};

/**
 * Refresh Token 조회 (localStorage)
 */
export const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

/**
 * 모든 토큰 삭제
 */
export const clearTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

/**
 * 토큰 존재 여부 확인
 */
export const hasTokens = (): boolean => {
  return !!(getAccessToken() && getRefreshToken());
};
