import {z} from 'zod';

/**
 * 사용자 역할 enum
 */
export const UserRoleSchema = z.enum(['APPLICANT', 'STAFF']);

/**
 * OAuth 로그인 요청 스키마
 */
export const oAuthLoginRequestSchema = z.object({
  code: z.string(),
  redirectUri: z.string().url(),
});

/**
 * OAuth 로그인 응답 스키마
 */
export const oAuthLoginResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  tokenType: z.string(),
});

/**
 * 토큰 갱신 요청 스키마
 */
export const refreshTokenRequestSchema = z.object({
  refreshToken: z.string(),
});

/**
 * 토큰 갱신 응답 스키마
 */
export const refreshTokenResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  tokenType: z.string(),
});

/**
 * 로그아웃 응답 스키마
 */
export const logoutResponseSchema = z.void();

/**
 * 사용자 정보 응답 스키마
 */
export const getMeResponseSchema = z.object({
  userId: z.number(),
  email: z.string().email(),
  name: z.string(),
  role: UserRoleSchema,
});

// 타입 추출
export type UserRole = z.infer<typeof UserRoleSchema>;
export type OAuthLoginRequest = z.infer<typeof oAuthLoginRequestSchema>;
export type OAuthLoginResponse = z.infer<typeof oAuthLoginResponseSchema>;
export type RefreshTokenRequest = z.infer<typeof refreshTokenRequestSchema>;
export type RefreshTokenResponse = z.infer<typeof refreshTokenResponseSchema>;
export type LogoutResponse = z.infer<typeof logoutResponseSchema>;
export type GetMeResponse = z.infer<typeof getMeResponseSchema>;
