'use client';

import {Button} from '@/components/button/Button';
import {FullButton} from '@/components/button/FullButton';
import {mockPlanApplicationForm} from '@/mocks/mock-application-form';
import {useAdminApplicationFormStore} from '@/stores/useAdminApplicationFormStore';
import {useEffect, useState} from 'react';

export const ApplicationFormEdit = () => {
  const [formItems, setFormItems] = useState(mockPlanApplicationForm);

  const updateItem = (
    id: number,
    field: 'content' | 'limitTextRange',
    value: string
  ) => {
    setFormItems((prev) =>
      prev.map((item) => (item.id === id ? {...item, [field]: value} : item))
    );
  };
  const setIsFormValid = useAdminApplicationFormStore((s) => s.setIsFormValid);

  const createEmptyItem = (id: number) => ({
    id,
    content: '',
    limitTextRange: '600',
  });

  const isFormValid = formItems.every(
    (item) => item.content.trim() !== '' && item.limitTextRange.trim() !== ''
  );

  useEffect(() => {
    setIsFormValid(isFormValid);
  }, [isFormValid, setIsFormValid]);

  const handleDelete = (id: number) => {
    setFormItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddItem = () => {
    setFormItems((prev) => {
      const nextId =
        prev.length > 0 ? Math.max(...prev.map((v) => v.id)) + 1 : 1;

      return [...prev, createEmptyItem(nextId)];
    });
  };
  return (
    <div className='flex flex-col gap-7.5'>
      {formItems.map(({id, content, limitTextRange}) => (
        <div key={id} className='flex flex-col gap-3.5'>
          <div className='flex flex-row gap-7.5'>
            <p className='text-h1 font-bold text-neutral-500'>{id}</p>
            <textarea
              value={content}
              placeholder='새로운 질문을 입력해 주세요.'
              onChange={(e) => updateItem(id, 'content', e.target.value)}
              className='min-h-82 w-full rounded-[10px] border border-neutral-300 bg-white px-5.25 py-4.5 text-h5'
            />
          </div>

          <div className='flex flex-row items-center justify-between'>
            <div className='flex items-center gap-3'>
              <span className='pl-16 text-h5 text-neutral-500'>글자 제한</span>
              <input
                type='text'
                value={limitTextRange}
                onChange={(e) =>
                  updateItem(id, 'limitTextRange', e.target.value)
                }
                className='w-22.25 rounded-[10px] border border-neutral-300 bg-white py-3.75 text-center text-body-l text-neutral-500'
              />
              <span className='text-h5 text-neutral-500'>자</span>
            </div>
            <Button
              onClick={() => handleDelete(id)}
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
