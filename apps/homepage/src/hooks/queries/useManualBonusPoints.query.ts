import {useQuery} from '@tanstack/react-query';
import {QUERY_KEYS} from '@/constants/query-keys';
import {getManualBonusPoints} from '@/services/api/admin/manualBonusPoint.api';

/** 열린 회원 관리 창의 부여·취소 이력을 기수와 회원별로 분리해 캐시한다. */
export const useManualBonusPointsQuery = (
  generationId: number,
  memberId: number
) =>
  useQuery({
    queryKey: QUERY_KEYS.PENALTY.MANUAL_BONUS(generationId, memberId),
    queryFn: () => getManualBonusPoints({generationId, memberId}),
    enabled: generationId > 0 && memberId > 0,
  });
