import {useState, useEffect} from 'react';
import {useForm, UseFormReturn} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  BasicInfoFormSchema,
  BasicInfoFormData,
} from '@/schemas/apply/apply-schema';
import {BASIC_INFO_FIELDS} from '@/constants/form/formConfig';
import {useRouter, useSearchParams} from 'next/navigation';
import {useRecruitmentStore} from '@/store/useRecruitmentStore';
import {useSubmissionStore} from '@/store/useSubmissionStore';
import {useQuery} from '@tanstack/react-query';
import {getBasicInfo} from '@/services/api/apply/apply.api';
import {QUERY_KEYS} from '@/constants/query-keys';

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

  const applicationId = searchParams.get('id');
  const urlStep = parseInt(searchParams.get('step') || '1');
  const [step, setStep] = useState(urlStep);

  useEffect(() => {
    setStep(urlStep);
  }, [urlStep]);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const {isRecruiting} = useRecruitmentStore();
  const setHasSubmitted = useSubmissionStore((state) => state.setHasSubmitted);

  const methods = useForm<BasicInfoFormData>({
    mode: 'onChange',
    resolver: zodResolver(BasicInfoFormSchema),
  });
  const {trigger, handleSubmit, getValues, reset} = methods;

  const {data: basicInfo} = useQuery({
    queryKey: QUERY_KEYS.APPLY.BASIC_INFO(applicationId!),
    queryFn: () => getBasicInfo(Number(applicationId)),
    enabled: !!applicationId && urlStep === 1,
  });

  useEffect(() => {
    if (basicInfo) {
      const transformedData = {
        name: basicInfo.name,
        gender: basicInfo.gender,
        contact: basicInfo.phoneNumber,
        birthDate: basicInfo.birthDate,
        school: basicInfo.university,
        isCollegeStudent: (basicInfo.isEnrolled
          ? 'enrolled'
          : 'other') as BasicInfoFormData['isCollegeStudent'],
        department: basicInfo.major,
        completedSemesters: String(
          basicInfo.completedSemesters
        ) as BasicInfoFormData['completedSemesters'],
        isPrevActivity: (basicInfo.isPrevActivity
          ? 'yes'
          : 'no') as BasicInfoFormData['isPrevActivity'],
        part: basicInfo.applicationPartType,
      };
      reset(transformedData);
    }
  }, [basicInfo, reset]);

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
