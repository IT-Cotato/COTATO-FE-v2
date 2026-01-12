import {useState, useEffect} from 'react';
import {useForm, UseFormReturn} from 'react-hook-form';
import {BASIC_INFO_FIELDS} from '@/constants/form/formConfig';
import {useRouter, useSearchParams} from 'next/navigation';
import {useRecruitmentStore} from '@/store/useRecruitmentStore';
import {useSubmissionStore} from '@/store/useSubmissionStore';

interface UseApplyFormControllerReturn {
  step: number;
  methods: UseFormReturn;
  handleNext: () => Promise<void>;
  handlePrev: () => void;
  handleSave: () => void;
  handleFinalSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isConfirmModalOpen: boolean;
  openConfirmModal: () => void;
  closeConfirmModal: () => void;
  handleConfirmSubmit: () => void;
}

export const useApplyFormController = (): UseApplyFormControllerReturn => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL의 step 읽기 (기본값: 1)
  const urlStep = parseInt(searchParams.get('step') || '1');
  const [step, setStep] = useState(urlStep);

  // URL과 로컬 step 동기화
  useEffect(() => {
    setStep(urlStep);
  }, [urlStep]);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const {isRecruiting} = useRecruitmentStore();
  const setHasSubmitted = useSubmissionStore((state) => state.setHasSubmitted);
  const methods = useForm({mode: 'onChange'});

  const {trigger, handleSubmit, getValues} = methods;

  const openConfirmModal = () => setIsConfirmModalOpen(true);
  const closeConfirmModal = () => setIsConfirmModalOpen(false);

  const handleSave = () => {
    const data = getValues();
    console.log('저장된 데이터:', data);
    // TODO: API 호출 - 임시저장
  };

  const handleNext = async () => {
    handleSave();

    let fieldsToValidate: string[] = [];

    if (step === 1) {
      fieldsToValidate = BASIC_INFO_FIELDS.flatMap((field) =>
        'row' in field && field.row
          ? field.row.map((f) => f.name)
          : [field.name]
      ).filter(Boolean) as string[];
    } else if (step === 2) {
      const values = getValues();
      fieldsToValidate = Object.keys(values).filter((key) =>
        key.startsWith('ans_')
      );
    }

    const isValid = await trigger(fieldsToValidate);

    if (isValid) {
      const nextStep = step + 1;

      if (step === 1) {
        // step 1 → 2: part 포함
        const part = getValues('part');
        router.push(`/apply?part=${part}&step=${nextStep}`);
      } else if (step === 2) {
        // step 2 → 3: part 유지
        const part = searchParams.get('part');
        router.push(`/apply?part=${part}&step=${nextStep}`);
      }
    }
  };

  const handlePrev = () => {
    const prevStep = step - 1;

    if (step === 2) {
      // step 2 → 1: part 제거
      router.push(`/apply?step=${prevStep}`);
    } else if (step === 3) {
      // step 3 → 2: part 유지
      const part = searchParams.get('part');
      router.push(`/apply?part=${part}&step=${prevStep}`);
    }
  };

  const handleConfirmSubmit = async () => {
    closeConfirmModal();

    try {
      // TODO: 실제 API 호출로 교체
      const isSuccess = await new Promise<boolean>((resolve) => {
        setTimeout(() => resolve(Math.random() > 0.5), 1000);
      });

      if (isSuccess) {
        const data = getValues();
        console.log('최종 제출 데이터:', data);
        setHasSubmitted(true);
        router.push('/?submitted=true');
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      router.push('/?submitted=false');
    }
  };

  const handleFinalSubmit = handleSubmit(() => {
    if (isRecruiting) {
      openConfirmModal();
    } else {
      router.push('/?submitted=false');
    }
  });

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
  };
};
