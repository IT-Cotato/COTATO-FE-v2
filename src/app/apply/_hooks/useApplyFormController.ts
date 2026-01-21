import {useState, useEffect, useRef} from 'react';
import {useForm, UseFormReturn} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
  BasicInfoFormSchema,
  BasicInfoFormData,
  BasicInfoRequest,
  PartQuestionRequest,
  EtcQuestionRequest,
} from '@/schemas/apply/apply-schema';
import {BASIC_INFO_FIELDS, EtcFieldDates} from '@/constants/form/formConfig';
import {useRouter, useSearchParams} from 'next/navigation';
import {useRecruitmentStore} from '@/store/useRecruitmentStore';
import {useSubmissionStore} from '@/store/useSubmissionStore';
import {useQuery} from '@tanstack/react-query';
import {getBasicInfo} from '@/services/api/apply/apply.api';
import {QUERY_KEYS} from '@/constants/query-keys';
import {useGetEtcQuestionsQuery} from '@/hooks/queries/useApplyQuery';
import {
  useSaveBasicInfo,
  useSavePartQuestions,
  useSaveEtcQuestions,
  useSubmitApplication,
} from '@/hooks/mutations/useApply.mutation';

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
  etcDates?: EtcFieldDates;
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

  const hasInitializedRef = useRef(false);

  const {data: basicInfo} = useQuery({
    queryKey: QUERY_KEYS.APPLY.BASIC_INFO(Number(applicationId)),
    queryFn: () => getBasicInfo(Number(applicationId)),
    enabled: !!applicationId && urlStep === 1,
  });

  const {data: etcQuestions} = useGetEtcQuestionsQuery(
    applicationId ? Number(applicationId) : null
  );

  const {mutate: saveBasicInfo} = useSaveBasicInfo(Number(applicationId));
  const {mutate: savePartQuestions} = useSavePartQuestions(
    Number(applicationId)
  );
  const {mutate: saveEtcQuestions} = useSaveEtcQuestions(Number(applicationId));
  const {mutateAsync: submitApplication} = useSubmitApplication(
    Number(applicationId)
  );

  useEffect(() => {
    if (basicInfo && !hasInitializedRef.current) {
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
        part: basicInfo.applicationPartType as BasicInfoFormData['part'],
      };
      reset(transformedData);
      hasInitializedRef.current = true;
    }
  }, [basicInfo, reset]);

  const openConfirmModal = () => setIsConfirmModalOpen(true);
  const closeConfirmModal = () => setIsConfirmModalOpen(false);

  const handleSave = () => {
    if (!applicationId) return;
    const data = getValues();

    if (step === 1) {
      const requestData: BasicInfoRequest = {
        name: data.name,
        gender: data.gender,
        birthDate: data.birthDate,
        phoneNumber: data.contact,
        university: data.school,
        major: data.department,
        completedSemesters: Number(data.completedSemesters),
        isPrevActivity: data.isPrevActivity === 'yes',
        isEnrolled: data.isCollegeStudent === 'enrolled',
        applicationPartType: data.part,
      };
      saveBasicInfo(requestData);
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

      savePartQuestions(requestData);
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
          ? `${etcQuestions?.interviewStartDate ?? ''} ${formData.interviewStartDate}`
          : null,
        formData.interviewEndDate
          ? `${etcQuestions?.interviewEndDate ?? ''} ${formData.interviewEndDate}`
          : null,
      ]
        .filter(Boolean)
        .join(', ');

      const discoveryPath =
        (formData.discovery as EtcQuestionRequest['discoveryPath']) ?? '기타';

      const requestData: EtcQuestionRequest = {
        discoveryPath,
        parallelActivities: formData.otherActivity || '',
        unavailableInterviewTimes,
        sessionAttendanceAgreed: formData.sessionAgree === 'agree',
        mandatoryEventsAgreed: formData.otAgree === 'agree',
        privacyPolicyAgreed: formData.privacyAgree === 'agree',
      };

      saveEtcQuestions(requestData);
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
      handleSave();

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
      handleSave();
      await submitApplication();
      setHasSubmitted(true);
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

  const etcDates: EtcFieldDates | undefined = etcQuestions
    ? {
        interviewStartDate: etcQuestions.interviewStartDate,
        interviewEndDate: etcQuestions.interviewEndDate,
        otDate: etcQuestions.otDate,
      }
    : undefined;

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
    etcDates,
  };
};
