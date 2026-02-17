import LeftChevron from '@/assets/chevrons/chevron-left-strict.svg';
import RightChevron from '@/assets/chevrons/chevron-right-strict.svg';

interface CustomHeaderProps {
  monthDate: Date;
  decreaseMonth: () => void;
  increaseMonth: () => void;
}

export const CustomHeader = ({
  monthDate,
  decreaseMonth,
  increaseMonth,
}: CustomHeaderProps) => {
  return (
    <div className='mb-4.75 flex w-full items-center justify-between'>
      <button type='button' onClick={decreaseMonth} aria-label='이전 달로 이동'>
        <LeftChevron className='h-4 w-4' aria-hidden='true' />
      </button>
      <span className='text-body-l-sb text-black' aria-live='polite'>
        {monthDate.toLocaleString('en-US', {
          month: 'long',
          year: 'numeric',
        })}
      </span>
      <button type='button' onClick={increaseMonth} aria-label='다음 달로 이동'>
        <RightChevron className='h-4 w-4' aria-hidden='true' />
      </button>
    </div>
  );
};
