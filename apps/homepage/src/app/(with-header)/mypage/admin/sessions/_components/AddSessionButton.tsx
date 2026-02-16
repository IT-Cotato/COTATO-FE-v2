import PlusIcon from '@repo/ui/assets/icons/plus-nobackground.svg';

interface AddSessionButtonProps {
  onClick: () => void;
}

export const AddSessionButton = ({onClick}: AddSessionButtonProps) => {
  return (
    <div>
      <button
        type='button'
        onClick={onClick}
        className='border-primary text-primary flex h-12 w-full items-center justify-center gap-2.5 rounded-[10px] border bg-transparent px-27'>
        <PlusIcon className='h-4 w-4' />
        <span className='text-h5'>세션 추가하기</span>
      </button>
    </div>
  );
};
