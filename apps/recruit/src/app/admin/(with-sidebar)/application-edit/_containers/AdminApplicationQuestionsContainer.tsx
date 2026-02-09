'use client';

import {ApplicationQuestionsEdit} from '@/app/admin/(with-sidebar)/application-edit/_components/questions/ApplicationQuestionsEdit';
import {ApplicationQuestionsView} from '@/app/admin/(with-sidebar)/application-edit/_components/questions/ApplicationQuestionsView';
import {AdminApplicationQuestionsTabContainer} from '@/app/admin/(with-sidebar)/application-edit/_containers/AdminApplicationQuestionsTabContainer';
import {Button} from '@repo/ui/components/buttons/Button';
import {Spinner} from '@/components/ui/Spinner';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';
import {useAdminApplicationQuestionsMutation} from '@/hooks/mutations/useAdminApplicationQuestions.mutation';
import {useAdminApplicationQuestionsQuery} from '@/hooks/queries/useAdminApplicationQuestions.query';
import {
  ApplicationQuestionsType,
  PartType,
} from '@/schemas/admin/admin-application-questions.schema';
import {useEffect, useState} from 'react';

interface AdminApplicationQuestionsContainerProps {
  generationId: number;
  questionType: PartType;
}

export const AdminApplicationQuestionsContainer = ({
  generationId,
  questionType,
}: AdminApplicationQuestionsContainerProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [draftQuestions, setDraftQuestions] = useState<
    ApplicationQuestionsType[]
  >([]);
  const [isFormValid, setIsFormValid] = useState<boolean>(true);

  const {data, isLoading} = useAdminApplicationQuestionsQuery({
    generationId,
    questionType,
  });
  const questions = data?.data;

  const {
    mutateAsync: saveQuestions,
    isPending,
    isError,
    error,
  } = useAdminApplicationQuestionsMutation();

  useEffect(() => {
    if (isError) {
      alert(error.message);
    }
  }, [isError, error]);

  const handleEditStart = () => {
    if (!questions) return;
    setDraftQuestions(questions);
    setIsEditing(true);
  };

  const handleSave = async () => {
    await saveQuestions({
      generationId,
      questionType,
      questions: draftQuestions,
    });

    alert('지원서 질문이 저장되었습니다.');
    setIsEditing(false);
  };

  const handleCancel = () => {
    if (questions) {
      setDraftQuestions(questions);
    }
    setIsEditing(false);
  };

  const isEmpty = !questions || questions.length === 0;

  return (
    <form
      aria-labelledby='questions-form-title'
      aria-busy={isPending}
      className='flex flex-col gap-6'
      onSubmit={(e) => e.preventDefault()}>
      <h2 id='questions-form-title' className='sr-only'>
        지원서 질문 관리
      </h2>
      <div className='flex items-center justify-end'>
        {isEditing ? (
          <div className='flex flex-row items-end gap-2.25'>
            {!isFormValid && (
              <span role='alert' className='text-body-m text-alert mr-1.5'>
                모든 필드를 작성해 주세요.
              </span>
            )}

            <Button
              type='button'
              label='저장'
              labelTypo='body_l'
              borderRadius={5}
              backgroundColor='alert'
              textColor='neutral-50'
              width={64}
              height={36}
              disabled={!isFormValid || isPending}
              onClick={handleSave}
            />

            <Button
              type='button'
              variant='outline'
              onClick={handleCancel}
              label='취소'
              labelTypo='body_l'
              borderRadius={5}
              backgroundColor='white'
              textColor='neutral-400'
              width={64}
              height={36}
            />
          </div>
        ) : (
          <Button
            type='button'
            label={isEditing ? '편집 중' : '수정'}
            labelTypo='body_l'
            borderRadius={5}
            backgroundColor='secondary'
            textColor='neutral-50'
            width={145}
            height={36}
            onClick={handleEditStart}
          />
        )}
      </div>
      <div className='flex flex-col gap-11.75 rounded-[10px] border border-neutral-300 px-6 py-5'>
        <SuspenseWrapper>
          <AdminApplicationQuestionsTabContainer />
        </SuspenseWrapper>
        <div className='flex flex-col gap-7.5'>
          {isLoading ? (
            <div className='flex items-center justify-center py-20'>
              <Spinner />
            </div>
          ) : isEditing ? (
            <ApplicationQuestionsEdit
              questions={draftQuestions}
              onChange={setDraftQuestions}
              onValidChange={setIsFormValid}
            />
          ) : isEmpty ? (
            <div className='flex flex-col items-center justify-center gap-4 py-20'>
              <p className='text-body-m text-neutral-500'>
                아직 등록된 지원서 질문이 없습니다.
              </p>
            </div>
          ) : (
            <ApplicationQuestionsView data={questions} />
          )}
        </div>
      </div>
    </form>
  );
};
