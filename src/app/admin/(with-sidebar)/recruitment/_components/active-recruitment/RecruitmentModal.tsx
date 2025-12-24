import {Button} from '@/components/button/Button';

interface RecruitmentModalProps {
  isOpen: boolean;
  content?: React.ReactNode;
  onClose: () => void;
  onConfirm: () => void;
}

export const RecruitmentModal = ({
  isOpen,
  content,
  onClose,
  onConfirm,
}: RecruitmentModalProps) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center'>
      <div
        className='absolute inset-0 bg-black/50 backdrop-blur-sm'
        onClick={onClose}
      />
      <div className='relative z-modal flex h-58.25 w-126.75 flex-col items-center justify-center gap-10 rounded-[20px] bg-white px-7.5 py-10'>
        <h3 className='text-h5'>{content}</h3>
        <div className='flex justify-center gap-2.25'>
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
            backgroundColor='neutral-600'
          />
        </div>
      </div>
    </div>
  );
};
