import {HomeCotatoReviewCard} from '@/app/(with-header)/(with-footer)/(home)/_components/HomeCotatoReviewCard';
import {CotatoReview} from '@/app/(with-header)/(with-footer)/(home)/_containers/HomeCotatoReviewContainer';
import {motion, useAnimationControls, PanInfo} from 'framer-motion';
import {useCallback, useState} from 'react';

interface MobileReviewContainerProps {
  reviews: CotatoReview[];
}

export const MobileReviewContainer = ({
  reviews,
}: MobileReviewContainerProps) => {
  const controls = useAnimationControls();
  const [currentIndex, setCurrentIndex] = useState(0);

  const cardWidth = 320;
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

  const onDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 50;
    if (info.offset.x < -threshold) animateTo(currentIndex + 1);
    else if (info.offset.x > threshold) animateTo(currentIndex - 1);
    else animateTo(currentIndex);
  };

  return (
    <div className='flex w-full flex-col items-center gap-6'>
      <div
        className='w-full overflow-hidden'
        style={{maxWidth: `${cardWidth}px`}}>
        <motion.div
          className='flex'
          style={{gap: `${gap}px`}}
          drag='x'
          dragConstraints={{
            left: -(reviews.length - 1) * singleItemDistance,
            right: 0,
          }}
          animate={controls}
          onDragEnd={onDragEnd}>
          {reviews.map((review) => (
            <div key={review.id} className='shrink-0 select-none'>
              <HomeCotatoReviewCard {...review} />
            </div>
          ))}
        </motion.div>
      </div>

      <div className='h-1 w-50 overflow-hidden rounded-full bg-neutral-100'>
        <motion.div
          className='h-full bg-neutral-400'
          animate={{width: `${((currentIndex + 1) / reviews.length) * 100}%`}}
        />
      </div>
    </div>
  );
};
