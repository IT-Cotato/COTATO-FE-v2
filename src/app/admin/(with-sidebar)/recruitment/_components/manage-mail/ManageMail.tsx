'use client';

import {useEffect, useRef, useState} from 'react';
import {Button} from '@/components/button/Button';
import {MOCK_MAIL_CONTENT} from '@/mocks/mock-mail';

export const ManageMail = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(MOCK_MAIL_CONTENT);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = () => {
    if (isEditing) {
      console.log(content);
    }
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    if (isEditing && scrollRef.current) {
    }
  }, [isEditing]);

  return (
    <div className='flex w-full flex-col items-start gap-5'>
      <div className='flex h-12 w-full items-center justify-between'>
        <div className='text-h4 text-neutral-800'>메일 관리</div>
        <Button
          label={isEditing ? '저장' : '수정'}
          labelTypo='body_l'
          backgroundColor={isEditing ? 'primary' : 'secondary'}
          width={112}
          height={36}
          onClick={handleButtonClick}
        />
      </div>
      <div className='h-[357px] w-full rounded-[10px] border border-none bg-white px-5 py-4.25'>
        <div
          ref={scrollRef}
          className='custom-scrollbar h-full w-full overflow-y-auto'>
          {isEditing ? (
            <textarea
              className='flex min-h-full w-full resize-none bg-transparent text-body-m text-black outline-none'
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              ref={(el) => {
                if (el) {
                  el.style.height = 'auto';
                  el.style.height = `${el.scrollHeight}px`;
                }
              }}
              autoFocus
              spellCheck={false}
            />
          ) : (
            <div className='w-full text-body-m whitespace-pre-wrap text-black'>
              {content}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
