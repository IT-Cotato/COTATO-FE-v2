import ChevronLeftIcon from '@/assets/chevrons/chevron-left.svg';
import ChevronRightIcon from '@/assets/chevrons/chevron-right.svg';

interface CustomHeaderProps {
  date: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export const CustomHeader = ({
  date,
  onPrevMonth,
  onNextMonth,
}: CustomHeaderProps) => (
  <div className='flex items-center justify-between border-b border-neutral-200 pb-3'>
    <button onClick={onPrevMonth}>
      <ChevronLeftIcon className='h-4 w-4 text-[#848A95]' />
    </button>
    <span className='text-body-m text-neutral-800'>
      {date.toLocaleString('en-US', {
        month: 'long',
        year: 'numeric',
      })}
    </span>
    <button onClick={onNextMonth}>
      <ChevronRightIcon className='h-4 w-4 text-[#848A95]' />
    </button>
  </div>
);
