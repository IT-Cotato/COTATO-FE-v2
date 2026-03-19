'use client';

import {useEffect} from 'react';
import CancelIcon from '@repo/ui/assets/icons/cancel.svg';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  isEditing?: boolean;
}

export const BottomSheet = ({
  isOpen,
  onClose,
  children,
  footer,
  isEditing = false,
}: BottomSheetProps) => {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className='fixed inset-0 z-40 bg-black/50' onClick={onClose} />
      <div
        className={`fixed right-0 bottom-0 left-0 z-50 rounded-t-2xl bg-white px-6 ${isEditing ? 'top-34.5' : ''}`}
        onClick={(e) => e.stopPropagation()}>
        <div className='relative py-5'>
          <button type='button' onClick={onClose} className='absolute right-0'>
            <CancelIcon className='h-5 w-5' />
          </button>
        </div>

        <div className='max-h-[80vh] overflow-y-auto pt-4'>{children}</div>
        {footer && <div className='px-5 pb-6'>{footer}</div>}
      </div>
    </>
  );
};
