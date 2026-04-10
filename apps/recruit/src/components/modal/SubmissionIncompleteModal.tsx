import {ConfirmModal} from '@repo/ui/components/modal/ConfirmModal';

interface SubmissionIncompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const SubmissionIncompleteModal = ({
  isOpen,
  onClose,
  onConfirm,
}: SubmissionIncompleteModalProps) => {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title='지원 기간이 종료되었습니다.'
      description={
        <>
          현재는 지원서 제출이 불가능합니다.
          <br />
          다음 모집을 기다려 주세요.
        </>
      }
      confirmLabel='확인'
      cancelLabel={false}
    />
  );
};
