'use client';

import Image from 'next/image';
import SmallLogo from '@/assets/small-logo/small-logo.svg';
import clsx from 'clsx';
import {POSITION_CARD_STYLES} from '@/constants/recruit/recruit-components';
import {PositionCardType} from '@/schemas/recruit/recruit.schema';
import {useState} from 'react';

interface PositionCardProps {
  item: PositionCardType;
}

export const PositionCard = ({item}: PositionCardProps) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={clsx(
        'group relative flex h-100 w-71.25 shrink-0 flex-col justify-between overflow-hidden rounded-[10px] bg-linear-to-b from-neutral-800 to-neutral-700 p-7.5 transition-colors duration-300 select-none',
        POSITION_CARD_STYLES[item.short]
      )}
      onTouchStart={() => setIsActive(true)}
      onTouchEnd={() => setIsActive(false)}
      onTouchCancel={() => setIsActive(false)}>
      <Image
        src='/images/position-card/position-card-bg.webp'
        alt=''
        fill={true}
        sizes='285px'
        draggable={false}
        className={clsx(
          'object-contain object-center transition-opacity duration-300',
          isActive ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'
        )}
      />

      <div className='flex flex-col gap-2.5'>
        <SmallLogo
          className={clsx(
            'z-10 h-5 w-5 transition-colors duration-300',
            isActive
              ? 'fill-neutral-800'
              : 'fill-neutral-50 group-hover:fill-neutral-800'
          )}
        />
        <p
          className={clsx(
            'text-h3 z-10 transition-colors duration-300',
            isActive
              ? 'text-neutral-800'
              : 'text-neutral-50 group-hover:text-neutral-800'
          )}>
          {item.name}
        </p>
      </div>

      <p
        className={clsx(
          'text-body-l z-10 mb-7.5 wrap-anywhere whitespace-pre-line text-neutral-800 transition-opacity duration-300',
          isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        )}>
        {item.detail}
      </p>
    </div>
  );
};
