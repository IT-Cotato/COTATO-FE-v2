'use client';

import {useEffect, useRef} from 'react';
import {useSearchParams} from 'next/navigation';
import {useFormContext, Controller} from 'react-hook-form';
import {FormTextarea} from '@repo/ui/components/form/FormTextarea';
import {FullButton} from '@repo/ui/components/buttons/FullButton';
import {
  useGetPartQuestionsQuery,
  useGetBasicInfoQuery,
  useGetFileUrlQuery,
} from '@/hooks/queries/useApply.query';
import {useUploadFile} from '@/hooks/mutations/useApply.mutation';
import {PartType} from '@/schemas/admin/admin-application-questions.schema';
import {ApplyFormData} from '@/schemas/apply/apply-schema';
import {Spinner} from '@repo/ui/components/spinner/Spinner';
import {StepIndicator} from '@/components/navigation/StepIndicator';
import {PART_TABS} from '@/constants/common/part';
import {FormFile} from '@repo/ui/components/form/FormFile';
import {FormLink} from '@repo/ui/components/form/FormLink';

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
    control,
    formState: {errors},
  } = useFormContext<ApplyFormData>();

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

  const {data: pdfFileUrlData} = useGetFileUrlQuery(questionsData?.pdfFileKey);
  const {mutate: uploadFile, isPending: isUploadingFile} = useUploadFile();

  const isAllRequiredAnswersFilled = (() => {
    if (!questionsData?.questionsWithAnswers) return false;
    const textQuestions = questionsData.questionsWithAnswers.slice(0, -1);
    return textQuestions.every((q) => {
      const answer = watch(`ans_${q.questionId}` as any) as string | undefined;
      return answer && answer.trim().length > 0;
    });
  })();

  const hasInitializedRef = useRef(false);
  const previousPartRef = useRef<PartType | undefined>(undefined);

  useEffect(() => {
    register('pdfFileKey');
    register('pdfFileUrl');
    register('pdfFileName');
  }, [register]);

  useEffect(() => {
    if (previousPartRef.current && previousPartRef.current !== activePart) {
      hasInitializedRef.current = false;
      setValue('pdfFileKey', undefined);
      setValue('pdfFileName', undefined);
      setValue('pdfFileUrl', undefined);
    }
    previousPartRef.current = activePart;
  }, [activePart, setValue]);

  useEffect(() => {
    if (questionsData && !hasInitializedRef.current && activePart) {
      const responsePart = questionsData.questionsWithAnswers[0]?.partType;
      const isMatchingPart = responsePart === activePart;

      if (isMatchingPart) {
        questionsData.questionsWithAnswers.forEach((q) => {
          if (q.savedAnswer?.content) {
            setValue(`ans_${q.questionId}` as any, q.savedAnswer.content);
          }
        });

        if (questionsData.pdfFileKey) {
          setValue('pdfFileKey', questionsData.pdfFileKey);
          const fileName =
            questionsData.pdfFileKey.split('/').pop() ||
            questionsData.pdfFileKey;
          setValue('pdfFileName', fileName);
        } else {
          setValue('pdfFileKey', undefined);
          setValue('pdfFileName', undefined);
        }

        // 마지막 질문(포트폴리오 링크)의 답변을 pdfFileUrl에도 설정
        const lastQuestion = questionsData.questionsWithAnswers.at(-1);
        if (lastQuestion?.savedAnswer?.content) {
          setValue('pdfFileUrl', lastQuestion.savedAnswer.content);
        } else {
          setValue('pdfFileUrl', undefined);
        }

        hasInitializedRef.current = true;
      }
    }
  }, [questionsData, setValue, activePart]);

  const handleFileChange = (files: File[]) => {
    if (files.length === 0) {
      setValue('pdfFileKey', undefined);
      setValue('pdfFileName', undefined);
      return;
    }

    const file = files[0];

    uploadFile(file, {
      onSuccess: ({pdfFileKey}) => {
        setValue('pdfFileKey', pdfFileKey);
        setValue('pdfFileName', file.name);
      },
    });
  };

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
                {questionsData.questionsWithAnswers.slice(0, -1).map((q) => (
                  <FormTextarea
                    key={q.questionId}
                    label={`${q.sequence}. ${q.content}`}
                    maxLength={q.maxLength}
                    currentLength={
                      ((watch(`ans_${q.questionId}` as any) as string) || '')
                        .length
                    }
                    placeholder='내용을 입력해주세요'
                    error={
                      (errors as Record<string, any>)[`ans_${q.questionId}`]
                        ?.message as string
                    }
                    required
                    {...register(`ans_${q.questionId}` as any, {
                      validate: (value) => {
                        if (!value || value.trim().length === 0) {
                          return '답변을 작성해주세요';
                        }
                        return true;
                      },
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
                  const currentPdfFileName = watch('pdfFileName');
                  return (
                    <div className='flex flex-col gap-2.5'>
                      <label className='text-h5 text-neutral-800'>
                        {lastQuestion.sequence}. {lastQuestion.content}
                      </label>
                      <Controller
                        control={control}
                        name={`ans_${lastQuestion.questionId}` as any}
                        render={({
                          field: {onChange, value},
                          fieldState: {error},
                        }) => (
                          <FormLink
                            value={value ? [value] : ['']}
                            onChange={(links) => {
                              onChange(links[0]);
                              setValue('pdfFileUrl', links[0] || undefined);
                            }}
                            error={error?.message}
                          />
                        )}
                      />
                      <FormFile
                        placeholder={'파일 업로드하기'}
                        isUploading={isUploadingFile}
                        onFilesChange={handleFileChange}
                        value={
                          currentPdfFileName ? [currentPdfFileName] : undefined
                        }
                        maxCount={1}
                        maxSize={50 * 1024 * 1024}
                      />  
                  <p className='text-body-l text-alert'>
                    * 파트 변경 시 업로드한 파일이 초기화됩니다.
                  </p>
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
            backgroundColor={
              isAllRequiredAnswersFilled ? 'primary' : 'text-disabled'
            }
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
