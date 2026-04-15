import {ConfirmModal} from '@repo/ui/components/modal/ConfirmModal';

interface AlreadySubmittedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const AlreadySubmittedModal = ({
  isOpen,
  onClose,
  onConfirm,
}: AlreadySubmittedModalProps) => {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title='이미 제출된 지원서입니다.'
      confirmLabel='확인'
      cancelLabel={false}
    />
  );
};
