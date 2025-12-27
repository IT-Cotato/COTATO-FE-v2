'use client';

import {ReactNode} from 'react';
import {Button} from '@/components/button/Button';
import {Modal} from '@/components/modal/Modal';

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
      actions={
        <>
          <Button
            width={219}
            height={47}
            onClick={onClose}
            label={cancelLabel}
            textColor='neutral-50'
            labelTypo='body_l'
            backgroundColor='neutral-300'
          />
          <Button
            width={219}
            height={47}
            onClick={onConfirm}
            label={confirmLabel}
            textColor='neutral-50'
            labelTypo='body_l'
            backgroundColor='primary'
          />
        </>
      }
    />
  );
};
