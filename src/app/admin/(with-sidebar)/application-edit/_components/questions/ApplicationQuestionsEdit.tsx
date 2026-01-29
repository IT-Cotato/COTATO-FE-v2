'use client';

import {Button} from '@/components/button/Button';
import {FullButton} from '@/components/button/FullButton';
import {ApplicationQuestionsType} from '@/schemas/admin/admin-application-questions.schema';
import {useEffect} from 'react';

interface ApplicationQuestionsEditProps {
  questions: ApplicationQuestionsType[];
  onChange: (questions: ApplicationQuestionsType[]) => void;
  onValidChange: (isValid: boolean) => void;
}

export const ApplicationQuestionsEdit = ({
  questions,
  onChange,
  onValidChange,
}: ApplicationQuestionsEditProps) => {
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
    <div className='flex flex-col gap-7.5'>
      {questions.map(({sequence, content, maxLength}) => (
        <div key={sequence} className='flex flex-col gap-3.5'>
          <div className='flex flex-row gap-7.5'>
            <p className='text-h1 font-bold text-neutral-500'>{sequence}</p>
            <textarea
              value={content}
              placeholder='새로운 질문을 입력해 주세요.'
              onChange={(e) => updateItem(sequence, 'content', e.target.value)}
              className='min-h-82 w-full rounded-[10px] border border-neutral-300 bg-white px-5.25 py-4.5 text-h5'
            />
          </div>

          <div className='flex flex-row items-center justify-between'>
            <div className='flex items-center gap-3'>
              <span className='pl-13 text-h5 text-neutral-500'>글자 제한</span>
              <input
                value={maxLength}
                onChange={(e) =>
                  updateItem(sequence, 'maxLength', Number(e.target.value))
                }
                className='flex w-17.5 items-center justify-center rounded-[10px] border border-neutral-300 bg-white py-2.75 text-center text-body-l font-semibold text-neutral-600'
              />
              <span className='text-h5 text-neutral-500'>자</span>
            </div>
            <Button
              onClick={() => handleDelete(sequence)}
              label='삭제'
              labelTypo='body_l'
              borderRadius={5}
              backgroundColor='alert'
              textColor='neutral-50'
              width={80}
              height={36}
            />
          </div>
        </div>
      ))}
      <FullButton
        label='+ 질문 추가하기'
        variant='outline'
        textColor='primary'
        labelTypo='h5'
        onClick={handleAddItem}
      />
    </div>
  );
};
