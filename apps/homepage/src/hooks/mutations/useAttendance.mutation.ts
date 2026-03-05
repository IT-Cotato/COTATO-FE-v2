import {QUERY_KEYS} from '@/constants/query-keys';
import {postAttendanceRecord} from '@/services/api/attendance/attendance.api';
import {useMutation, useQueryClient} from '@tanstack/react-query';

/** 출석 제출 Mutation */
export const useSubmitAttendanceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postAttendanceRecord,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ATTENDANCE.BASE],
      });
    },
  });
};
