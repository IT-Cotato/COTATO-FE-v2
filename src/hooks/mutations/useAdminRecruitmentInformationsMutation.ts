import {QUERY_KEYS} from '@/constants/query-keys';
import {PostAdminRecruitmentInformationRequest} from '@/schemas/admin/admin-recruitment-information-schema';
import {postRecruitmentInformations} from '@/services/api/admin/admin.recruitment.info.api';
import {ErrorResponse} from '@/schemas/common/common-schema';
import {useMutation, useQueryClient} from '@tanstack/react-query';

export const usePostRecruitmentInformationsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    ErrorResponse,
    PostAdminRecruitmentInformationRequest
  >({
    mutationFn: postRecruitmentInformations,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.ADMIN_RECRUITMENT_INFORMATIONS],
      });
    },
  });
};
