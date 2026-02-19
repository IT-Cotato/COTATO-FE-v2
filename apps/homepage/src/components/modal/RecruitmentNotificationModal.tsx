import {FullButton} from '@repo/ui/components/buttons/FullButton';
import {Modal} from '@repo/ui/components/modal/Modal';

interface RecruitmentNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const RecruitmentNotificationModal = ({
  isOpen,
  onClose,
  onConfirm,
}: RecruitmentNotificationModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      titleStyle='text-h4 text-neutral-800'
      title='모집안내 알림 신청이 접수되었습니다.'
      content={
        <>
          코테이토에 관심 가져 주셔서 감사드립니다.
          <br />
          모집이 시작되면 입력하신
          <span className='text-primary font-bold'> 이메일</span>로 <br />
          관련 안내를 보내드릴 예정입니다. <br />
          <p className='mt-5'>
            지원 일정 및 공지는 이메일을 통해 확인하실 수 있습니다.
          </p>
        </>
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
      contentWrapperClassName='gap-[27px]'
    />
  );
};
