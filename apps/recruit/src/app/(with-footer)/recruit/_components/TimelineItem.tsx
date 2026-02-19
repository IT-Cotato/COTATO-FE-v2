import SmallLogo from '@/assets/small-logo/small-logo.svg';
import ConnectionLine from '@/assets/line/connection-line.svg';
import {TimelineType} from '@/schemas/recruit/recruit.schema';

interface TimelineItemProps {
  item: TimelineType;
  isLast: boolean;
}

export const TimelineItem = ({item, isLast}: TimelineItemProps) => {
  return (
    <div className='flex shrink-0 select-none'>
      <div className='flex w-41.5 flex-col items-center gap-3.5'>
        <div className='flex flex-col items-center gap-2.5'>
          <SmallLogo className='fill-hover h-7 w-7' />
          <p className='text-body-l-sb text-center wrap-anywhere text-neutral-700'>
            {item.title}
          </p>
        </div>
        <p className='text-body-l text-center wrap-anywhere whitespace-pre-line text-neutral-600'>
          {item.date}
        </p>
      </div>
      {!isLast && <ConnectionLine className='fill-primary mt-4.5 w-11.25' />}
    </div>
  );
};
