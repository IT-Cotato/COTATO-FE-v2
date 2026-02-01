import {FullButton} from '@repo/ui/components/buttons/FullButton';
import {Modal} from '@/components/modal/Modal';

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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title='지원 기간이 종료되었습니다.'
      content={
        <p>
          현재는 지원서 제출이 불가능합니다.
          <br />
          다음 모집을 기다려 주세요.
        </p>
      }
      actionsAlign='stretch'
      actions={
        <FullButton
          variant='primary'
          wrapperClassName='flex-1'
          onClick={onConfirm}
          label='확인'
          labelTypo='body_l'
        />
      }
      contentWrapperClassName='gap-[57px]'
    />
  );
};
