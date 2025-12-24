'use client';

import {useRef, useState} from 'react';
import {Button} from '@/components/button/Button';
import {MAIL_WAITING, MOCK_MAIL_CONTENT} from '@/mocks/mock-mail';
import {useRecruitmentStore} from '@/store/useRecruitmentStore';

export const ManageMail = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(MOCK_MAIL_CONTENT);
  const isRecruiting = useRecruitmentStore((state) => state.isRecruiting);

  // 수정 전 원본 데이터 보관
  const [originalContent, setOriginalContent] = useState(MOCK_MAIL_CONTENT);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 내용이 변경되었는지 확인
  const isChanged = content !== originalContent;
  const canSendMail = isRecruiting && !isEditing;

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setContent(originalContent); // 수정한 내용 원본으로
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    if (!isChanged) return; // 변경사항 없으면 저장 x
    console.log('저장된 내용:', content);
    setOriginalContent(content);
    setIsEditing(false);
  };

  return (
    <div className='flex w-full flex-col items-start gap-5'>
      <div className='flex h-12 w-full items-center justify-between'>
        <div className='text-h4 text-neutral-800'>메일 관리</div>
        <div className='flex gap-4'>
          {isEditing ? (
            <>
              <Button
                variant='outline'
                label='취소'
                labelTypo='body_l'
                backgroundColor='white'
                textColor='neutral-400'
                width={80}
                height={36}
                onClick={handleCancelClick}
              />
              <Button
                label='저장'
                labelTypo='body_l'
                // 변경사항이 있으면 alert, 없으면 disabled
                backgroundColor={isChanged ? 'alert' : 'neutral-400'}
                width={80}
                height={36}
                onClick={handleSaveClick}
                // 변경사항이 없을 때 클릭 방지
                disabled={!isChanged}
              />
            </>
          ) : (
            <Button
              label='수정'
              labelTypo='body_l'
              backgroundColor='secondary'
              width={112}
              height={36}
              onClick={handleEditClick}
            />
          )}
        </div>
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
      <div className='flex w-full flex-col items-end justify-end'>
        <div className='flex items-center gap-[21px] text-body-l text-neutral-500'>
          <p>대기자 수 : {MAIL_WAITING}명</p>
          <Button
            width={156}
            height={36}
            label='메일 전송하기'
            backgroundColor={canSendMail ? 'primary' : 'text-disabled'}
            disabled={!canSendMail}
            textColor='neutral-50'
          />
        </div>
      </div>
    </div>
  );
};
