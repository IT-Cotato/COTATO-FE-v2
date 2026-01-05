'use client';

import {useState, useEffect} from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import {StepIndicator} from '@/components/navigation/StepIndicator';
import {BASIC_INFO_FIELDS} from '@/constants/form/formConfig';
import {BasicInfo} from './_components/BasicInfo';
import {PartQuestion} from './_components/PartQuestion';
import {AdditionalInfo} from './_components/AdditionalInfo';

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const methods = useForm({mode: 'onChange'});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  // 저장하기: validation 체크 X, 그냥 현재 값만 저장
  const handleSave = () => {
    const data = methods.getValues(); // validation 없이 값만 가져옴
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
      );
    } else if (step === 2) {
      const values = methods.getValues();
      fieldsToValidate = Object.keys(values).filter((key) =>
        key.startsWith('ans_')
      );
    }

    const isValid = await methods.trigger(fieldsToValidate);

    // 3. validation 통과하면 이동
    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  // 최종 제출: validation 체크 O
  const handleFinalSubmit = methods.handleSubmit((data) => {
    console.log('최종 제출 데이터 (validation 통과):', data);
    // TODO: API 호출 - 최종 제출
  });

  const handlePrev = () => setStep((prev) => prev - 1);

  return (
    <div className='flex w-full justify-center'>
      <div className='flex w-full max-w-[1196px] flex-col gap-[125px] py-20'>
        <h1 className='text-h2 font-bold text-neutral-800'>
          {step === 1 && '기본 인적사항'}
          {step === 2 && '파트별 질문'}
          {step === 3 && '기타 질문'}
        </h1>

        <div className='flex w-full flex-col gap-[81px]'>
          <div className='flex justify-center'>
            <StepIndicator currentStep={step} totalSteps={3} />
          </div>

          <FormProvider {...methods}>
            <form onSubmit={handleFinalSubmit}>
              {step === 1 && (
                <BasicInfo onNext={handleNext} onSave={handleSave} />
              )}
              {step === 2 && (
                <PartQuestion
                  onPrev={handlePrev}
                  onNext={handleNext}
                  onSave={handleSave}
                />
              )}
              {step === 3 && (
                <AdditionalInfo onPrev={handlePrev} onSave={handleSave} />
              )}
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
