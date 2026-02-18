import Link from 'next/link';
import {FullButton} from '@repo/ui/components/buttons/FullButton';
import {Modal} from '@repo/ui/components/modal/Modal';
import {ROUTES} from '@/constants/routes';

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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title='제출이 완료되었습니다!'
      titleStyle='text-h4 text-neutral-800'
      content={
        <p>
          합격 발표 여부는
          {announcementDate ? (
            <span className='text-primary'> {announcementDate}</span>
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
          코테이토에 지원해 주셔서 감사합니다!
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
