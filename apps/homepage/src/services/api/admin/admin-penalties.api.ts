import {
  FullSessionTableResponse,
  FullSessionTableResponseSchema,
  SpecificSessionTableResponse,
  SpecificSessionTableResponseSchema,
} from '@/schemas/admin/admin-penalties.schema';
import {privateAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';
import {handleApiError} from '@/services/utils/apiHelper';
import {SortDirection} from '@/types/mypage/admin/penalties/penalties.type';

/** 기타 벌점 수정 */
export const patchExtraMinusPoint = async (params: {
  sessionId: number;
  memberId: number;
  extraMinusPoint: number;
}): Promise<void> => {
  try {
    await privateAxios.patch(
      ENDPOINT.PENALTY.EDIT_EXTRA_MINUS_POINT(params.sessionId),
      {
        memberId: params.memberId,
        extraMinusPoint: params.extraMinusPoint,
      }
    );
  } catch (error) {
    return handleApiError(error);
  }
};

/** 비어 네트워킹 참여 여부 수정 */
export const patchBeerNetworking = async (params: {
  sessionId: number;
  memberId: number;
  participated: boolean;
}): Promise<void> => {
  try {
    await privateAxios.patch(
      ENDPOINT.PENALTY.EDIT_BEER_NETWORKING(params.sessionId),
      {
        memberId: params.memberId,
        participated: params.participated,
      }
    );
  } catch (error) {
    return handleApiError(error);
  }
};

/** 전체 상벌점 통계 조회 */
export const getAllStatistics = async (params: {
  generationId: number;
  search?: string;
  sortDirection?: SortDirection;
}): Promise<FullSessionTableResponse> => {
  try {
    const {data} = await privateAxios.get(ENDPOINT.PENALTY.ALL_STATISTICS, {
      params,
    });
    return FullSessionTableResponseSchema.parse(data);
  } catch (error) {
    return handleApiError(error);
  }
};

/** 세션별 상벌점 관리 조회 */
export const getSessionDetail = async (params: {
  sessionId: number;
  search?: string;
}): Promise<SpecificSessionTableResponse> => {
  try {
    const {data} = await privateAxios.get(
      ENDPOINT.PENALTY.SESSION_DETAIL(params.sessionId),
      {
        params: {search: params.search},
      }
    );
    return SpecificSessionTableResponseSchema.parse(data);
  } catch (error) {
    return handleApiError(error);
  }
};
