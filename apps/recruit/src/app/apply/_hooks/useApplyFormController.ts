import {useSearchParams} from 'next/navigation';
import {UseFormReturn} from 'react-hook-form';
import {useQueryClient} from '@tanstack/react-query';
import {ApplyFormData} from '@/schemas/apply/apply-schema';
import {
  useGetEtcQuestionsQuery,
  useGetBasicInfoQuery,
  useGetPartQuestionsQuery,
} from '@/hooks/queries/useApply.query';
import {useApplyValidation} from './useApplyValidation';
import {useApplySave} from './useApplySave';
import {useApplyStepGuard} from './useApplyStepGuard';
import {usePreventNavigation} from './usePreventNavigation';
import {useApplyStep} from './useApplyStep';
import {useApplyForm} from './useApplyForm';
import {useApplyURLSync} from './useApplyURLSync';
import {useApplySubmitHandler} from './useApplySubmitHandler';
import {useAuthStore} from '@/store/useAuthStore';
import {useApplicationStatusQuery} from '@/hooks/queries/useApply.query';
import {QUERY_KEYS} from '@/constants/query-keys';
import {getApplicationStatus} from '@/services/api/apply/apply.api';

interface UseApplyFormControllerReturn {
  step: number;
  methods: UseFormReturn<ApplyFormData>;
  handleNext: () => Promise<void>;
  handlePrev: () => void;
  handleSave: () => Promise<void>;
  handleFinalSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isConfirmModalOpen: boolean;
  openConfirmModal: () => void;
  closeConfirmModal: () => void;
  handleConfirmSubmit: () => Promise<void>;
  showSaveSuccess: boolean;
}

export const useApplyFormController = (): UseApplyFormControllerReturn => {
  const searchParams = useSearchParams();
  const applicationId = searchParams.get('id');
  const numericApplicationId = applicationId ? Number(applicationId) : null;

  const queryClient = useQueryClient();
  const {isAuthenticated} = useAuthStore();

  // 1. 폼 및 스텝 관리
  const methods = useApplyForm();
  const {step, goToNextStep, goToPrevStep} = useApplyStep();

  // 2. 데이터 페칭
  const {data: basicInfo, isFetched: isBasicInfoFetched} =
    useGetBasicInfoQuery(numericApplicationId);
  const {data: partQuestionsData, isFetched: isPartQuestionsFetched} =
    useGetPartQuestionsQuery(numericApplicationId);
  useGetEtcQuestionsQuery(numericApplicationId);

  // 3. 가드 및 동기화
  usePreventNavigation(methods.formState.isDirty);
  useApplyStepGuard({
    step,
    applicationId,
    basicInfo,
    isBasicInfoFetched,
    partQuestionsData,
    isPartQuestionsFetched,
  });
  useApplyURLSync({step, basicInfo});

  // 4. 핵심 로직 훅
  const {validateStep} = useApplyValidation();
  const {handleSave: saveForm, showSaveSuccess} = useApplySave(
    numericApplicationId,
    basicInfo?.applicationPartType
  );

  // 5. 이벤트 핸들러
  const handleSave = async () => {
    await saveForm(step, methods);
  };

  const SUBMIT_STEP=3;

  const {
    isConfirmModalOpen,
    openConfirmModal,
    closeConfirmModal,
    handleFinalSubmit,
    handleConfirmSubmit,
  } = useApplySubmitHandler({
    applicationId: numericApplicationId,
    onSave: () => saveForm(SUBMIT_STEP, methods, false),
    onValidate: () => validateStep(3, methods),
  });

  const handleNext = async () => {
    const isValid = await validateStep(
      step,
      methods,
      partQuestionsData,
      basicInfo?.applicationPartType
    );
    if (!isValid) return;

    try {
      await saveForm(step, methods, false);
    } catch (error) {
      console.error(error);

      // 저장 실패 시 제출 여부를 서버에서 재확인
      // 다른 탭에서 이미 제출한 경우 applicationStatus를 갱신하면
      // ApplyFormContainer의 AlreadySubmittedModal이 자동으로 렌더링됨
      try {
        const latestStatus = await queryClient.fetchQuery({
          queryKey: QUERY_KEYS.APPLY.STATUS,
          queryFn: getApplicationStatus,
          staleTime: 0,
        });
        if (latestStatus?.isSubmitted) {
          // 이미 제출된 상태 → alert 없이 return (AlreadySubmittedModal이 뜸)
          return;
        }
      } catch {
        // 상태 조회 실패 시 무시하고 일반 에러 처리로 진행
      }

      alert('저장에 실패했습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    goToNextStep(step === 1 ? methods.getValues('part') : undefined);
  };

  const handlePrev = () => {
    goToPrevStep();
  };

  return {
    step,
    methods,
    handleNext,
    handlePrev,
    handleSave,
    showSaveSuccess,
    isConfirmModalOpen,
    openConfirmModal,
    closeConfirmModal,
    handleFinalSubmit,
    handleConfirmSubmit,
  };
};
