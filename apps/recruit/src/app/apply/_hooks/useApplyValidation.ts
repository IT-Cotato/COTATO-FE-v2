import {UseFormReturn} from 'react-hook-form';
import {ApplyFormData} from '@/schemas/apply/apply-schema';
import {BASIC_INFO_FIELDS} from '@/constants/form/formConfig';

const STEP3_REQUIRED_FIELDS = [
  'discovery',
  'sessionAgree',
  'otAgree',
  'privacyAgree',
] as const;

/**
 * Step 1 검증: 기본 정보
 * zodResolver 기반 trigger 검증
 */
const validateStep1 = async (
  methods: UseFormReturn<ApplyFormData>
): Promise<boolean> => {
  const fieldsToValidate = BASIC_INFO_FIELDS.flatMap((field) =>
    'row' in field && field.row
      ? field.row.map((f) => String(f.name))
      : [String(field.name)]
  ).filter(Boolean) as any;

  return methods.trigger(fieldsToValidate);
};

/**
 * Step 2 검증: 파트별 질문
 * 동적 ans_* 필드는 스키마에 정의 불가 → 수동 검증
 */
const validateStep2 = (
  methods: UseFormReturn<ApplyFormData>,
  questions: Array<{questionId: number; content: string}>
): boolean => {
  const allValues = methods.getValues();
  const invalidFields: string[] = [];

  const textQuestions = questions.slice(0, -1);

  textQuestions.forEach((q) => {
    const fieldName = `ans_${q.questionId}`;
    const value = allValues[fieldName as keyof ApplyFormData] as
      | string
      | undefined;

    if (!value || value.trim().length === 0) {
      invalidFields.push(fieldName);
      methods.setError(fieldName as any, {
        type: 'manual',
        message: '답변을 작성해주세요',
      });
    }
  });

  return invalidFields.length === 0;
};

/**
 * Step 3 검증: 기타 질문
 * zodResolver 기반 trigger 검증
 */
const validateStep3 = async (
  methods: UseFormReturn<ApplyFormData>
): Promise<boolean> => {
  return methods.trigger([...STEP3_REQUIRED_FIELDS]);
};

/**
 * Step에 따라 적절한 검증 함수를 실행
 */
const validateStep = async (
  step: number,
  methods: UseFormReturn<ApplyFormData>,
  partQuestionsData?: {
    questionsWithAnswers: Array<{questionId: number; content: string}>;
  }
): Promise<boolean> => {
  if (step === 1) {
    return validateStep1(methods);
  } else if (step === 2) {
    if (!partQuestionsData?.questionsWithAnswers) {
      return false;
    }
    return validateStep2(methods, partQuestionsData.questionsWithAnswers);
  } else if (step === 3) {
    return validateStep3(methods);
  }
  return true;
};

export const useApplyValidation = () => {
  return {
    validateStep,
    validateStep1,
    validateStep2,
    validateStep3,
  };
};
