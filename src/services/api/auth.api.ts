import {publicAxios, privateAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';
import {
  GetMeResponse,
  getMeResponseSchema,
  LogoutResponse,
  OAuthLoginRequest,
  oAuthLoginRequestSchema,
  OAuthLoginResponse,
  oAuthLoginResponseSchema,
} from '@/services/schemas/auth.schema';
import {AxiosResponse} from 'axios';
import {createSuccessResponseSchema} from '@/services/schemas/common.schema';

/**
 * OAuth 로그인
 * 인증 / 세션 관련 API에만 명시적으로 no-store를 추가합니다.
 */
export const oauthLogin = async (
  request: OAuthLoginRequest
): Promise<OAuthLoginResponse> => {
  // 요청 데이터 검증 & api 호출
  const validatedRequest = oAuthLoginRequestSchema.parse(request);
  const response: AxiosResponse = await publicAxios.post(
    ENDPOINT.AUTH.LOGIN_GOOGLE,
    validatedRequest,
    {
      fetchOptions: {
        cache: 'no-store',
      },
    }
  );

  // 응답 스키마 생성 및 검증
  const responseSchema = createSuccessResponseSchema(oAuthLoginResponseSchema);
  const validatedResponse = responseSchema.parse(response.data);

  // data 부분만 반환
  return validatedResponse.data;
};

/**
 * 로그아웃
 * 인증 / 세션 관련 API에만 명시적으로 no-store를 추가합니다.
 */
export const logout = async (): Promise<LogoutResponse> => {
  await privateAxios.post(ENDPOINT.AUTH.LOGOUT, undefined, {
    fetchOptions: {
      cache: 'no-store',
    },
  });
};

/**
 * 현재 사용자 정보 조회
 * 인증 / 세션 관련 API에만 명시적으로 no-store를 추가합니다.
 */
export const getMe = async (): Promise<GetMeResponse> => {
  const response: AxiosResponse = await privateAxios.get(ENDPOINT.AUTH.ME, {
    fetchOptions: {
      cache: 'no-store',
    },
  });

  const responseSchema = createSuccessResponseSchema(getMeResponseSchema);
  const validatedResponse = responseSchema.parse(response.data);

  return validatedResponse.data;
};
