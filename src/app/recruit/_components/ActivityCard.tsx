import Image from 'next/image';
import clsx from 'clsx';
import {ActivityCardType} from '@/schemas/recruit/recruit-components.schema';
import {ACTIVITY_CARD_STYLES} from '@/constants/recruit/recruit-components';

interface ActivityCardProps {
  item: ActivityCardType;
}

export const ActivityCard = ({item}: ActivityCardProps) => {
  return (
    <div className='group relative h-68.5 w-96.5 shrink-0 overflow-hidden rounded-[10px] bg-neutral-800 px-10 py-6 shadow-[0_6px_15px_0_rgba(0,0,0,0.1)] select-none'>
      <Image
        src={ACTIVITY_CARD_STYLES[item.short].coverImageUrl}
        alt='ActivityCard'
        fill={true}
        draggable={false}
        className={clsx(
          'object-cover object-center transition-opacity duration-300 group-hover:opacity-0',
          ACTIVITY_CARD_STYLES[item.short].style
        )}
      />
      <Image
        src={item.imageUrl}
        aria-hidden={true}
        alt=''
        fill={true}
        draggable={false}
        className='object-cover object-center opacity-0 transition-opacity duration-300 group-hover:opacity-100'
      />

      <div
        aria-hidden={true}
        className='absolute inset-0 z-10 bg-linear-to-b from-[#000000]/90 from-0% to-transparent to-48% transition-all duration-300 group-hover:from-white group-hover:to-58%'
      />

      <div className='relative z-20 flex justify-between'>
        <p className='text-h4 text-neutral-50 transition-colors duration-300 group-hover:text-neutral-800'>
          {item.name}
        </p>
        <p className='text-h5 text-neutral-200 transition-colors duration-300 group-hover:text-neutral-600'>
          {item.date}
        </p>
      </div>
    </div>
  );
};
