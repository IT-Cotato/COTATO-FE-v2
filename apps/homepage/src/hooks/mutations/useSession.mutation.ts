import {QUERY_KEYS} from '@/constants/query-keys';
import {
  createSession,
  deleteSession,
  updateSession,
} from '@/services/api/session/session.api';
import {useMutation, useQueryClient} from '@tanstack/react-query';

// 세션 생성
export const useCreateSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSession,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['sessions', 'admin'],
      });
    },
    onError: (error) => {
      console.error('세션 생성 실패:', error);
      alert('세션 생성에 실패했습니다. 다시 시도해 주세요.');
    },
  });
};

// 세션 수정
export const useUpdateSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSession,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['sessions', 'admin'],
      });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SESSIONS.DETAIL(variables.sessionId),
      });
    },
    onError: (error) => {
      console.error('세션 수정 실패:', error);
      alert('세션 수정에 실패했습니다. 다시 시도해 주세요.');
    },
  });
};

// 세션 삭제
export const useDeleteSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSession,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['sessions', 'admin'],
      });
    },
    onError: (error) => {
      console.error('세션 삭제 실패:', error);
      alert('세션 삭제에 실패했습니다. 다시 시도해 주세요.');
    },
  });
};
