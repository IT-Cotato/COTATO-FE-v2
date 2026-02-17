import {postAttendanceRecord} from '@/services/api/attendance/attendance.api';
import {useMutation, useQueryClient} from '@tanstack/react-query';

/** 출석 제출 Mutation */
export const useSubmitAttendanceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postAttendanceRecord,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['attendance', 'sessions']});
      queryClient.invalidateQueries({queryKey: ['attendance', 'dashboard']});
      queryClient.invalidateQueries({queryKey: ['attendance', 'records']});
    },
  });
};
