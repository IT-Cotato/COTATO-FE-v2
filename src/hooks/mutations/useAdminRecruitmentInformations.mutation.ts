import {QUERY_KEYS} from '@/constants/query-keys';
import type {PostAdminRecruitmentInformationRequest} from '@/schemas/admin/admin-recruitment-information.schema';

import type {ErrorResponse} from '@/schemas/common/common-schema';
import {postAdminRecruitmentInformations} from '@/services/api/admin/admin-recruitment-info.api';
import {useMutation, useQueryClient} from '@tanstack/react-query';

/**
 * 모집 정보(리크루팅 설정)를 생성 또는 수정하는 React Query mutation 훅입니다.
 *
 * - 어드민 지원서 수정 페이지의 모집 기간 폼에서 사용됩니다.
 * - 저장 성공 시, 모집 정보 조회 쿼리를 무효화하여 최신 상태로 갱신합니다.
 *
 * @returns React Query useMutation
 */
export const useAdminRecruitmentInformationsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    ErrorResponse,
    PostAdminRecruitmentInformationRequest
  >({
    mutationFn: postAdminRecruitmentInformations,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ADMIN_RECRUITMENT_INFORMATIONS],
      });
    },
  });
};
