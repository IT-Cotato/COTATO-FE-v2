import {ConfirmModal} from '@repo/ui/components/modal/ConfirmModal';

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
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title='모집안내 알림 신청이 접수되었습니다.'
      description={
        <>
          코테이토에 관심 가져 주셔서 진심으로 감사드립니다.
          <br />
          모집 일정 및 공지는 이메일을 통해 확인할 수 있습니다.
        </>
      }
      confirmLabel='확인'
      cancelLabel={false}
    />
  );
};
