'use client';

import {useEffect, useRef} from 'react';
import {useSearchParams} from 'next/navigation';
import {useFormContext} from 'react-hook-form';
import {FormTextarea} from '@/components/form/FormTextarea';
import {FormFile} from '@/components/form/FormFile';
import {FullButton} from '@/components/button/FullButton';

import {useGetPartQuestionsQuery} from '@/hooks/queries/useApply.query';
import {useUploadFile} from '@/hooks/mutations/useApply.mutation';
import {PART_TABS} from '@/constants/admin/admin-application-questions';
import {PartType} from '@/schemas/admin/admin-application-questions.schema';
import {Spinner} from '@/components/ui/Spinner';

interface PartQuestionProps {
  onPrev: () => void;
  onNext: () => void;
  onSave: () => void;
  showSaveSuccess: boolean;
}

export const PartQuestion = ({
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

  const partParam = searchParams.get('part');
  const activePart: PartType =
    PART_TABS.find((tab) => tab.value === partParam)?.value || 'PM';

  const activePartLabel = PART_TABS.find(
    (tab) => tab.value === activePart
  )?.label;

  const applicationId = searchParams.get('id')
    ? Number(searchParams.get('id'))
    : null;

  const {data: questionsData, isLoading} =
    useGetPartQuestionsQuery(applicationId);

  const {mutate: uploadFile} = useUploadFile();

  const hasInitializedRef = useRef(false);

  useEffect(() => {
    if (questionsData && !hasInitializedRef.current) {
      questionsData.questionsWithAnswers.forEach((q) => {
        if (q.savedAnswer?.content) {
          setValue(`ans_${q.questionId}`, q.savedAnswer.content);
        }
      });
      if (questionsData.pdfFileKey) {
        setValue('pdfFileKey', questionsData.pdfFileKey);
        const fileName =
          questionsData.pdfFileKey.split('/').pop() || questionsData.pdfFileKey;
        setValue('pdfFileName', fileName);
      }
      if (questionsData.pdfFileUrl) {
        setValue('pdfFileUrl', questionsData.pdfFileUrl);
      }
      hasInitializedRef.current = true;
    }
  }, [questionsData, setValue]);

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
    <div className='flex w-full flex-col gap-[30px]'>
      <div className='flex flex-col gap-7.5'>
        <h3 className='text-h3 text-neutral-600'>
          {activePartLabel} 파트에 관한 질문입니다.
        </h3>

        {isLoading ? (
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
                    maxLength={q.maxByte}
                    currentLength={(watch(`ans_${q.questionId}`) || '').length}
                    placeholder='내용을 입력해주세요'
                    error={errors[`ans_${q.questionId}`]?.message as string}
                    {...register(`ans_${q.questionId}`, {
                      required: '답변을 작성해주세요',
                      maxLength: {
                        value: q.maxByte,
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
                    <FormFile
                      label={`${lastQuestion.sequence}. ${lastQuestion.content}`}
                      placeholder={'파일 업로드하기'}
                      onFilesChange={handleFileChange}
                      value={
                        currentPdfFileName ? [currentPdfFileName] : undefined
                      }
                    />
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
            backgroundColor='neutral-300'
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
