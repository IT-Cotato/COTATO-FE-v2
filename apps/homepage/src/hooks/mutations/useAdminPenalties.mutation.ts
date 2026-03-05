import {QUERY_KEYS} from '@/constants/query-keys';
import {
  patchBeerNetworking,
  patchExtraMinusPoint,
} from '@/services/api/admin/admin-penalties.api';
import {useMutation, useQueryClient} from '@tanstack/react-query';

/** 비어 네트워킹 참여 여부 수정 Mutation */
export const usePatchBeerNetworkingMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchBeerNetworking,
    onSuccess: async () => {
      await Promise.all([
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.ATTENDANCE.BASE],
        }),
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.PENALTY.BASE],
        }),
      ]);
    },
  });
};

/** 기타 벌점 수정 Mutation */
export const usePatchExtraMinusPointMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchExtraMinusPoint,
    onSuccess: async () => {
      await Promise.all([
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.ATTENDANCE.BASE],
        }),
        await queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.PENALTY.BASE],
        }),
      ]);
    },
  });
};
