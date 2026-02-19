import {ActivityCard} from '@/app/(with-header)/(with-footer)/recruit/_components/ActivityCard';
import {ACTIVITY_CARD_DATA} from '@/constants/recruitment/recruitment-notice';

export const ActivityList = () => {
  return (
    <div className='flex flex-col gap-12.5'>
      <div className='flex flex-col'>
        <p className='text-h2 mb-2.5 text-center text-neutral-800'>
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

      <div className='flex flex-wrap justify-center gap-x-5 gap-y-6'>
        {ACTIVITY_CARD_DATA.map((item) => (
          <ActivityCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};
