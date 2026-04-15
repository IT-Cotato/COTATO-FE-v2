import {PositionCardType} from '@/schemas/recruit/recruit.schema';
import {PositionCard} from '@/app/recruit/_components/PositionCard';

interface PositionListProps {
  parts?: PositionCardType[];
}

export const PositionList = ({parts}: PositionListProps) => {
  return (
    <div className='flex w-full flex-col items-center gap-12.5'>
      <p className='text-h2 text-center text-neutral-800'>모집 파트</p>

      <div className='flex w-full overflow-x-scroll [&::-webkit-scrollbar]:hidden'>
        <div className='mx-auto flex gap-4.5'>
          {parts?.map((item) => (
            <PositionCard key={item.short} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
