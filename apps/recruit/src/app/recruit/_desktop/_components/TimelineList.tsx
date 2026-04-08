import {TimelineItem} from '@/app/recruit/_components/TimelineItem';
import {TimelineType} from '@/schemas/recruit/recruit.schema';

interface TimelineListProps {
  timelines?: TimelineType[];
}

export const TimelineList = ({timelines}: TimelineListProps) => {
  return (
    <div className='mb-30'>
      <p className='text-h2 mb-7.5 text-center text-neutral-800'>모집 일정</p>

      <div className='flex w-full overflow-x-scroll [&::-webkit-scrollbar]:hidden'>
        <div className='flex justify-center'>
          {timelines?.map((item, index) => (
            <TimelineItem
              key={item.title}
              item={item}
              isLast={index === timelines?.length - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
