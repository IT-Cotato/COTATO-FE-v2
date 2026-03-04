import {useMutation, useQueryClient} from '@tanstack/react-query';
import {QUERY_KEYS} from '@/constants/query-keys';
import {
  approveMembers,
  rejectMembers,
  restoreMembers,
  deleteRejectedMembers,
} from '@/services/api/approvals/approvals.api';

export const useApproveMembers = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: approveMembers,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: QUERY_KEYS.APPROVALS.BASE});
      queryClient.invalidateQueries({queryKey: QUERY_KEYS.ADMIN_MEMBERS.BASE});
    },
    onError: () => {
      queryClient.invalidateQueries({queryKey: QUERY_KEYS.APPROVALS.BASE});
      alert('가입 승인에 실패했습니다. 다시 시도해 주세요.');
    },
  });
};

export const useRejectMembers = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: rejectMembers,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: QUERY_KEYS.APPROVALS.BASE});
      queryClient.invalidateQueries({queryKey: QUERY_KEYS.ADMIN_MEMBERS.BASE});
    },
    onError: () => {
      queryClient.invalidateQueries({queryKey: QUERY_KEYS.APPROVALS.BASE});
      alert('가입 거절에 실패했습니다. 다시 시도해 주세요.');
    },
  });
};

export const useRestoreMembers = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: restoreMembers,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: QUERY_KEYS.APPROVALS.BASE});
      queryClient.invalidateQueries({queryKey: QUERY_KEYS.ADMIN_MEMBERS.BASE});
    },
    onError: () => {
      queryClient.invalidateQueries({queryKey: QUERY_KEYS.APPROVALS.BASE});
      alert('복원에 실패했습니다. 다시 시도해 주세요.');
    },
  });
};

export const useDeleteRejectedMembers = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRejectedMembers,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: QUERY_KEYS.APPROVALS.BASE});
      queryClient.invalidateQueries({queryKey: QUERY_KEYS.ADMIN_MEMBERS.BASE});
    },
    onError: () => {
      queryClient.invalidateQueries({queryKey: QUERY_KEYS.APPROVALS.BASE});
      alert('삭제에 실패했습니다. 다시 시도해 주세요.');
    },
  });
};
