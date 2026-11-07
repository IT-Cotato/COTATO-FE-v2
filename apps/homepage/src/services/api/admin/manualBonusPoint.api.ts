import {z} from 'zod';
import {privateAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';
import {handleApiError} from '@/services/utils/apiHelper';
import {
  GrantManualBonusPoint,
  GrantManualBonusPointSchema,
  ManualBonusPointSchema,
} from '@/schemas/admin/manualBonusPoint.schema';

/** 세션별 벌점 API를 재사용하지 않고 독립적인 수동 상점 이력을 조회한다. */
export const getManualBonusPoints = async (params: {
  generationId: number;
  memberId: number;
}) => {
  try {
    const {data} = await privateAxios.get(ENDPOINT.PENALTY.MANUAL_BONUS, {
      params,
    });
    return z.array(ManualBonusPointSchema).parse(data);
  } catch (error) {
    return handleApiError(error);
  }
};

/** 부여자는 서버 인증 정보에서 결정하며 요청에 전달하지 않는다. */
export const grantManualBonusPoint = async (request: GrantManualBonusPoint) => {
  try {
    const {data} = await privateAxios.post(
      ENDPOINT.PENALTY.MANUAL_BONUS,
      GrantManualBonusPointSchema.parse(request)
    );
    return ManualBonusPointSchema.parse(data);
  } catch (error) {
    return handleApiError(error);
  }
};

/** 취소 사유를 기록하고 원래 부여 행은 보존한다. */
export const cancelManualBonusPoint = async (request: {
  id: number;
  reason: string;
}) => {
  try {
    const {data} = await privateAxios.patch(
      ENDPOINT.PENALTY.CANCEL_MANUAL_BONUS(request.id),
      {reason: request.reason}
    );
    return ManualBonusPointSchema.parse(data);
  } catch (error) {
    return handleApiError(error);
  }
};
