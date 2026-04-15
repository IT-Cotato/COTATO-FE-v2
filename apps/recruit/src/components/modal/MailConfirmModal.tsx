'use client';

import {ReactNode} from 'react';
import {ConfirmModal} from '@repo/ui/components/modal/ConfirmModal';

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
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title={title}
      description={description}
      confirmLabel={confirmLabel}
      cancelLabel={cancelLabel}
    />
  );
};
