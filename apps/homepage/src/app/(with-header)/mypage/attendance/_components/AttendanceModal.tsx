'use client';

import {ReactNode, useRef, useEffect} from 'react';
import clsx from 'clsx';
import CloseIcon from '@repo/ui/assets/icons/cancel.svg';
import {FullButton} from '@repo/ui/components/buttons/FullButton';
import {useClickOutside} from '@repo/ui/hooks/useClickOutside';

interface AttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: ReactNode;
  content?: ReactNode;
  onConfirm: () => void;
  confirmLabel?: string;
}

export const AttendanceModal = ({
  isOpen,
  onClose,
  title,
  content,
  onConfirm,
  confirmLabel = '확인',
}: AttendanceModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useClickOutside(modalRef, onClose);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className='z-modal fixed inset-0 flex items-center justify-center bg-black/50 px-6 backdrop-blur-sm'>
      <section
        ref={modalRef}
        className={clsx(
          'relative flex flex-col items-center justify-center rounded-xl bg-white text-center',
          'h-50 w-81.5 px-6 md:h-75 md:w-127.5'
        )}>
        <button
          onClick={onClose}
          className='absolute top-4 right-5'
          aria-label='닫기'>
          <CloseIcon className='h-2.25 w-2.25 text-neutral-800 md:h-3 md:w-3' />
        </button>
        <div
          className={clsx(
            'flex w-full flex-col items-center',
            content ? 'mb-8.5 md:mb-10' : 'mb-10 md:mb-10'
          )}>
          <h2 className='text-h5 md:text-h4 font-bold whitespace-pre-wrap text-neutral-800'>
            {title}
          </h2>
          {content && (
            <p className='text-body-m md:text-h5 mt-1.25 font-normal whitespace-pre-wrap text-neutral-500 md:mt-1.5'>
              {content}
            </p>
          )}
        </div>
        <div className='flex w-full justify-center'>
          <FullButton
            onClick={onConfirm}
            label={confirmLabel}
            backgroundColor='primary'
            className={clsx(
              'text-body-m-sb! h-10.5! rounded-[10px]! py-2.25!',
              'md:text-h5! md:h-11.75! md:w-85! md:py-2.75!'
            )}
          />
        </div>
      </section>
    </div>
  );
};
