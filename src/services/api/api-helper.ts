import axios from 'axios';
import {ErrorResponseSchema} from '@/services/schemas/common.schema';

/**
 * 모든 API 서비스에서 공통으로 사용할 에러 핸들러
 * axios 에러를 분석하여 커스텀 에러를 throw 하거나 일반 에러를 throw함
 */
export const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;

    const parsed = ErrorResponseSchema.safeParse(data);
    if (parsed.success) {
      throw parsed.data;
    }
  }

  // 예측하지 못한 에러나 네트워크 에러
  throw new Error('알 수 없는 에러가 발생했습니다.');
};
