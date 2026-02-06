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
      <button type='button' onClick={decreaseMonth}>
        <LeftChevron className='h-4 w-4' />
      </button>
      <span className='text-body-l-sb text-black'>
        {monthDate.toLocaleString('en-US', {
          month: 'long',
          year: 'numeric',
        })}
      </span>
      <button type='button' onClick={increaseMonth}>
        <RightChevron className='h-4 w-4' />
      </button>
    </div>
  );
};
