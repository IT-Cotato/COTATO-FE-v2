'use client';

import {FullButton} from '@repo/ui/components/buttons/FullButton';
import {ApplicationQuestionsType} from '@/schemas/admin/admin-application-questions.schema';
import {useEffect} from 'react';
import {AdminApplicationQuestionsEditItem} from '@/app/admin/(with-sidebar)/application-edit/_components/questions/AdminApplicationQuestionsEditItem';

interface AdminApplicationQuestionsEditContainerProps {
  questions: ApplicationQuestionsType[];
  onChange: (questions: ApplicationQuestionsType[]) => void;
  onValidChange: (isValid: boolean) => void;
}

export const AdminApplicationQuestionsEditContainer = ({
  questions,
  onChange,
  onValidChange,
}: AdminApplicationQuestionsEditContainerProps) => {
  const updateItem = (
    sequence: number,
    field: 'content' | 'maxLength',
    value: string | number
  ) => {
    onChange(
      questions.map((q) =>
        q.sequence === sequence ? {...q, [field]: value} : q
      )
    );
  };

  const isFormValid = questions.every((q) => q.content.trim() !== '');

  useEffect(() => {
    onValidChange(isFormValid);
  }, [isFormValid, onValidChange]);

  const handleDelete = (sequence: number) => {
    const reordered = questions
      .filter((q) => q.sequence !== sequence)
      .map((q, index) => ({
        ...q,
        sequence: index + 1,
      }));

    onChange(reordered);
  };

  const handleAddItem = () => {
    onChange([
      ...questions,
      {
        sequence: questions.length + 1,
        content: '',
        maxLength: 600,
      },
    ]);
  };

  return (
    <div className='flex flex-col gap-2.5 lg:gap-7.5'>
      {questions.map((question) => (
        <AdminApplicationQuestionsEditItem
          key={question.sequence}
          {...question}
          onUpdate={(field, value) =>
            updateItem(question.sequence, field, value)
          }
          onDelete={() => handleDelete(question.sequence)}
        />
      ))}
      <FullButton
        aria-label='지원서 질문 추가'
        label='+ 질문 추가하기'
        variant='outline'
        textColor='primary'
        labelTypo='h5'
        onClick={handleAddItem}
        wrapperClassName='h-[36px] lg:h-[54px] mt-2'
      />
    </div>
  );
};
