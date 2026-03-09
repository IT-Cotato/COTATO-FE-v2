import {Modal} from '@repo/ui/components/modal/Modal';
import {Button} from '@repo/ui/components/buttons/Button';
import {getAttendanceModalContent} from '@/app/(with-header)/mypage/attendance/_utils/getAttendanceModalContent';

interface AttendanceModalsProps {
  isSuccessOpen: boolean;
  isErrorOpen: boolean;
  errorCode: string | null;
  onSuccessClose: () => void;
  onErrorClose: () => void;
}

export const AttendanceModals = ({
  isSuccessOpen,
  isErrorOpen,
  errorCode,
  onSuccessClose,
  onErrorClose,
}: AttendanceModalsProps) => {
  const {title, content} = getAttendanceModalContent(errorCode);

  return (
    <>
      <Modal
        isOpen={isErrorOpen}
        onClose={onErrorClose}
        title={title}
        content={content}
        titleStyle='text-h4 text-neutral-800'
        actions={<Button onClick={onErrorClose} label='확인' width={340} />}
        contentWrapperClassName='gap-[40px] text-h5 text-neutral-600 text-center'
      />
      <Modal
        isOpen={isSuccessOpen}
        onClose={onSuccessClose}
        title='출석이 완료되었습니다!'
        titleStyle='text-h4 text-neutral-800'
        noContent
        actions={<Button width={340} onClick={onSuccessClose} label='확인' />}
      />
    </>
  );
};
