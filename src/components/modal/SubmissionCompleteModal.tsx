import {FullButton} from '../button/FullButton';
import {Modal} from './Modal';

interface ApplicationConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const SubmissionCompleteModal = ({
  isOpen,
  onClose,
  onConfirm,
}: ApplicationConfirmModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title='제출이 완료되었습니다!'
      content={
        <p>
          합격 발표 여부는
          <span className='text-primary'>2월 28일 (토) 오후 12시</span>에
          작성해주신 연락처로 개별적으로 전달드립니다. <br />
          코테이토를 지원해주셔서 감사합니다!
          <br />
          좋은 결과 있으시길 바랍니다 🌿
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
