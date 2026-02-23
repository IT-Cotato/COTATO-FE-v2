import {publicAxios, privateAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';
import {
  GetMeResponse,
  getMeResponseSchema,
  OAuthLoginRequest,
  oAuthLoginRequestSchema,
  OAuthLoginResponse,
  oAuthLoginResponseSchema,
} from '@/schemas/auth/auth-schema';
import {AxiosResponse} from 'axios';
import {createSuccessResponseSchema} from '@/schemas/common/common-schema';

/**
 * OAuth 로그인
 */
export const oauthLogin = async (
  request: OAuthLoginRequest
): Promise<OAuthLoginResponse> => {
  // 요청 데이터 검증 & api 호출
  const validatedRequest = oAuthLoginRequestSchema.parse(request);
  const response: AxiosResponse = await publicAxios.post(
    ENDPOINT.AUTH.LOGIN_GOOGLE,
    validatedRequest
  );

  // 응답 스키마 생성 및 검증
  const responseSchema = createSuccessResponseSchema(oAuthLoginResponseSchema);
  const validatedResponse = responseSchema.parse(response.data);

  // data 부분만 반환
  return validatedResponse.data;
};

/**
 * 로그아웃
 */
export const logout = async (): Promise<void> => {
  await privateAxios.post(ENDPOINT.AUTH.LOGOUT);
};

/**
 * 현재 사용자 정보 조회
 */
export const getMe = async (): Promise<GetMeResponse> => {
  const response: AxiosResponse = await privateAxios.get(ENDPOINT.AUTH.ME);

  const responseSchema = createSuccessResponseSchema(getMeResponseSchema);
  const validatedResponse = responseSchema.parse(response.data);

  return validatedResponse.data;
};
