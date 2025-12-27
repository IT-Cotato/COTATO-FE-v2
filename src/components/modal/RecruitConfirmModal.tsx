'use client';

import {Button} from '@/components/button/Button';
import {Modal} from '@/components/modal/Modal';

interface RecruitmentConfirmModalProps {
  isOpen: boolean;
  isRecruiting: boolean;
  generation: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const RecruitmentConfirmModal = ({
  isOpen,
  isRecruiting,
  generation,
  onClose,
  onConfirm,
}: RecruitmentConfirmModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        isRecruiting
          ? '모집을 종료하시겠습니까?'
          : `${generation}기 모집을 시작하시겠습니까?`
      }
      noContent
      actions={
        <>
          <Button
            width={219}
            height={47}
            onClick={onClose}
            label='취소'
            textColor='neutral-50'
            labelTypo='body_l'
            backgroundColor='neutral-300'
          />
          <Button
            width={219}
            height={47}
            onClick={onConfirm}
            label='확인'
            textColor='neutral-50'
            labelTypo='body_l'
            backgroundColor='neutral-600' //디자인 컨펌에 따라 색 변경 필요할 수도...
          />
        </>
      }
    />
  );
};
