/**
 * OAuth 로그인 요청
 */
export interface OAuthLoginRequest {
  code: string;
  redirectUri: string;
}

/**
 * OAuth 로그인 응답
 */
export interface OAuthLoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}

/**
 * 토큰 갱신 요청
 */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * 토큰 갱신 응답
 */
export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}

/**
 * 로그아웃 응답
 */
export type LogoutResponse = void;

/**
 * 사용자 정보 응답
 */
export interface UserResponse {
  userId: number;
  email: string;
  name: string;
  role: 'APPLICANT' | 'STAFF';
}
