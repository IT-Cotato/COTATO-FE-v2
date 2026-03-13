'use client';

import {FullButton} from '@repo/ui/components/buttons/FullButton';
import {Modal} from '@repo/ui/components/modal/Modal';

interface SuccessModalProps {
  isOpen: boolean;
  onConfirm: () => void;
}

export const SuccessModal = ({isOpen, onConfirm}: SuccessModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onConfirm}
      title='비밀번호 재설정이 완료되었습니다.'
      titleStyle='text-h5 md:text-h4 font-bold text-neutral-800'
      content={
        <span className='text-body-m md:text-h5 font-normal text-neutral-600 md:font-semibold'>
          이제 새로운 비밀번호로 로그인 할 수 있습니다.
        </span>
      }
      actions={
        <FullButton
          type='button'
          label='확인'
          height={47}
          labelTypo='h4'
          onClick={onConfirm}
        />
      }
    />
  );
};
