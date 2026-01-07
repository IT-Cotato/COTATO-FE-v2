import {publicAxios, privateAxios} from '@/services/config/axios';
import type {
  GetMeResponse,
  LogoutResponse,
  OAuthLoginRequest,
  OAuthLoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from '@/services/types/auth.types';
import {ENDPOINT} from '@/services/constant/endpoint';
import {SuccessResponse} from '@/services/types/common.types';

/**
 * OAuth 로그인
 * 인증 / 세션 관련 API에만 명시적으로 no-store를 추가합니다.
 */
export const oauthLogin = async (
  request: OAuthLoginRequest
): Promise<OAuthLoginResponse> => {
  const {data} = await publicAxios.post<SuccessResponse<OAuthLoginResponse>>(
    ENDPOINT.AUTH.LOGIN_GOOGLE,
    request,
    {
      fetchOptions: {
        cache: 'no-store',
      },
    }
  );
  return data.data;
};

/**
 * 토큰 갱신
 * 인증 / 세션 관련 API에만 명시적으로 no-store를 추가합니다.
 */
export const refreshToken = async (
  request: RefreshTokenRequest
): Promise<RefreshTokenResponse> => {
  const {data} = await publicAxios.post<SuccessResponse<RefreshTokenResponse>>(
    ENDPOINT.AUTH.REFRESH,
    request,
    {
      fetchOptions: {
        cache: 'no-store',
      },
    }
  );
  return data.data;
};

/**
 * 로그아웃
 * 인증 / 세션 관련 API에만 명시적으로 no-store를 추가합니다.
 */
export const logout = async (): Promise<LogoutResponse> => {
  await privateAxios.post<SuccessResponse<LogoutResponse>>(
    ENDPOINT.AUTH.LOGOUT,
    undefined,
    {
      fetchOptions: {
        cache: 'no-store',
      },
    }
  );
};

/**
 * 현재 사용자 정보 조회
 * 인증 / 세션 관련 API에만 명시적으로 no-store를 추가합니다.
 */
export const getMe = async (): Promise<GetMeResponse> => {
  const {data} = await privateAxios.get<SuccessResponse<GetMeResponse>>(
    ENDPOINT.AUTH.ME,
    {
      fetchOptions: {
        cache: 'no-store',
      },
    }
  );
  return data.data;
};
