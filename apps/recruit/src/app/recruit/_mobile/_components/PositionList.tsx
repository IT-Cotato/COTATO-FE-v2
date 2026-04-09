'use client';

import {
  POSITION_OPTIONS,
  PositionCardType,
} from '@/schemas/recruit/recruit.schema';
import clsx from 'clsx';
import {motion, useAnimationControls, PanInfo} from 'framer-motion';
import {useCallback, useState} from 'react';
import {PositionCard} from '@/app/recruit/_components/PositionCard';

interface PositionListProps {
  parts?: PositionCardType[];
}

export const PositionList = ({parts = []}: PositionListProps) => {
  const controls = useAnimationControls();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const cardWidth = 285;
  const gap = 21;
  const singleItemDistance = cardWidth + gap;
  const maxIndex = Math.max(0, parts.length - 1);

  const animateTo = useCallback(
    async (index: number) => {
      const clampedIndex = Math.max(0, Math.min(index, maxIndex));
      setCurrentIndex(clampedIndex);
      await controls.start({
        x: -clampedIndex * singleItemDistance,
        transition: {duration: 0.4, ease: 'easeOut'},
      });
    },
    [controls, maxIndex, singleItemDistance]
  );

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 50;
    if (info.offset.x < -threshold) animateTo(currentIndex + 1);
    else if (info.offset.x > threshold) animateTo(currentIndex - 1);
    else animateTo(currentIndex);
  };

  return (
    <div className='flex h-dvh w-full flex-col items-center justify-center gap-5 overflow-hidden'>
      <p className='text-h3 text-center text-neutral-800'>모집 파트</p>

      <div className='w-71.25 overflow-hidden'>
        <motion.div
          className='flex gap-5'
          drag='x'
          dragConstraints={{
            left: -maxIndex * singleItemDistance,
            right: 0,
          }}
          dragElastic={0.2}
          animate={controls}
          onDragEnd={handleDragEnd}>
          {parts?.map((item) => {
            return (
              <motion.div
                key={item.short}
                className='shrink-0 select-none'
                transition={{
                  duration: 0.3,
                  ease: 'easeInOut',
                }}>
                <PositionCard key={item.short} item={item} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className='flex w-full justify-center gap-2.25 py-0.5'>
        {POSITION_OPTIONS?.map((option) => (
          <div
            key={option}
            className={clsx(
              'h-1 w-1 rounded-full transition-all duration-300',
              option === parts?.[currentIndex]?.short
                ? 'bg-neutral-600'
                : 'bg-neutral-300'
            )}
          />
        ))}
      </div>
    </div>
  );
};
