import {useState, useRef} from 'react';
import {UseFormReturn} from 'react-hook-form';
import {useQueryClient} from '@tanstack/react-query';
import {
  ApplyFormValues,
  BasicInfoRequest,
  PartQuestionRequest,
  EtcQuestionRequest,
} from '@/schemas/apply/apply-schema';
import {
  useSaveBasicInfo,
  useSavePartQuestions,
  useSaveEtcQuestions,
} from '@/hooks/mutations/useApply.mutation';
import {
  formatDigitsToYYYYMMDD,
  formatDigitsToPhoneNumber,
} from '@/utils/formatter';
import {QUERY_KEYS} from '@/constants/query-keys';

interface UseApplySaveReturn {
  handleSave: (
    step: number,
    methods: UseFormReturn<ApplyFormValues>,
    showToast?: boolean
  ) => Promise<boolean>;
  showSaveSuccess: boolean;
  isSaving: boolean;
}

export const useApplySave = (
  applicationId: number | null,
  basicInfoPart?: string
): UseApplySaveReturn => {
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const savingRef = useRef(false);
  const queryClient = useQueryClient();

  const {mutateAsync: saveBasicInfo} = useSaveBasicInfo(applicationId);
  const {mutateAsync: savePartQuestions} = useSavePartQuestions(applicationId);
  const {mutateAsync: saveEtcQuestions} = useSaveEtcQuestions(applicationId);

  const showSuccessMessage = () => {
    setShowSaveSuccess(true);
    setTimeout(() => {
      setShowSaveSuccess(false);
    }, 3000);
  };

  const clearPartQuestionFields = (methods: UseFormReturn<ApplyFormValues>) => {
    const currentValues = methods.getValues();
    Object.keys(currentValues).forEach((key) => {
      if (key.startsWith('ans_')) {
        methods.unregister(key as `ans_${string}`);
      }
    });
    // PDF 파일 필드는 명시적으로 undefined로 설정
    methods.setValue('pdfFileKey', undefined);
    methods.setValue('pdfFileUrl', undefined);
    methods.setValue('pdfFileName', undefined);
  };

  const handleSave = async (
    step: number,
    methods: UseFormReturn<ApplyFormValues>,
    showToast: boolean = true
  ) => {
    if (applicationId === null) {
      const errorMessage = '지원서 ID가 없습니다. 저장 작업을 중단합니다.';
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    if (savingRef.current) return false;

    const data = methods.getValues();

    savingRef.current = true;
    setIsSaving(true);
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

        // 저장 후 새 데이터를 즉시 가져오기
        await queryClient.refetchQueries({
          queryKey: QUERY_KEYS.APPLY.BASIC_INFO(applicationId),
        });

        const previousPart = basicInfoPart;
        const currentPart = data.part;

        if (previousPart && previousPart !== currentPart) {
          clearPartQuestionFields(methods);

          // 서버에 저장된 PDF 및 답변 데이터도 초기화
          await savePartQuestions({
            answers: [],
            pdfFileKey: null,
            pdfFileUrl: null,
          });
        }
      } else if (step === 2) {
        const answersToSave = Object.entries(data)
          .filter(([key]) => key.startsWith('ans_'))
          .map(([key, value]) => ({
            questionId: Number(key.split('_')[1]),
            content: value as string,
          }));

        const requestData: PartQuestionRequest = {
          answers: answersToSave,
          pdfFileUrl: data.pdfFileUrl || undefined,
          pdfFileKey: data.pdfFileKey || undefined,
        };

        await savePartQuestions(requestData);

        await queryClient.refetchQueries({
          queryKey: QUERY_KEYS.APPLY.PART_QUESTIONS(applicationId),
        });
      } else if (step === 3) {
        const discoveryPath =
          (data.discovery as EtcQuestionRequest['discoveryPath']) || 'NONE';

        const requestData: EtcQuestionRequest = {
          discoveryPath,
          parallelActivities: data.otherActivity || '',
          unavailableInterviewTimes: data.unavailableInterviewTimes || '',
          sessionAttendanceAgreed: data.sessionAgree === 'agree',
          mandatoryEventsAgreed: data.otAgree === 'agree',
          privacyPolicyAgreed: data.privacyAgree === 'agree',
        };

        await saveEtcQuestions(requestData);
      }
      if (showToast) {
        showSuccessMessage();
      }
      return true;
    } catch (e) {
      console.error(
        '지원서 저장에 실패했습니다. 잠시 후 다시 시도해주세요.',
        e
      );
      throw e;
    } finally {
      savingRef.current = false;
      setIsSaving(false);
    }
  };

  return {handleSave, showSaveSuccess, isSaving};
};
