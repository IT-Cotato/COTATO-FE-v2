import {useEffect, useRef} from 'react';
import {useSearchParams} from 'next/navigation';
import {useFormContext} from 'react-hook-form';
import {
  useGetPartQuestionsQuery,
  useGetBasicInfoQuery,
  useGetFileUrlQuery,
} from '@/hooks/queries/useApply.query';
import {useUploadFile} from '@/hooks/mutations/useApply.mutation';
import {PartType} from '@/schemas/admin/admin-application-questions.schema';
import {ApplyFormData} from '@/schemas/apply/apply-schema';
import {PART_TABS} from '@/constants/common/part';

export const usePartQuestionForm = () => {
  const {register, setValue} = useFormContext<ApplyFormData>();
  const searchParams = useSearchParams();

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

  const textQuestions =
    questionsData?.questionsWithAnswers?.slice(0, -1) ?? [];
  const lastQuestion = questionsData?.questionsWithAnswers?.at(-1);

  const hasInitializedRef = useRef(false);
  const previousPartRef = useRef<PartType | undefined>(undefined);

  // 숨겨진 PDF 필드 등록
  useEffect(() => {
    register('pdfFileKey');
    register('pdfFileUrl');
    register('pdfFileName');
  }, [register]);

  // 파트 변경 시 필드 초기화
  useEffect(() => {
    if (previousPartRef.current && previousPartRef.current !== activePart) {
      hasInitializedRef.current = false;
      setValue('pdfFileKey', undefined);
      setValue('pdfFileName', undefined);
      setValue('pdfFileUrl', undefined);
    }
    previousPartRef.current = activePart;
  }, [activePart, setValue]);

  // 서버 데이터로 폼 초기화
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

        if (lastQuestion?.savedAnswer?.content) {
          setValue('pdfFileUrl', lastQuestion.savedAnswer.content);
        } else {
          setValue('pdfFileUrl', undefined);
        }

        hasInitializedRef.current = true;
      }
    }
  }, [questionsData, setValue, activePart, lastQuestion]);

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

  return {
    activePart,
    activePartLabel,
    questionsData,
    textQuestions,
    lastQuestion,
    isQuestionsLoading,
    isBasicInfoLoading,
    isUploadingFile,
    pdfFileUrlData,
    handleFileChange,
  };
};
