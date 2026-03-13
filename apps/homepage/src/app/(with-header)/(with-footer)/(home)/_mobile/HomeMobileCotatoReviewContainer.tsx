import {HomeCotatoReviewCard} from '@/app/(with-header)/(with-footer)/(home)/_components/HomeCotatoReviewCard';
import {CotatoReview} from '@/app/(with-header)/(with-footer)/(home)/_containers/HomeCotatoReviewContainer';
import {motion, useAnimationControls, PanInfo} from 'framer-motion';
import {useCallback, useState} from 'react';

interface HomeMobileCotatoReviewContainerProps {
  reviews: CotatoReview[];
}

export const HomeMobileCotatoReviewContainer = ({
  reviews,
}: HomeMobileCotatoReviewContainerProps) => {
  const controls = useAnimationControls();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const cardWidth = 269;
  const gap = 12;
  const singleItemDistance = cardWidth + gap;

  const animateTo = useCallback(
    async (index: number) => {
      const clampedIndex = Math.max(0, Math.min(index, reviews.length - 1));
      setCurrentIndex(clampedIndex);

      await controls.start({
        x: -clampedIndex * singleItemDistance,
        transition: {duration: 0.4, ease: 'easeOut'},
      });
    },
    [controls, reviews.length, singleItemDistance]
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
    <div className='flex w-full flex-col gap-6 overflow-x-hidden'>
      <div className='w-full' style={{maxWidth: `${cardWidth}px`}}>
        <motion.div
          className='flex'
          style={{gap: `${gap}px`}}
          drag='x'
          dragConstraints={{
            left: -(reviews.length - 1) * singleItemDistance,
            right: 0,
          }}
          dragElastic={0.2}
          animate={controls}
          onDragEnd={handleDragEnd}>
          {reviews.map((review, index) => {
            const isActive = index === currentIndex;

            return (
              <motion.div
                key={review.id}
                className='shrink-0 select-none'
                animate={{
                  scale: isActive ? 1 : 0.95,
                  opacity: isActive ? 1 : 0.9,
                }}
                transition={{
                  duration: 0.3,
                  ease: 'easeInOut',
                }}>
                <HomeCotatoReviewCard {...review} />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className='h-1 w-full overflow-hidden rounded-full bg-neutral-100'>
        <motion.div
          className='h-full bg-neutral-400'
          animate={{width: `${((currentIndex + 1) / reviews.length) * 100}%`}}
        />
      </div>
    </div>
  );
};
