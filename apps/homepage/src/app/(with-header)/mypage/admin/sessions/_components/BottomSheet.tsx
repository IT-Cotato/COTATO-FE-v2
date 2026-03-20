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
        className={`fixed right-0 bottom-0 left-0 z-50 rounded-t-2xl bg-white px-6 ${isEditing ? 'top-34.5 flex flex-col' : ''}`}
        onClick={(e) => e.stopPropagation()}>
        <div className={`relative py-5 ${isEditing ? 'shrink-0' : ''}`}>
          <button type='button' onClick={onClose} className='absolute right-0'>
            <CancelIcon className='h-2.5 w-2.5 md:h-5 md:w-5' />
          </button>
        </div>

        <div
          className={`overflow-y-auto pt-2.5 ${isEditing ? 'flex-1' : 'max-h-[80vh]'}`}>
          {children}
          {footer && <div className='pt-2'>{footer}</div>}
          <div className='h-6' />
        </div>
      </div>
    </>
  );
};
