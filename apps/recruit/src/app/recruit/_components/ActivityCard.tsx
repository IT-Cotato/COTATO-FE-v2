'use client';

import Image from 'next/image';
import clsx from 'clsx';
import {ActivityCardType} from '@/schemas/recruit/recruit.schema';
import {ACTIVITY_CARD_STYLES} from '@/constants/recruit/recruit-components';
import {useState} from 'react';

interface ActivityCardProps {
  item: ActivityCardType;
}

export const ActivityCard = ({item}: ActivityCardProps) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className='group relative h-57.5 w-81.75 shrink-0 overflow-hidden rounded-[10px] bg-neutral-800 px-10 py-6 shadow-[0_6px_15px_0_rgba(0,0,0,0.1)] select-none lg:h-68.5 lg:w-96.5'
      onTouchStart={() => setIsActive(true)}
      onTouchEnd={() => setIsActive(false)}
      onTouchCancel={() => setIsActive(false)}>
      <Image
        src={ACTIVITY_CARD_STYLES[item.short].coverImageUrl}
        alt=''
        fill={true}
        sizes='386px'
        draggable={false}
        className={clsx(
          'object-cover object-center transition-opacity duration-300',
          isActive ? 'opacity-0' : 'group-hover:opacity-0',
          ACTIVITY_CARD_STYLES[item.short].style
        )}
      />
      <Image
        src={ACTIVITY_CARD_STYLES[item.short].photoImageUrl}
        aria-hidden={true}
        alt=''
        fill={true}
        sizes='386px'
        draggable={false}
        className={clsx(
          'object-cover object-center opacity-0 transition-opacity duration-300',
          isActive ? 'opacity-100' : 'group-hover:opacity-100'
        )}
      />

      <div
        aria-hidden={true}
        className={clsx(
          'absolute inset-0 z-10 bg-linear-to-b from-[#000000]/90 from-0% to-transparent to-48% transition-all duration-300',
          isActive
            ? 'from-white to-58%'
            : 'group-hover:from-white group-hover:to-58%'
        )}
      />

      <div className='relative z-20 flex justify-between'>
        <p
          className={clsx(
            'text-h4 font-bold text-neutral-50 transition-colors duration-300',
            isActive ? 'text-neutral-800' : 'group-hover:text-neutral-800'
          )}>
          {item.name}
        </p>
        <p
          className={clsx(
            'text-h5 font-semibold text-neutral-200 transition-colors duration-300',
            isActive ? 'text-neutral-600' : 'group-hover:text-neutral-600'
          )}>
          {item.date}
        </p>
      </div>
    </div>
  );
};
