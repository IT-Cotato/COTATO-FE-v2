import {ConfirmModal} from '@repo/ui/components/modal/ConfirmModal';

interface AlreadySubmittedModalProps {
  isOpen: boolean;
  onConfirm: () => void;
}

export const AlreadySubmittedModal = ({
  isOpen,
  onConfirm,
}: AlreadySubmittedModalProps) => {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onConfirm}
      onConfirm={onConfirm}
      title='이미 제출된 지원서입니다.'
      confirmLabel='확인'
      cancelLabel={false}
    />
  );
};
