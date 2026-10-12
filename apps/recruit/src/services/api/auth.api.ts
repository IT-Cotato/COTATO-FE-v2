import {privateAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';
import {GetMeResponse, getMeResponseSchema} from '@/schemas/auth/auth-schema';
import {AxiosResponse} from 'axios';
import {createSuccessResponseSchema} from '@/schemas/common/common-schema';

/**
 * 로그아웃 (BFF가 백엔드 로그아웃 호출 후 세션 쿠키 삭제)
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
