import {Modal} from '@repo/ui/components/modal/Modal';
import {Button} from '@repo/ui/components/buttons/Button';

interface AttendanceModalsProps {
  isSuccessOpen: boolean;
  isErrorOpen: boolean;
  onSuccessClose: () => void;
  onErrorClose: () => void;
}

export const AttendanceModals = ({
  isSuccessOpen,
  isErrorOpen,
  onSuccessClose,
  onErrorClose,
}: AttendanceModalsProps) => {
  return (
    <>
      <Modal
        isOpen={isErrorOpen}
        onClose={onErrorClose}
        title='위치 정보가 일치하지 않습니다.'
        content='다시 시도해 주세요.'
        titleStyle='text-h4 text-neutral-800'
        actions={<Button onClick={onErrorClose} label='확인' width={340} />}
        contentWrapperClassName='gap-[40px] text-h5 text-neutral-600'
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
