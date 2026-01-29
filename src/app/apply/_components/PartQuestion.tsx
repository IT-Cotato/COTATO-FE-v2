'use client';

import {useEffect, useRef} from 'react';
import {useSearchParams} from 'next/navigation';
import {useFormContext} from 'react-hook-form';
import {FormTextarea} from '@/components/form/FormTextarea';
import {FormFile} from '@/components/form/FormFile';
import { FormLink } from '@/components/form/FormLink';
import {FullButton} from '@/components/button/FullButton';
import {
  useGetPartQuestionsQuery,
  useGetBasicInfoQuery,
} from '@/hooks/queries/useApply.query';
import {useUploadFile} from '@/hooks/mutations/useApply.mutation';
import {PartType} from '@/schemas/admin/admin-application-questions.schema';
import {Spinner} from '@/components/ui/Spinner';
import {StepIndicator} from '@/components/navigation/StepIndicator';
import {PART_TABS} from '@/constants/common/part';

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
  const searchParams = useSearchParams();
  const {
    register,
    watch,
    setValue,
    formState: {errors},
  } = useFormContext();

  const applicationId = searchParams.get('id')
    ? Number(searchParams.get('id'))
    : null;

  const {data: basicInfo, isLoading: isBasicInfoLoading} =
    useGetBasicInfoQuery(applicationId);
  const activePart = basicInfo?.applicationPartType as PartType | undefined;

  const activePartLabel = PART_TABS.find(
    (tab) => tab.value === activePart
  )?.label;

  const {data: questionsData, isLoading: isQuestionsLoading} =
    useGetPartQuestionsQuery(applicationId);

  const {mutate: uploadFile} = useUploadFile();

  const isAllAnswersFilled = (() => {
    if (!questionsData?.questionsWithAnswers) return false;
    const textQuestions = questionsData.questionsWithAnswers.slice(0, -1);
    return textQuestions.every((q) => {
      const answer = watch(`ans_${q.questionId}`);
      return answer && answer.trim().length > 0;
    });
  })();

  const hasInitializedRef = useRef(false);

  useEffect(() => {
    if (questionsData && !hasInitializedRef.current) {
      const responsePart = questionsData.questionsWithAnswers[0]?.partType;
      const isMatchingPart = responsePart === activePart;

      questionsData.questionsWithAnswers.forEach((q) => {
        if (q.savedAnswer?.content) {
          setValue(`ans_${q.questionId}`, q.savedAnswer.content);
        }
      });

      if (isMatchingPart && questionsData.pdfFileKey) {
        setValue('pdfFileKey', questionsData.pdfFileKey);
        const fileName =
          questionsData.pdfFileKey.split('/').pop() || questionsData.pdfFileKey;
        setValue('pdfFileName', fileName);
      }
      if (isMatchingPart && questionsData.pdfFileUrl) {
        setValue('pdfFileUrl', questionsData.pdfFileUrl);
      }
      hasInitializedRef.current = true;
    }
  }, [questionsData, setValue, activePart]);

  const handleFileChange = (files: File[]) => {
    if (files.length === 0) {
      setValue('pdfFileKey', undefined);
      setValue('pdfFileUrl', undefined);
      setValue('pdfFileName', undefined);
      return;
    }

    const file = files[files.length - 1];
    uploadFile(file, {
      onSuccess: ({pdfFileKey, pdfFileUrl}) => {
        setValue('pdfFileKey', pdfFileKey);
        setValue('pdfFileUrl', pdfFileUrl);
        setValue('pdfFileName', file.name);
      },
    });
  };

  return (
    <div className='flex w-full flex-col gap-7.5'>
      <div className='flex flex-col gap-7.5'>
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
                {questionsData.questionsWithAnswers.slice(0, -1).map((q) => (
                  <FormTextarea
                    key={q.questionId}
                    label={`${q.sequence}. ${q.content}`}
                    maxLength={q.maxLength}
                    currentLength={(watch(`ans_${q.questionId}`) || '').length}
                    placeholder='내용을 입력해주세요'
                    error={errors[`ans_${q.questionId}`]?.message as string}
                    {...register(`ans_${q.questionId}`, {
                      required: '답변을 작성해주세요',
                      maxLength: {
                        value: q.maxLength,
                        message: '글자수를 초과했습니다',
                      },
                    })}
                  />
                ))}

                {(() => {
                  const lastQuestion =
                    questionsData.questionsWithAnswers.at(-1);
                  if (!lastQuestion) return null;
                  const currentPdfFileName = watch('pdfFileName') as
                    | string
                    | undefined;
                  return (
                    <div className='flex flex-col gap-2.5'>
                      <label className='text-h5 text-neutral-800'>
                        {lastQuestion.sequence}. {lastQuestion.content}
                      </label>
                      <FormLink />
                      <FormFile
                        placeholder={'파일 업로드하기'}
                        onFilesChange={handleFileChange}
                        value={
                          currentPdfFileName ? [currentPdfFileName] : undefined
                        }
                      />
                    </div>
                  );
                })()}
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

      <div className='flex flex-col gap-[26px]'>
        <div className='flex gap-[26px]'>
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
            disabled={!isAllAnswersFilled}
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
          <p className='text-center text-primary'>저장이 완료되었습니다</p>
        )}
      </div>
    </div>
  );
};
