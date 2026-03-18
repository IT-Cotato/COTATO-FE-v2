'use client';

import {Button} from '@repo/ui/components/buttons/Button';
import {Modal} from '@repo/ui/components/modal/Modal';

interface RecruitmentConfirmModalProps {
  isOpen: boolean;
  isRecruiting: boolean;
  isAdditional: boolean;
  generation: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const RecruitmentConfirmModal = ({
  isOpen,
  isRecruiting,
  isAdditional,
  generation,
  onClose,
  onConfirm,
}: RecruitmentConfirmModalProps) => {
  const getTitle = () => {
    if (isRecruiting) return '모집을 종료하시겠습니까?';

    const typeText = isAdditional ? '추가모집' : '모집';
    return `${generation}기 ${typeText}을 시작하시겠습니까?`;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={getTitle()}
      titleStyle='text-h5 font-bold lg:text-h4 text-neutral-800'
      noContent
      containerStyle={{borderRadius: '12px'}}
      contentWrapperClassName='my-5 lg:my-0 gap-12.25 lg:gap-26.75'
      actions={
        <>
          <Button
            width='100%'
            wrapperClassName='w-full lg:w-51.5'
            height={47}
            onClick={onClose}
            label='취소'
            textColor='neutral-50'
            labelTypo='body_l'
            backgroundColor='neutral-300'
          />
          <Button
            width='100%'
            wrapperClassName='w-full lg:w-51.5'
            height={47}
            onClick={onConfirm}
            label='확인'
            textColor='neutral-50'
            labelTypo='body_l'
            backgroundColor='neutral-600'
          />
        </>
      }
    />
  );
};
