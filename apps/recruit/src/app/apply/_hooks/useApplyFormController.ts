import {useState, useEffect} from 'react';
import {useForm, UseFormReturn} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  ApplyFormSchema,
  ApplyFormData,
} from '@/schemas/apply/apply-schema';
import {useRouter, useSearchParams} from 'next/navigation';
import {useRecruitmentStore} from '@/store/useRecruitmentStore';
import {
  useGetEtcQuestionsQuery,
  useGetBasicInfoQuery,
  useGetPartQuestionsQuery,
} from '@/hooks/queries/useApply.query';
import {useSubmitApplication} from '@/hooks/mutations/useApply.mutation';
import {useQueryClient} from '@tanstack/react-query';
import {QUERY_KEYS} from '@/constants/query-keys';
import {getRecruitmentStatus} from '@/services/api/recruitment/recruitment-status.api';
import {ROUTES} from '@/constants/routes';
import {useApplyValidation} from './useApplyValidation';
import {useApplySave} from './useApplySave';

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
  const router = useRouter();

  const applicationId = searchParams.get('id');
  const urlStep = parseInt(searchParams.get('step') || '1');
  const [step, setStep] = useState(urlStep);

  useEffect(() => {
    setStep(urlStep);
  }, [urlStep]);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const {isRecruiting} = useRecruitmentStore();
  const queryClient = useQueryClient();

  const methods = useForm<ApplyFormData>({
    mode: 'onChange',
    resolver: zodResolver(ApplyFormSchema),
    defaultValues: {
      name: '',
      gender: undefined,
      contact: '',
      birthDate: '',
      school: '',
      isCollegeStudent: undefined,
      department: '',
      completedSemesters: undefined,
      isPrevActivity: undefined,
      part: undefined,
    },
  });
  const {getValues} = methods;

  // 서버에 저장된 파트 정보 조회
  const {data: basicInfo} = useGetBasicInfoQuery(
    applicationId ? Number(applicationId) : null
  );

  useEffect(() => {
    const urlPart = searchParams.get('part');
    const savedPart = basicInfo?.applicationPartType;

    // step 1: part 파라미터가 있으면 제거
    if (step === 1 && urlPart) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete('part');
      router.replace(`/apply?${newParams.toString()}`);
      return;
    }

    // step 2, 3: 서버 저장 파트와 URL이 다르면 동기화
    if ((step === 2 || step === 3) && savedPart && urlPart !== savedPart) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set('part', savedPart);
      router.replace(`/apply?${newParams.toString()}`);
    }
  }, [step, searchParams, basicInfo?.applicationPartType, router]);

  useGetEtcQuestionsQuery(applicationId ? Number(applicationId) : null);

  const {data: partQuestionsData} = useGetPartQuestionsQuery(
    applicationId ? Number(applicationId) : null
  );

  const {mutateAsync: submitApplication} = useSubmitApplication(
    Number(applicationId)
  );

  // 저장 로직 훅
  const {handleSave: saveForm, showSaveSuccess} = useApplySave(
    Number(applicationId),
    basicInfo?.applicationPartType
  );

  // 검증 로직 훅
  const {validateStep} = useApplyValidation();

  const openConfirmModal = () => setIsConfirmModalOpen(true);
  const closeConfirmModal = () => setIsConfirmModalOpen(false);

  const ensureRecruitmentIsActive = async () => {
    try {
      const latest = await queryClient.fetchQuery({
        queryKey: [QUERY_KEYS.RECRUITMENT_STATUS],
        queryFn: getRecruitmentStatus,
        staleTime: 0, // 항상 서버에서 최신 데이터 가져오기
      });

      if (!latest.data.isActive) {
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

  const handleSave = async () => {
    if (!applicationId) return;
    await saveForm(step, methods);
  };

  const handleNext = async () => {
    const isValid = await validateStep(step, methods, partQuestionsData);

    if (isValid) {
      await handleSave();

      const params = new URLSearchParams(searchParams.toString());
      params.set('step', String(step + 1));

      if (step === 1) {
        // step 1 → 2: part 포함
        params.set('part', getValues('part'));
      }

      router.push(`/apply?${params.toString()}`);
    }
  };

  const handlePrev = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('step', String(step - 1));

    if (step === 2) {
      params.delete('part');
    }

    router.push(`/apply?${params.toString()}`);
  };

  const handleConfirmSubmit = async () => {
    closeConfirmModal();

    try {
      const ok = await ensureRecruitmentIsActive();
      if (!ok) return;

      await handleSave();
      await submitApplication();
      await queryClient.invalidateQueries({queryKey: QUERY_KEYS.APPLY.STATUS});
      router.push('/?submitted=true');
    } catch {
      router.push('/?submitted=false');
    }
  };

  /**
   * 최종 제출은 step 이동 과정에서 이미 각 step별 validation을 거치므로
   * 여기서는 zodResolver 전체 검증을 타지 않게 처리합니다.
   * (검증 실패 시 아무 반응 없이 submit이 막혀 "버튼이 안 눌리는" UX가 발생할 수 있음)
   */
  const handleFinalSubmit = async (e?: React.BaseSyntheticEvent) => {
    e?.preventDefault();

    // Step 3 필수 필드 검증
    const isValid = await validateStep(3, methods);

    if (!isValid) {
      return;
    }

    const ok = await ensureRecruitmentIsActive();
    if (!ok) return;
    openConfirmModal();
  };

  return {
    step,
    methods,
    handleNext,
    handlePrev,
    handleSave,
    handleFinalSubmit,
    isConfirmModalOpen,
    openConfirmModal,
    closeConfirmModal,
    handleConfirmSubmit,
    showSaveSuccess,
  };
};
