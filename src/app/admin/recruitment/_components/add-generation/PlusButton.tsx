import PlusIcon from '@/assets/icons/plus-nobackground.svg';

export const PlusButton = ({disabled}: {disabled?: boolean}) => {
  return (
    <button
      disabled={disabled}
      className={`flex h-[27px] w-[27px] shrink-0 items-center justify-center rounded-[20px] bg-neutral-600 transition-all ${disabled ? 'cursor-default opacity-50' : 'cursor-pointer'}`}>
      <PlusIcon className='h-[13px] w-[13px] text-white' />
    </button>
  );
};
