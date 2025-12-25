'use client';

import {ReactNode} from 'react';
import Close from '@/assets/modal/close.svg';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void; /** 모달을 닫는 함수입니다. 배경 클릭 또는 닫기 버튼 클릭 시 호출됩니다. */
  title: string; /** 모달의 제목입니다. (필수) */
  content?: ReactNode; /** 모달의 주 내용(body)입니다. 제목 아래에 표시됩니다. */
  actions?: ReactNode; /** 모달 하단에 표시될 버튼 그룹입니다. */
  warning?: ReactNode; /** 버튼(actions) 아래에 표시될 경고 또는 추가 안내 텍스트입니다. */
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  content,
  actions,
  warning,
}: ModalProps) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className='fixed inset-0 z-999 flex items-center justify-center bg-black/50 backdrop-blur-sm'
      onClick={handleBackdropClick}>
      <div className='relative w-full max-w-[507px] rounded-[10px] bg-white px-[43px] py-[62px]'>
        <button
          onClick={onClose}
          className='absolute top-4 right-5'
          aria-label='닫기'>
          <Close className='h-[21px] w-[21px]' />
        </button>

        <div className='flex flex-col items-center gap-6 text-center'>
          <h4 className='text-[28px] leading-tight font-semibold text-neutral-800'>
            {title}
          </h4>

          {content && <p className='text-body-m text-neutral-800'>{content}</p>}

          <div className='flex w-full gap-2.25'>{actions}</div>

          {warning && (
            <div className='text-body-s text-neutral-800'>{warning}</div>
          )}
        </div>
      </div>
    </div>
  );
};
