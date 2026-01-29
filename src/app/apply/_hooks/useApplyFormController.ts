import {useState, useEffect} from 'react';
import {useForm, UseFormReturn} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  BasicInfoFormSchema,
  BasicInfoFormData,
  BasicInfoRequest,
  PartQuestionRequest,
  EtcQuestionRequest,
} from '@/schemas/apply/apply-schema';
import {
  formatDigitsToYYYYMMDD,
  formatDigitsToPhoneNumber,
} from '@/utils/formatter';
import {BASIC_INFO_FIELDS} from '@/constants/form/formConfig';
import {useRouter, useSearchParams} from 'next/navigation';
import {useRecruitmentStore} from '@/store/useRecruitmentStore';
import {
  useGetEtcQuestionsQuery,
  useGetBasicInfoQuery,
} from '@/hooks/queries/useApply.query';
import {
  useSaveBasicInfo,
  useSavePartQuestions,
  useSaveEtcQuestions,
  useSubmitApplication,
} from '@/hooks/mutations/useApply.mutation';
import {useQueryClient} from '@tanstack/react-query';
import {QUERY_KEYS} from '@/constants/query-keys';

interface UseApplyFormControllerReturn {
  step: number;
  methods: UseFormReturn<BasicInfoFormData>;
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
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  useEffect(() => {
    setStep(urlStep);
  }, [urlStep]);

  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const {isRecruiting} = useRecruitmentStore();
  const queryClient = useQueryClient();

  const methods = useForm<BasicInfoFormData>({
    mode: 'onChange',
    resolver: zodResolver(BasicInfoFormSchema),
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
  const {trigger, handleSubmit, getValues} = methods;

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

  const {data: etcQuestions} = useGetEtcQuestionsQuery(
    applicationId ? Number(applicationId) : null
  );

  const {mutateAsync: saveBasicInfo} = useSaveBasicInfo(Number(applicationId));
  const {mutateAsync: savePartQuestions} = useSavePartQuestions(
    Number(applicationId)
  );
  const {mutateAsync: saveEtcQuestions} = useSaveEtcQuestions(
    Number(applicationId)
  );
  const {mutateAsync: submitApplication} = useSubmitApplication(
    Number(applicationId)
  );

  const openConfirmModal = () => setIsConfirmModalOpen(true);
  const closeConfirmModal = () => setIsConfirmModalOpen(false);

  const clearPartQuestionFields = () => {
    const currentValues = getValues();
    Object.keys(currentValues).forEach((key) => {
      if (
        key.startsWith('ans_') ||
        ['pdfFileKey', 'pdfFileUrl', 'pdfFileName'].includes(key)
      ) {
        // @ts-expect-error - Dynamic fields
        methods.unregister(key);
      }
    });
  };

  const handleSave = async () => {
    if (!applicationId) return;
    const data = getValues();

    const showSuccessMessage = () => {
      setShowSaveSuccess(true);
      setTimeout(() => {
        setShowSaveSuccess(false);
      }, 3000);
    };

    try {
      if (step === 1) {
        const requestData: BasicInfoRequest = {
          name: data.name,
          gender: data.gender,
          birthDate: formatDigitsToYYYYMMDD(data.birthDate),
          phoneNumber: formatDigitsToPhoneNumber(data.contact),
          university: data.school,
          major: data.department,
          completedSemesters: Number(data.completedSemesters),
          isPrevActivity: data.isPrevActivity === 'yes',
          isEnrolled: data.isCollegeStudent === 'enrolled',
          applicationPartType: data.part,
        };
        await saveBasicInfo(requestData);

        await queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.APPLY.BASIC_INFO(Number(applicationId)),
        });

        const previousPart = basicInfo?.applicationPartType;
        const currentPart = data.part;

        if (previousPart && previousPart !== currentPart) {
          await queryClient.invalidateQueries({
            queryKey: QUERY_KEYS.APPLY.PART_QUESTIONS(Number(applicationId)),
          });
          clearPartQuestionFields();
        }
      } else if (step === 2) {
        const answersToSave = Object.entries(data)
          .filter(([key]) => key.startsWith('ans_'))
          .map(([key, value]) => ({
            questionId: Number(key.split('_')[1]),
            content: value as string,
          }));

        const formData = data as BasicInfoFormData & {
          pdfFileUrl?: string;
          pdfFileKey?: string;
        };
        const requestData: PartQuestionRequest = {
          answers: answersToSave,
          pdfFileUrl: formData.pdfFileUrl || undefined,
          pdfFileKey: formData.pdfFileKey || undefined,
        };

        await savePartQuestions(requestData);
      } else if (step === 3) {
        const formData = data as BasicInfoFormData & {
          discovery?: string;
          otherActivity?: string;
          interviewStartDate?: string;
          interviewEndDate?: string;
          sessionAgree?: string;
          otAgree?: string;
          privacyAgree?: string;
        };

        const unavailableInterviewTimes = [
          formData.interviewStartDate
            ? `${etcQuestions?.interviewStartDate ?? ''} ${
                formData.interviewStartDate
              }`
            : null,
          formData.interviewEndDate
            ? `${etcQuestions?.interviewEndDate ?? ''} ${formData.interviewEndDate}`
            : null,
        ]
          .filter(Boolean)
          .join(', ');

        const discoveryPath =
          (formData.discovery as EtcQuestionRequest['discoveryPath']) || 'NONE';

        const requestData: EtcQuestionRequest = {
          discoveryPath,
          parallelActivities: formData.otherActivity || '',
          unavailableInterviewTimes,
          sessionAttendanceAgreed: formData.sessionAgree === 'agree',
          mandatoryEventsAgreed: formData.otAgree === 'agree',
          privacyPolicyAgreed: formData.privacyAgree === 'agree',
        };

        await saveEtcQuestions(requestData);
      }
      showSuccessMessage();
    } catch (e) {
      console.error(
        '지원서 저장에 실패했습니다. 잠시 후 다시 시도해주세요.',
        e
      );
    }
  };

  const handleNext = async () => {
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
      await handleSave();
      await submitApplication();
      await queryClient.invalidateQueries({queryKey: QUERY_KEYS.APPLY.STATUS});
      router.push('/?submitted=true');
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
    showSaveSuccess,
  };
};
