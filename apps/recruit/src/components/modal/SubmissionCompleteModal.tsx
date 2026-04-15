import Link from 'next/link';
import {ROUTES} from '@/constants/routes';
import {ConfirmModal} from '@repo/ui/components/modal/ConfirmModal';

interface SubmissionCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  announcementDate?: string;
}

export const SubmissionCompleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  announcementDate,
}: SubmissionCompleteModalProps) => {
  return (
    <ConfirmModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title='제출이 완료되었습니다!'
      description={
        <>
          합격 발표 여부는
          {announcementDate ? (
            <span className='text-primary font-bold'> {announcementDate}</span>
          ) : (
            ' 추후'
          )}
          에<br />
          가입하신 이메일로 개별적으로 전달드립니다. <br />
          제출하신 내용은&nbsp;
          <Link href={ROUTES.MYPAGE} className='underline'>
            마이페이지
          </Link>
          에서 확인하실 수 있습니다. <br />
          <br />
          코테이토에 지원해 주셔서 감사합니다!
        </>
      }
      confirmLabel='확인'
      cancelLabel={false}
    />
  );
};
