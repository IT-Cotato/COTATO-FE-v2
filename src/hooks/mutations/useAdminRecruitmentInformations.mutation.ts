import {QUERY_KEYS} from '@/constants/query-keys';
import type {PostAdminRecruitmentInformationRequest} from '@/schemas/admin/admin-recruitment-information.schema';

import type {ErrorResponse} from '@/schemas/common/common-schema';
import {postAdminRecruitmentInformations} from '@/services/api/admin/admin.recruitment.info.api';
import {useMutation, useQueryClient} from '@tanstack/react-query';

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
