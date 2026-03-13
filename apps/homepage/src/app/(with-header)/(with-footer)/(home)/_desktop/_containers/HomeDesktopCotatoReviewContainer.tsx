'use client';

import {HomeCotatoReviewCard} from '@/app/(with-header)/(with-footer)/(home)/_components/HomeCotatoReviewCard';
import {CotatoReview} from '@/app/(with-header)/(with-footer)/(home)/_containers/HomeCotatoReviewContainer';
import clsx from 'clsx';
import {motion, useAnimationControls} from 'framer-motion';
import {useCallback, useEffect, useRef, useState} from 'react';

const ITEMS_PER_PAGE = 3;

interface DesktopReviewContainerProps {
  reviews: CotatoReview[];
}

export const HomeDesktopCotatoReviewContainer = ({
  reviews,
}: DesktopReviewContainerProps) => {
  const controls = useAnimationControls();
  const [displayIndex, setDisplayIndex] = useState(1);
  const isTransitioningRef = useRef(false);
  const [isPaused, setIsPaused] = useState(false);

  const cardWidth = 339;
  const gap = 20;
  const moveDistance = (cardWidth + gap) * ITEMS_PER_PAGE;
  const totalPages = Math.ceil(reviews.length / ITEMS_PER_PAGE);

  const extendedReviews = [
    ...reviews.slice(-ITEMS_PER_PAGE),
    ...reviews,
    ...reviews.slice(0, ITEMS_PER_PAGE),
  ];

  const animateTo = useCallback(
    async (targetIndex: number) => {
      if (isTransitioningRef.current) return;
      isTransitioningRef.current = true;
      setDisplayIndex(targetIndex);

      await controls.start({
        x: -targetIndex * moveDistance,
        transition: {duration: 0.8, ease: [0.4, 0, 0.2, 1]},
      });

      if (targetIndex > totalPages) {
        controls.set({x: -moveDistance});
        setDisplayIndex(1);
      } else if (targetIndex < 1) {
        controls.set({x: -totalPages * moveDistance});
        setDisplayIndex(totalPages);
      }
      isTransitioningRef.current = false;
    },
    [controls, moveDistance, totalPages]
  );

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => animateTo(displayIndex + 1), 5000);
    return () => clearInterval(timer);
  }, [animateTo, displayIndex, isPaused]);

  return (
    <>
      <div
        className='relative mx-auto overflow-hidden'
        style={{width: `${cardWidth * 3 + gap * 2}px`}}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}>
        <motion.div
          className='flex'
          style={{gap: `${gap}px`}}
          initial={{x: -moveDistance}}
          animate={controls}>
          {extendedReviews.map((review, idx) => (
            <div key={`${review.id}-${idx}`} className='shrink-0'>
              <HomeCotatoReviewCard {...review} />
            </div>
          ))}
        </motion.div>
      </div>
      <div className='flex justify-center gap-3'>
        {Array.from({length: totalPages}).map((_, i) => (
          <button
            key={i}
            onClick={() => animateTo(i + 1)}
            className={clsx(
              'h-1.5 w-1.5 rounded-full transition-all',
              (displayIndex - 1) % totalPages === i
                ? 'bg-neutral-600'
                : 'bg-neutral-200'
            )}
          />
        ))}
      </div>
    </>
  );
};
