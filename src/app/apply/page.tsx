'use client';

import {useState} from 'react';
import {useForm, FormProvider} from 'react-hook-form';
import {StepIndicator} from '@/components/navigation/StepIndicator';
import {BasicInfo} from './_components/BasicInfo';
import {PartQuestion} from './_components/PartQuestion';
import {AdditionalInfo} from './_components/AdditionalInfo';

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const methods = useForm({mode: 'onChange'});

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);
  const handleSave = () => {
    const data = methods.getValues();
    console.log('저장된 데이터:', data);
  };
  const handleSubmit = () => {
    const data = methods.getValues();
    console.log('제출된 데이터:', data);
  };

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
            <form onSubmit={methods.handleSubmit(handleSave)}>
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
                <AdditionalInfo
                  onPrev={handlePrev}
                  onSave={handleSave}
                  onSubmit={handleSubmit}
                />
              )}
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
