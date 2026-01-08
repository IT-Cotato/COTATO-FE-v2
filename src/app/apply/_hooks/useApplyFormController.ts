import {useState} from 'react';
import {useForm, UseFormReturn} from 'react-hook-form';
import {BASIC_INFO_FIELDS} from '@/constants/form/formConfig';

interface UseApplyFormControllerReturn {
  step: number;
  methods: UseFormReturn;
  handleNext: () => Promise<void>;
  handlePrev: () => void;
  handleSave: () => void;
  handleFinalSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

export const useApplyFormController = (): UseApplyFormControllerReturn => {
  const [step, setStep] = useState(1);
  const methods = useForm({mode: 'onChange'});

  const {trigger, handleSubmit, getValues} = methods;

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

    // 3. validation 통과하면 이동
    if (isValid) {
      setStep((prev: number) => prev + 1);
    }
  };

  // 최종 제출: validation 체크 O
  const handleFinalSubmit = handleSubmit((data) => {
    console.log('최종 제출 데이터 (validation 통과):', data);
    // TODO: API 호출 - 최종 제출
  });

  const handlePrev = () => setStep((prev: number) => prev - 1);

  return {
    step,
    methods,
    handleNext,
    handlePrev,
    handleSave,
    handleFinalSubmit,
  };
};
