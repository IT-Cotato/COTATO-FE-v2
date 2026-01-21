import PlusIcon from '@/assets/icons/plus-nobackground.svg';

export const PlusButton = () => {
  return (
    <button className='flex h-[27px] w-[27px] shrink-0 items-center justify-center rounded-[20px] bg-neutral-600'>
      <PlusIcon className='h-[13px] w-[13px] text-white' />
    </button>
  );
};
