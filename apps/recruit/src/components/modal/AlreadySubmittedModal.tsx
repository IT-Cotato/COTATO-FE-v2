import {FullButton} from '@repo/ui/components/buttons/FullButton';
import {Modal} from '@/components/modal/Modal';

interface AlreadySubmittedModalProps {
  isOpen: boolean;
  onConfirm: () => void;
}

export const AlreadySubmittedModal = ({
  isOpen,
  onConfirm,
}: AlreadySubmittedModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      title={'이미 제출된 지원서입니다.'}
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
      contentWrapperClassName='gap-[37px]'
    />
  );
};
