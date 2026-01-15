import {useState, useEffect} from 'react';
import {useForm, UseFormReturn} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {BasicInfoSchema, BasicInfoFormData} from '@/schemas/apply/apply-schema';
import {BASIC_INFO_FIELDS} from '@/constants/form/formConfig';
import {useRouter, useSearchParams} from 'next/navigation';
import {useRecruitmentStore} from '@/store/useRecruitmentStore';
import {useSubmissionStore} from '@/store/useSubmissionStore';

interface UseApplyFormControllerReturn {
  step: number;
  methods: UseFormReturn<BasicInfoFormData>;
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

  const methods = useForm<BasicInfoFormData>({
    mode: 'onChange',
    resolver: zodResolver(BasicInfoSchema),
  });
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

    let fieldsToValidate: (keyof BasicInfoFormData)[] = [];

    if (step === 1) {
      fieldsToValidate = BASIC_INFO_FIELDS.flatMap((field) =>
        'row' in field && field.row
          ? field.row.map((f) => f.name)
          : [field.name]
      ).filter(Boolean) as (keyof BasicInfoFormData)[];
    } else if (step === 2) {
      const values = getValues();
      fieldsToValidate = Object.keys(values).filter((key) =>
        key.startsWith('ans_')
      ) as (keyof BasicInfoFormData)[];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
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
    } catch {
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
