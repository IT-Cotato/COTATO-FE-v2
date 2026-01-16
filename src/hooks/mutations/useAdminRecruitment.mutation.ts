import {useMutation, useQueryClient} from '@tanstack/react-query';

import {
  PostRecruitmentActivationRequest,
  PostRecruitmentDeactivationRequest,
  RecruitmentResponse,
} from '@/schemas/admin/admin-recruitment.schema';

import {useRecruitmentStore} from '@/store/useRecruitmentStore';
import {ErrorResponse} from '@/schemas/common/common-schema';
import {
  postRecruitmentActivation,
  postRecruitmentDeactivation,
} from '@/services/api/admin/admin-recruitment.api';
import {QUERY_KEYS} from '@/constants/query-keys';

export const useAdminRecruitmentMutation = () => {
  const setIsRecruiting = useRecruitmentStore((state) => state.setIsRecruiting);
  const queryClient = useQueryClient();

  /**
   * 성공 시 공통 처리 함수
   * 추후 invalidateQueries 추가 예정
   */
  const handleSuccess = (nextStatus: boolean) => {
    // ex) queryClient.invalidateQueries({ queryKey: ['adminApplications'] });
    setIsRecruiting(nextStatus);
    setTimeout(() => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.RECRUITMENT_STATUS],
      });
    }, 500);
  };

  // 활성화 Mutation
  const activationMutation = useMutation<
    RecruitmentResponse,
    ErrorResponse,
    PostRecruitmentActivationRequest
  >({
    mutationFn: postRecruitmentActivation,
    onSuccess: () => handleSuccess(true),
    onError: (error) => {
      console.error(error.message);
    },
  });

  // 종료 Mutation
  const deactivationMutation = useMutation<
    RecruitmentResponse,
    ErrorResponse,
    PostRecruitmentDeactivationRequest
  >({
    mutationFn: postRecruitmentDeactivation,
    onSuccess: () => handleSuccess(false),
    onError: (error) => {
      console.error(error.message);
    },
  });

  return {
    activate: activationMutation.mutate,
    deactivate: deactivationMutation.mutate,
    isLoading: activationMutation.isPending || deactivationMutation.isPending,
  };
};
