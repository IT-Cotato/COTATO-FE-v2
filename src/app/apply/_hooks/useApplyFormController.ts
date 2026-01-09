import {useState} from 'react';
import {useForm, UseFormReturn} from 'react-hook-form';
import {BASIC_INFO_FIELDS} from '@/constants/form/formConfig';
import {useRouter} from 'next/navigation';

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
  isSubmissionCompleteModalOpen: boolean;
  openSubmissionCompleteModal: () => void;
  closeSubmissionCompleteModal: () => void;
  isSubmissionIncompleteModalOpen: boolean;
  openSubmissionIncompleteModal: () => void;
  closeSubmissionIncompleteModal: () => void;
  handleConfirmSubmit: () => void;
}

export const useApplyFormController = (): UseApplyFormControllerReturn => {
  const [step, setStep] = useState(1);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isSubmissionCompleteModalOpen, setIsSubmissionCompleteModalOpen] =
    useState(false);
  const [isSubmissionIncompleteModalOpen, setIsSubmissionIncompleteModalOpen] =
    useState(false);

  const router = useRouter();
  const methods = useForm({mode: 'onChange'});

  const {trigger, handleSubmit, getValues} = methods;

  const openConfirmModal = () => setIsConfirmModalOpen(true);
  const closeConfirmModal = () => setIsConfirmModalOpen(false);
  const openSubmissionCompleteModal = () =>
    setIsSubmissionCompleteModalOpen(true);
  const closeSubmissionCompleteModal = () =>
    setIsSubmissionCompleteModalOpen(false);
  const openSubmissionIncompleteModal = () =>
    setIsSubmissionIncompleteModalOpen(true);
  const closeSubmissionIncompleteModal = () =>
    setIsSubmissionIncompleteModalOpen(false);

  // 저장하기: validation 체크 X, 그냥 현재 값만 저장
  const handleSave = () => {
    const data = getValues();
    console.log('저장된 데이터:', data);
    // TODO: API 호출 - 임시저장
  };

  // 다음 버튼: 저장 먼저 → validation 체크 → 통과하면 이동
  const handleNext = async () => {
    // 1. 먼저 저장 (무조건 실행)
    handleSave();

    // 2. validation 체크
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
      setStep((prev: number) => prev + 1);
    }
  };

  const handleConfirmSubmit = async () => {
    closeConfirmModal();

    try {
      const isSuccess = await new Promise<boolean>((resolve) => {
        setTimeout(() => {
          resolve(Math.random() > 0.5);
        }, 1000);
      });

      if (isSuccess) {
        const data = getValues();
        console.log('최종 제출 데이터 (validation 통과):', data);
        // TODO: API 호출 - 최종 제출
        sessionStorage.setItem('submissionComplete', 'true');
        router.push('/');
      } else {
        throw new Error('Submission failed');
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      openSubmissionIncompleteModal();
    }
  };

  const handleFinalSubmit = handleSubmit(() => {
    openConfirmModal();
  });

  const handlePrev = () => setStep((prev: number) => prev - 1);

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
    isSubmissionCompleteModalOpen,
    openSubmissionCompleteModal,
    closeSubmissionCompleteModal,
    isSubmissionIncompleteModalOpen,
    openSubmissionIncompleteModal,
    closeSubmissionIncompleteModal,
    handleConfirmSubmit,
  };
};
