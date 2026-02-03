import type {AxiosResponse} from 'axios';
import {
  RefreshTokenRequest,
  refreshTokenRequestSchema,
  RefreshTokenResponse,
  refreshTokenResponseSchema,
} from '@/schemas/auth/auth-schema';
import {publicAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';
import {createSuccessResponseSchema} from '@/schemas/common/common-schema';

/**
 * 토큰 갱신
 * 인증 / 세션 관련 API에만 명시적으로 no-store를 추가합니다.
 */
export const refreshToken = async (
  request: RefreshTokenRequest
): Promise<RefreshTokenResponse> => {
  const validatedRequest = refreshTokenRequestSchema.parse(request);
  const response: AxiosResponse = await publicAxios.post(
    ENDPOINT.AUTH.REFRESH,
    validatedRequest,
    {
      fetchOptions: {
        cache: 'no-store',
      },
    }
  );

  const responseSchema = createSuccessResponseSchema(
    refreshTokenResponseSchema
  );
  const validatedResponse = responseSchema.parse(response.data);

  return validatedResponse.data;
};
