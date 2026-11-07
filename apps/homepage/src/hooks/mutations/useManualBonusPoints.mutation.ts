import {useMutation, useQueryClient} from '@tanstack/react-query';
import {QUERY_KEYS} from '@/constants/query-keys';
import {
  cancelManualBonusPoint,
  grantManualBonusPoint,
} from '@/services/api/admin/manualBonusPoint.api';

/** 성공 응답 이후에만 관리자 합계·회원 카드·통합 내역·부여 이력을 다시 조회한다. */
export const useGrantManualBonusPointMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: grantManualBonusPoint,
    onSuccess: () =>
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.PENALTY.BASE]}),
  });
};

/** 취소 성공 전에는 화면의 점수를 임의로 차감하지 않는다. */
export const useCancelManualBonusPointMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cancelManualBonusPoint,
    onSuccess: () =>
      queryClient.invalidateQueries({queryKey: [QUERY_KEYS.PENALTY.BASE]}),
  });
};
