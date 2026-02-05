'use client';

import {HomeCotatoReviewCard} from '@/app/(with-header)/(with-footer)/(home)/_components/HomeCotatoReviewCard';
import {HomeSectionDescription} from '@/app/(with-header)/(with-footer)/(home)/_components/HomeSectionDescription';
import {COTATO_REVIEWS_MOCK_DATA} from '@/mocks/home/mock-cotato-review';
import {motion, useAnimationControls} from 'framer-motion';
import {useCallback, useEffect, useState} from 'react';

const ITEMS_PER_PAGE = 3;

export const HomeCotatoReviewContainer = () => {
  const controls = useAnimationControls();
  const [displayIndex, setDisplayIndex] = useState<number>(1);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const cardWidth = 339;
  const gap = 20;
  const moveDistance = cardWidth * ITEMS_PER_PAGE + gap * ITEMS_PER_PAGE;

  const totalPages = Math.ceil(
    COTATO_REVIEWS_MOCK_DATA.length / ITEMS_PER_PAGE
  );

  const extendedReviews = [
    ...COTATO_REVIEWS_MOCK_DATA.slice(-ITEMS_PER_PAGE),
    ...COTATO_REVIEWS_MOCK_DATA,
    ...COTATO_REVIEWS_MOCK_DATA.slice(0, ITEMS_PER_PAGE),
  ];

  const animateTo = useCallback(
    async (targetIndex: number) => {
      setIsTransitioning(true);
      setDisplayIndex(targetIndex);

      await controls.start({
        x: -targetIndex * moveDistance,
        transition: {duration: 0.8, ease: [0.4, 0, 0.2, 1]},
      });

      if (targetIndex > totalPages) {
        controls.set({x: -1 * moveDistance});
        setDisplayIndex(1);
      } else if (targetIndex < 1) {
        controls.set({x: -totalPages * moveDistance});
        setDisplayIndex(totalPages);
      }

      setIsTransitioning(false);
    },
    [controls, moveDistance, totalPages]
  );

  const handleNext = useCallback(() => {
    if (isTransitioning) return;
    animateTo(displayIndex + 1);
  }, [animateTo, displayIndex, isTransitioning]);

  const handleDotClick = (index: number) => {
    if (isTransitioning || (displayIndex - 1) % totalPages === index) return;
    animateTo(index + 1);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [handleNext]);

  return (
    <div className='flex flex-col gap-10 py-10'>
      <HomeSectionDescription
        title='찐감자들의 후기'
        descriptions={[
          '코테이토에는 기획, 디자인, 프론트엔드와 백엔드 개발 총 4개의 파트가 있어요.',
          '여러 감자들과 함께 스터디와 프로젝트를 진행하며 성장할 수 있어요.',
          '열정만 있다면 누구나 멋진 회오리 감자로 변신 가능!',
        ]}
        align='end'
      />

      <div
        className='relative mx-auto overflow-hidden'
        style={{width: `${cardWidth * 3 + gap * 2}px`}}>
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

      <div
        className='flex justify-center gap-3'
        role='tablist'
        aria-label='리뷰 페이지 선택'>
        {Array.from({length: totalPages}).map((_, index) => {
          const isActive = (displayIndex - 1) % totalPages === index;
          return (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              role='tab'
              aria-selected={isActive}
              aria-label={`${index + 1}번 리뷰 그룹 보기`}
              className={`h-1.5 w-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-neutral-600'
                  : 'bg-neutral-200 hover:bg-neutral-400'
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};
