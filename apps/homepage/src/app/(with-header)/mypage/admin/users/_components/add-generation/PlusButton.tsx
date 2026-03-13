import PlusIcon from '@repo/ui/assets/icons/plus-nobackground.svg';

export const PlusButton = ({disabled}: {disabled?: boolean}) => {
  return (
    <button
      type='button'
      aria-label='기수 추가'
      disabled={disabled}
      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-[20px] bg-neutral-600 transition-all md:h-6.75 md:w-6.75 ${disabled ? 'cursor-default opacity-50' : 'cursor-pointer'}`}>
      <PlusIcon className='h-2.5 w-2.5 text-white md:h-3.25 md:w-3.25' />
    </button>
  );
};
