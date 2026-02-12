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
      titleStyle='text-h4 text-neutral-800'
      actions={
        <>
          <Button
            width={206}
            height={47}
            onClick={onClose}
            label={cancelLabel}
            textColor='neutral-50'
            labelTypo='body_l'
            backgroundColor='neutral-300'
          />
          <Button
            width={206}
            height={47}
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
