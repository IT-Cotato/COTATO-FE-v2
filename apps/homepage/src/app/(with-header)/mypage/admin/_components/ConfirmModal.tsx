'use client';

import {ReactNode} from 'react';
import XIcon from '@repo/ui/assets/icons/cancel.svg';

interface ConfirmModalProps {
  isOpen: boolean;
  title: ReactNode;
  description?: ReactNode;
  onClose: () => void;
  onConfirm: () => void;
  confirmLabel?: string;
  cancelLabel?: string | false;
  isLoading?: boolean;
}

export const ConfirmModal = ({
  isOpen,
  title,
  description,
  onClose,
  onConfirm,
  confirmLabel = '확인',
  cancelLabel = '취소',
  isLoading = false,
}: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className='z-modal fixed inset-0 flex items-center justify-center bg-black/50 px-6 backdrop-blur-sm'
      role='dialog'
      aria-modal='true'
      aria-labelledby='confirm-modal-title'
      aria-describedby={description ? 'confirm-modal-description' : undefined}
      onClick={onClose}>
      <div
        className='relative h-50 w-81.25 rounded-[20px] bg-white px-5 py-8 lg:h-auto lg:w-127.5 lg:px-10 lg:py-12'
        onClick={(e) => e.stopPropagation()}>
        <button
          type='button'
          onClick={onClose}
          className='absolute top-3.5 right-3.5 p-1.5 lg:top-4 lg:right-4'
          aria-label='닫기'>
          <XIcon className='h-2.25 w-2.25 cursor-pointer text-neutral-800 lg:h-3 lg:w-3' />
        </button>
        <div className='flex h-full flex-col items-center gap-6 text-center lg:gap-6'>
          <div className='flex flex-1 flex-col items-center justify-center gap-1.25 lg:flex-none lg:justify-start lg:gap-4'>
            <h4
              id='confirm-modal-title'
              className='text-h5 lg:text-h4 font-bold text-neutral-700'>
              {title}
            </h4>
            {description && (
              <p
                id='confirm-modal-description'
                className='text-body-m lg:text-h5 font-normal text-neutral-600'>
                {description}
              </p>
            )}
          </div>
          <div className='mt-auto flex w-full justify-center gap-2 lg:mt-auto'>
            {cancelLabel && (
              <button
                type='button'
                onClick={onClose}
                className='text-h5 w-full rounded-[10px] bg-neutral-400 py-2.25 text-white lg:py-3'>
                {cancelLabel}
              </button>
            )}
            <button
              type='button'
              onClick={onConfirm}
              disabled={isLoading}
              className='bg-primary text-h5 w-full rounded-[10px] py-2.25 whitespace-nowrap text-white disabled:opacity-50 lg:py-3'>
              {isLoading ? '처리 중...' : confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
