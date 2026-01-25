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
      <ChevronLeftIcon />
    </button>
    <span className='text-body-s text-neutral-800'>
      {date.toLocaleString('en-US', {
        month: 'long',
        year: 'numeric',
      })}
    </span>
    <button onClick={onNextMonth}>
      <ChevronRightIcon />
    </button>
  </div>
);
