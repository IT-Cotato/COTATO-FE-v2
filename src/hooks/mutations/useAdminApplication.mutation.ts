import {QUERY_KEYS} from '@/constants/query-keys';
import {postAdminApplicationEvaluation} from '@/services/api/admin/admin-application.api';
import {useMutation, useQueryClient} from '@tanstack/react-query';

/**
 * 지원서 별 운영진 평가 데이터를 생성하는 훅입니다.
 *
 * - 어드민 지원서 조회 페이지의 운영진 평가 탭에서 사용됩니다.
 * - 생성 성공 시 기존 운영진 평가 쿼리는 무효화됩니다.
 *
 * @param applicationId 지원서 id
 * @returns React Query useMutation
 */
export const usePostAdminApplicationEvaluation = (applicationId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postAdminApplicationEvaluation,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEYS.ADMIN_APPLICATION_EVALUATION,
          applicationId,
          variables.body.evaluatorType,
        ],
      });
    },
  });
};
