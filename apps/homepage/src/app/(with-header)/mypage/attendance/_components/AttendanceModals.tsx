import {getAttendanceModalContent} from '@/app/(with-header)/mypage/attendance/_utils/getAttendanceModalContent';
import {AttendanceModal} from '@/app/(with-header)/mypage/attendance/_components/AttendanceModal';

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
      <AttendanceModal
        isOpen={isErrorOpen}
        onClose={onErrorClose}
        onConfirm={onErrorClose}
        title={title}
        content={content}
      />
      <AttendanceModal
        isOpen={isSuccessOpen}
        onClose={onSuccessClose}
        onConfirm={onSuccessClose}
        title='출석이 완료되었습니다!'
      />
    </>
  );
};
