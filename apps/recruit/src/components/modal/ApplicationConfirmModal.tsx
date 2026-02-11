import {FullButton} from '@repo/ui/components/buttons/FullButton';
import {Modal} from '@repo/ui/components/modal/Modal';

interface ApplicationConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ApplicationConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
}: ApplicationConfirmModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title='지원서를 제출하시겠습니까?'
      titleStyle='text-h4 text-neutral-800'
      content={
        <>
          <p>제출 후에는 수정이 불가능합니다.</p>
          <p>입력하신 내용이 모두 정확한지 다시 한번 확인해주세요.</p>
        </>
      }
      actionsAlign='stretch'
      actions={
        <>
          <FullButton
            variant='primary'
            wrapperClassName='flex-1'
            onClick={onConfirm}
            label='확인'
            labelTypo='body_l'
          />
        </>
      }
      contentWrapperClassName='gap-[57px]'
    />
  );
};
