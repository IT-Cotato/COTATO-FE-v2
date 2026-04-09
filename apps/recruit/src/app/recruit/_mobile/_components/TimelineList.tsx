import {TimelineItem} from '@/app/recruit/_components/TimelineItem';
import {TimelineType} from '@/schemas/recruit/recruit.schema';

interface TimelineListProps {
  timelines?: TimelineType[];
}

export const TimelineList = ({timelines}: TimelineListProps) => {
  return (
    <div className='flex h-dvh w-full flex-col items-center justify-center gap-15 overflow-hidden px-5'>
      <p className='text-h3 text-center text-neutral-800'>모집 일정</p>

      <div className='w-full overflow-x-scroll [&::-webkit-scrollbar]:hidden'>
        <div className='mx-auto w-max'>
          <div className='mb-2.5 h-px bg-[repeating-linear-gradient(90deg,#F87D02_0px_7px,transparent_7px_14px)]' />

          <div className='flex gap-10'>
            {timelines?.map((item) => (
              <TimelineItem
                key={`${item.title}-${item.date}`}
                item={item}
                isLast={true}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
