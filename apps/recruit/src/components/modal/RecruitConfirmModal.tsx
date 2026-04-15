'use client';

import {ConfirmModal} from '@repo/ui/components/modal/ConfirmModal';

interface RecruitmentConfirmModalProps {
  isOpen: boolean;
  isRecruiting: boolean;
  isAdditional: boolean;
  generation: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const RecruitmentConfirmModal = ({
  isOpen,
  isRecruiting,
  isAdditional,
  generation,
  onClose,
  onConfirm,
}: RecruitmentConfirmModalProps) => {
  const getTitle = () => {
    if (isRecruiting) return '모집을 종료하시겠습니까?';

    const typeText = isAdditional ? '추가모집' : '모집';
    return `${generation}기 ${typeText}을 시작하시겠습니까?`;
  };

  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title={getTitle()}
      confirmLabel='확인'
      cancelLabel='취소'
    />
  );
};
