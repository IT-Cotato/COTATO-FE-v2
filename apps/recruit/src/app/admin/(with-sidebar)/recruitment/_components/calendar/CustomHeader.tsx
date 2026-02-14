import LeftArrow from '@/assets/arrow/left-arrow.svg';
import RightArrow from '@/assets/arrow/right-arrow.svg';

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
    <div className='mb-[19px] flex w-full items-center justify-between'>
      <button type='button' onClick={decreaseMonth}>
        <LeftArrow />
      </button>
      <span className='text-body-m text-neutral-800'>
        {monthDate.toLocaleString('en-US', {
          month: 'long',
          year: 'numeric',
        })}
      </span>
      <button type='button' onClick={increaseMonth}>
        <RightArrow />
      </button>
    </div>
  );
};
