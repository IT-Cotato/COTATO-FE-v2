import PrevIcon from '@/assets/chevrons/chevron-left.svg';

interface MonthNavigatorProps {
  currentMonth: number;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export const MonthNavigator = ({
  currentMonth,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
}: MonthNavigatorProps) => {
  return (
    <div className='flex items-center justify-center gap-13.5'>
      <button
        onClick={onPrev}
        disabled={!hasPrev}
        className='text-neutral-600 disabled:opacity-30'>
        <PrevIcon className='h-8 w-8' />
      </button>
      <span className='text-h2 text-center text-neutral-600'>
        {currentMonth}월
      </span>
      <button
        onClick={onNext}
        disabled={!hasNext}
        className='text-neutral-600 disabled:opacity-30'>
        <PrevIcon className='h-8 w-8 rotate-180' />
      </button>
    </div>
  );
};
