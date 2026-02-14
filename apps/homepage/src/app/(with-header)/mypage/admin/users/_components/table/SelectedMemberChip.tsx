import XIcon from '@/assets/cancel/cancel.svg';

interface SelectedMemberChipProps {
  name: string;
  onRemove: () => void;
}

export const SelectedMemberChip = ({
  name,
  onRemove,
}: SelectedMemberChipProps) => {
  return (
    <div className='bg-primary flex items-center gap-1.5 rounded-[20px] px-3.5 py-1 text-white'>
      <span className='text-h5'>{name}</span>
      <button type='button' onClick={onRemove} aria-label={`${name} 선택 해제`}>
        <XIcon className='h-3 w-3' />
      </button>
    </div>
  );
};
