import {QUERY_KEYS} from '@/constants/query-keys';
import {ApplicationPassStatus} from '@/schemas/admin/admin-applications.schema';
import {postApplicationPassStatus} from '@/services/api/admin/admin-applications.api';
import {useMutation, useQueryClient} from '@tanstack/react-query';

/**
 * 어드민 지원서 열람 페이지에서
 * 특정 지원서의 합격 여부를 변경하기 위한 mutation 훅입니다.
 *
 * - 지원서 ID를 기준으로 합격 상태를 변경합니다.
 * - 변경 성공 시, 지원서 목록 조회 쿼리(ADMIN_APPLICATIONS)를 무효화하여
 *   최신 상태의 목록을 다시 조회합니다.
 *
 * @returns React Query mutation 객체
 *
 */
export const useUpdateApplicationPassStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      applicationId,
      body,
    }: {
      applicationId: number;
      body: {passStatus: ApplicationPassStatus};
    }) => postApplicationPassStatus(applicationId, body),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ADMIN_APPLICATIONS],
      });
    },
  });
};
