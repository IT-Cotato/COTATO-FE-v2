import {FullButton} from '@repo/ui/components/buttons/FullButton';
import {Modal} from '@repo/ui/components/modal/Modal';

interface SubmissionCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const SubmissionCompleteModal = ({
  isOpen,
  onClose,
  onConfirm,
}: SubmissionCompleteModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title='제출이 완료되었습니다!'
      titleStyle='text-h4 text-neutral-800'
      content={
        <p>
          합격 발표 여부는
          <span className='text-primary'>2월 28일 (토) 오후 12시</span>에<br />
          작성해주신 이메일로 개별적으로 전달드립니다. <br />
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
      contentWrapperClassName='gap-[37px]'
    />
  );
};
