import XIcon from '@repo/ui/assets/icons/cancel.svg';

interface SelectedMemberChipProps {
  name: string;
  onRemove: () => void;
}

export const SelectedMemberChip = ({
  name,
  onRemove,
}: SelectedMemberChipProps) => {
  return (
    <div className='bg-primary flex items-center gap-1.5 rounded-[20px] px-1.75 py-[1.5px] text-white lg:px-3.5 lg:py-1'>
      <span className='text-body-m lg:text-h5'>{name}</span>
      <button
        type='button'
        onClick={onRemove}
        aria-label={`${name} 선택 해제`}
        className='-m-1 inline-flex items-center justify-center p-1'>
        <XIcon className='h-2 w-2 text-white lg:h-3 lg:w-3' />
      </button>
    </div>
  );
};
