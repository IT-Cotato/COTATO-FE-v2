import {ConfirmModal} from '@repo/ui/components/modal/ConfirmModal';

interface ApplicationConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export const ApplicationConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: ApplicationConfirmModalProps) => {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title='지원서를 제출하시겠습니까?'
      description={
        <>
          제출 후에는 수정이 불가능합니다.
          <br />
          입력하신 내용이 모두 정확한지 다시 한번 확인해주세요.
        </>
      }
      cancelLabel={false}
      isLoading={isLoading}
    />
  );
};
