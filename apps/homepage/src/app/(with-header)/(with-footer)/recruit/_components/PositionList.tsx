import {PositionCard} from '@/app/(with-header)/(with-footer)/recruit/_components/PositionCard';
import {PositionCardType} from '@/schemas/recruit/recruit.schema';

interface PositionListProps {
  parts?: PositionCardType[];
}

export const PositionList = ({parts}: PositionListProps) => {
  return (
    <div className='flex flex-col gap-12.5'>
      <p className='text-h2 text-center text-neutral-800'>모집 파트</p>
      <div className='flex justify-center gap-4.5'>
        {parts?.map((item) => (
          <PositionCard key={item.short} item={item} />
        ))}
      </div>
    </div>
  );
};
