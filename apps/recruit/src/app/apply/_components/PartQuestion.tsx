'use client';

import {useFormContext} from 'react-hook-form';
import {FormTextarea} from '@repo/ui/components/form/FormTextarea';
import {FullButton} from '@repo/ui/components/buttons/FullButton';
import {ApplyFormData} from '@/schemas/apply/apply-schema';
import {Spinner} from '@repo/ui/components/spinner/Spinner';
import {StepIndicator} from '@/components/navigation/StepIndicator';
import {PortfolioField} from '@/app/apply/_components/PortfolioField';
import {usePartQuestionForm} from '@/app/apply/_hooks/usePartQuestionForm';

interface PartQuestionProps {
  step: number;
  onPrev: () => void;
  onNext: () => void;
  onSave: () => void;
  showSaveSuccess: boolean;
}

export const PartQuestion = ({
  step,
  onPrev,
  onNext,
  onSave,
  showSaveSuccess,
}: PartQuestionProps) => {
  const {
    register,
    watch,
    formState: {errors},
  } = useFormContext<ApplyFormData>();

  const {
    activePart,
    activePartLabel,
    questionsData,
    textQuestions,
    lastQuestion,
    isQuestionsLoading,
    isBasicInfoLoading,
    isUploadingFile,
    handleFileChange,
  } = usePartQuestionForm();

  const allValues = watch();

  const allTextAnswered = textQuestions.every((q) => {
    const answer = allValues[`ans_${q.questionId}` as keyof ApplyFormData] as
      | string
      | undefined;
    return answer && answer.trim().length > 0;
  });

  const lastAnswered =
    activePart && activePart !== 'PM'
      ? !!(
          allValues[
            `ans_${lastQuestion?.questionId}` as keyof ApplyFormData
          ] as string | undefined
        )?.trim()
      : true;

  const isAllRequiredAnswersFilled = allTextAnswered && lastAnswered;

  return (
    <div className='flex w-full flex-col gap-7.5'>
      <div className='flex flex-col gap-3.5'>
        <h3 className='text-h3 text-primary'>
          {activePartLabel
            ? `${activePartLabel} 파트에 관한 질문입니다.`
            : '파트별 질문을 불러오는 중...'}
        </h3>

        <div className='flex justify-center py-4'>
          <StepIndicator currentStep={step} totalSteps={3} />
        </div>

        {isQuestionsLoading || isBasicInfoLoading || !activePart ? (
          <div className='flex h-full w-full items-center justify-center'>
            <Spinner />
          </div>
        ) : (
          <>
            {questionsData?.questionsWithAnswers &&
            questionsData.questionsWithAnswers.length > 0 ? (
              <>
                {textQuestions.map((q) => (
                  <FormTextarea
                    key={q.questionId}
                    label={`${q.sequence}. ${q.content}`}
                    maxLength={q.maxLength}
                    currentLength={
                      (
                        (allValues[
                          `ans_${q.questionId}` as keyof ApplyFormData
                        ] as string) || ''
                      ).length
                    }
                    placeholder='내용을 입력해주세요'
                    error={
                      (errors as Record<string, any>)[`ans_${q.questionId}`]
                        ?.message as string
                    }
                    required
                    {...register(`ans_${q.questionId}` as any, {
                      validate: (value) =>
                        (value && value.trim().length > 0) ||
                        '답변을 작성해주세요',
                      maxLength: {
                        value: q.maxLength,
                        message: '글자수를 초과했습니다',
                      },
                    })}
                  />
                ))}

                {lastQuestion && activePart && (
                  <PortfolioField
                    questionId={lastQuestion.questionId}
                    sequence={lastQuestion.sequence}
                    content={lastQuestion.content}
                    activePart={activePart}
                    isUploadingFile={isUploadingFile}
                    pdfFileName={allValues['pdfFileName']}
                    onFileChange={handleFileChange}
                  />
                )}
              </>
            ) : (
              <div className='flex h-full w-full items-center justify-center'>
                <p className='text-b1 text-neutral-400'>
                  해당 파트의 질문이 없습니다.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      <div className='flex flex-col gap-6.5'>
        <div className='flex gap-6.5'>
          <FullButton
            label='이전'
            variant='primary'
            backgroundColor='neutral-600'
            labelTypo='h4'
            onClick={onPrev}
            type='button'
          />
          <FullButton
            label='다음'
            variant='primary'
            labelTypo='h4'
            type='button'
            onClick={onNext}
            backgroundColor={isAllRequiredAnswersFilled ? 'primary' : 'text-disabled'}
          />
        </div>

        <FullButton
          label='저장하기'
          variant='outline'
          textColor='primary'
          type='button'
          labelTypo='h4'
          onClick={onSave}
        />
        {showSaveSuccess && (
          <p className='text-primary text-center'>저장이 완료되었습니다</p>
        )}
      </div>
    </div>
  );
};
