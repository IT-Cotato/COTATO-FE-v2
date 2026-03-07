import {Modal} from '@repo/ui/components/modal/Modal';
import {Button} from '@repo/ui/components/buttons/Button';

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
  const getModalContent = () => {
    switch (errorCode) {
      case 'AT-104': //위치 불일치
        return {
          title: '위치 정보가 일치하지 않습니다.',
          content: '다시 시도해 주세요.',
        };
      case 'PERMISSION_DENIED': // 위치 권한 허용 안했을 때
        return {
          title: '위치 권한이 필요합니다.',
          content: '브라우저 설정에서 위치 권한을 허용해 주세요.',
        };
      case 'AT-401': // 출석시간 지남
        return {
          title: '출석 실패',
          content: '출석 가능 시간이 지났습니다.',
        };
      case 'BROWSER_NOT_SUPPORT':
        return {
          title: '출석 실패',
          content: '브라우저가 위치 정보를 지원하지 않습니다.',
        };
      default:
        return {
          title: '출석 실패',
          content: '오류가 발생했습니다. 다시 시도해 주세요.',
        };
    }
  };

  const {title, content} = getModalContent();

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
