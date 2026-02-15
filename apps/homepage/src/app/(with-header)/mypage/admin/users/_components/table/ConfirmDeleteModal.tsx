import {Modal} from '@repo/ui/components/modal/Modal';
import {getJosa} from '@/utils/getJosa';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
}

export const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  itemName,
}: ConfirmDeleteModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      containerStyle={{width: 510, height: 300}}
      contentWrapperClassName='justify-around'
      title={
        <span className='text-h4 text-neutral-700'>
          정말로 <span className='text-primary font-semibold'>{itemName}</span>
          {getJosa(itemName, '을/를')} 삭제하시겠습니까?
        </span>
      }
      actions={
        <div className='flex w-full justify-center gap-2'>
          <button
            type='button'
            onClick={onClose}
            className='text-h5 w-[183px] rounded-[10px] bg-neutral-400 px-6 py-3 text-white'>
            취소
          </button>
          <button
            type='button'
            onClick={onConfirm}
            className='bg-primary text-h5 w-[183px] rounded-[10px] px-6 py-3 text-white'>
            삭제
          </button>
        </div>
      }
    />
  );
};
