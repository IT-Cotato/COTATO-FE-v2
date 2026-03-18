'use client';

import {ReactNode} from 'react';
import {Button} from '@repo/ui/components/buttons/Button';
import {Modal} from '@repo/ui/components/modal/Modal';

interface MailConfirmModalProps {
  isOpen: boolean;
  title: string;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
}

export const MailConfirmModal = ({
  isOpen,
  title,
  description,
  confirmLabel = '확인',
  cancelLabel = '취소',
  onConfirm,
  onClose,
}: MailConfirmModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      content={description}
      noContent={!description}
      containerStyle={{borderRadius: '12px'}}
      contentWrapperClassName='my-5 lg:my-0 gap-12.25 lg:gap-26.75'
      titleStyle='text-h5 font-bold lg:text-h4 text-neutral-800'
      actions={
        <>
          <Button
            width='100%'
            wrapperClassName='w-full lg:w-51.5 lg:h-11.75 h-[42px]'
            onClick={onClose}
            label={cancelLabel}
            textColor='neutral-50'
            labelTypo='body_l'
            backgroundColor='neutral-300'
          />
          <Button
            width='100%'
            wrapperClassName='w-full lg:w-51.5 lg:h-11.75 h-[42px]'
            onClick={onConfirm}
            label={confirmLabel}
            textColor='neutral-50'
            labelTypo='body_l'
            backgroundColor='neutral-600'
          />
        </>
      }
    />
  );
};
