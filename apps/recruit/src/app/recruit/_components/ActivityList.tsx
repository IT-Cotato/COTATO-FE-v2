import {ActivityCardType} from '@/schemas/recruit/recruit.schema';
import {ActivityCard} from '@/app/recruit/_components/ActivityCard';

interface ActivityListProps {
  activities?: ActivityCardType[];
}

export const ActivityList = ({activities}: ActivityListProps) => {
  return (
    <div className='flex flex-col gap-12.5 px-6 py-12.5 lg:px-0 lg:py-0'>
      <div className='flex flex-col'>
        <p className='text-h3 lg:text-h2 mb-2.5 text-center text-neutral-800'>
          주요 활동 일정
        </p>
        <p className='text-h5 mb-1 text-center text-neutral-600'>
          정기 세션은 <span className='text-primary'>매주 금요일 19시</span>
          에&nbsp;<span className='text-primary'>오프라인</span>으로 진행됩니다
        </p>
        <p className='text-body-l mb-7.5 text-center text-neutral-500'>
          세부 일정은 추후 변경될 수 있습니다.
        </p>
      </div>
      <div className='mx-auto flex w-full max-w-299.5 flex-wrap justify-center gap-2.5 lg:gap-x-5 lg:gap-y-6'>
        {activities?.map((item) => (
          <ActivityCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
