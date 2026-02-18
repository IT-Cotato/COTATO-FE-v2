import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {useQueryClient} from '@tanstack/react-query';
import {useSubmitApplication} from '@/hooks/mutations/useApply.mutation';
import {getRecruitmentStatus} from '@/services/api/recruitment/recruitment.api';
import {QUERY_KEYS} from '@/constants/query-keys';
import {ROUTES} from '@/constants/routes';
import {useRecruitmentStore} from '@/store/useRecruitmentStore';

interface UseApplySubmitHandlerProps {
  applicationId: number | null;
  onSave: () => Promise<void>;
  onValidate: () => Promise<boolean>;
}

/**
 * 지원서 최종 제출 핸들링 훅
 */
export const useApplySubmitHandler = ({
  applicationId,
  onSave,
  onValidate,
}: UseApplySubmitHandlerProps) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const {isRecruiting} = useRecruitmentStore();
  const {mutateAsync: submitApplication} = useSubmitApplication(applicationId);

  const openConfirmModal = () => setIsConfirmModalOpen(true);
  const closeConfirmModal = () => setIsConfirmModalOpen(false);

  /**
   * 모집 상태가 활성인지 확인
   */
  const ensureRecruitmentIsActive = async () => {
    try {
      const latest = await queryClient.fetchQuery({
        queryKey: [QUERY_KEYS.RECRUITMENT_STATUS],
        queryFn: getRecruitmentStatus,
        staleTime: 0,
      });

      if (!latest.isActive) {
        alert('모집 기간이 종료되었습니다.');
        router.push(ROUTES.HOME);
        return false;
      }
      return true;
    } catch {
      if (!isRecruiting) {
        alert('모집 기간이 종료되었습니다.');
        router.push(ROUTES.HOME);
        return false;
      }
      return true;
    }
  };

  /**
   * 최종 제출 버튼 클릭 핸들러
   */
  const handleFinalSubmit = async (e?: React.BaseSyntheticEvent) => {
    e?.preventDefault();
    if (!applicationId) return;

    const isValid = await onValidate();
    if (!isValid) return;

    const ok = await ensureRecruitmentIsActive();
    if (ok) openConfirmModal();
  };

  /**
   * 확인 모달에서 최종 제출 확인 클릭 핸들러
   */
  const handleConfirmSubmit = async () => {
    closeConfirmModal();
    if (!applicationId) return;

    try {
      const ok = await ensureRecruitmentIsActive();
      if (!ok) return;

      await onSave();
      await submitApplication();
      router.push('/?submitted=true');
    } catch {
      alert('제출에 실패했습니다. 잠시 후 다시 시도해주세요.');
      router.push('/?submitted=false');
    }
  };

  return {
    isConfirmModalOpen,
    openConfirmModal,
    closeConfirmModal,
    handleFinalSubmit,
    handleConfirmSubmit,
  };
};
