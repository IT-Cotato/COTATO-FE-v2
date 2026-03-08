import {QUERY_KEYS} from '@/constants/query-keys';
import {patchAttendanceStatus} from '@/services/api/admin/admin-attendance.api';
import {useMutation, useQueryClient} from '@tanstack/react-query';

/** 출석 상태 관리 Mutation */
export const useManageAttendanceStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchAttendanceStatus,
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
