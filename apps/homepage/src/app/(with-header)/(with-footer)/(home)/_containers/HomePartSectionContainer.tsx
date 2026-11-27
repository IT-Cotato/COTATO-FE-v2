'use client';

import {Button} from '@repo/ui/components/buttons/Button';
import {motion, AnimatePresence, Variants, PanInfo} from 'framer-motion';
import {useState, useRef, useEffect} from 'react';
import {HomeSectionDescription} from '@/app/(with-header)/(with-footer)/(home)/_components/HomeSectionDescription';
import {HomepageContentImage} from '@/components/homepage-images/HomepageContentImage';
import {useHomepageImagesQuery} from '@/hooks/queries/useHomepageImages.query';
import type {HomepageImageSlot} from '@/schemas/homepage-images.schema';
import clsx from 'clsx';
import {HOMEPAGE_PART_COPY as partData} from '@/constants/homepage-copy';
import {
  FADE_IN_UP_CONTAINER,
  FADE_IN_UP_ITEM,
} from '@/constants/animation/motion-variants';

const PARTS = ['pm', 'design', 'frontend', 'backend'] as const;
type PartType = (typeof PARTS)[number];
const PART_IMAGE_SLOTS: Record<PartType, HomepageImageSlot> = {
  pm: 'PART_PM',
  design: 'PART_DESIGN',
  frontend: 'PART_FRONTEND',
  backend: 'PART_BACKEND',
};

/** 공개 화면의 기본 탭을 유지하고, 사진 편집에서는 대상 파트의 실제 사진 영역을 측정한다. */
export const HomePartSectionContainer = ({
  initialPart = 'pm',
}: {
  initialPart?: PartType;
}) => {
  const {data: homepageImages} = useHomepageImagesQuery();
  const [currentPart, setCurrentPart] = useState<PartType>(initialPart);
  const prevIndexRef = useRef<number>(0);
  const currentIndex = PARTS.indexOf(currentPart);
  const savedCopy = homepageImages?.find(
    (image) => image.slot === PART_IMAGE_SLOTS[currentPart]
  );
  const direction = currentIndex > prevIndexRef.current ? 1 : -1;

  useEffect(() => {
    PARTS.forEach((part) => {
      const img = new window.Image();
      img.src =
        homepageImages?.find((image) => image.slot === PART_IMAGE_SLOTS[part])
          ?.imageUrl ?? `/images/part-section/${part}.webp`;
    });
  }, [homepageImages]);

  const handlePartClick = (part: PartType) => {
    prevIndexRef.current = currentIndex;
    setCurrentPart(part);
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      const nextIndex = (currentIndex + 1) % PARTS.length;
      handlePartClick(PARTS[nextIndex]);
    } else if (info.offset.x > swipeThreshold) {
      const prevIndex = (currentIndex - 1 + PARTS.length) % PARTS.length;
      handlePartClick(PARTS[prevIndex]);
    }
  };

  return (
    <motion.section
      className='flex flex-col gap-10 lg:gap-17.5'
      variants={FADE_IN_UP_CONTAINER}
      initial='hidden'
      whileInView='visible'
      viewport={{once: false, amount: 0.1}}>
      <motion.div variants={FADE_IN_UP_ITEM}>
        <HomeSectionDescription
          title='성장의 시작, 코테이토의 4가지 파트'
          descriptions={[
            '코테이토는 기획, 디자인, 프론트엔드, 백엔드 파트로 이루어져 있어요. ',
            '다양한 스터디와 프로젝트를 통해 실무 역량을 키울 수 있습니다.',
            '열정만 있다면 누구나 성장할 수 있습니다!',
          ]}
          align='start'
        />
      </motion.div>

      <motion.div variants={FADE_IN_UP_ITEM} className='flex flex-col gap-7.5'>
        <div
          className='hidden flex-row gap-6 lg:flex'
          role='tablist'
          aria-label='파트 선택'>
          {PARTS.map((partKey) => (
            <div key={partKey} className='relative'>
              <Button
                id={`tab-desktop-${partKey}`}
                role='tab'
                aria-selected={currentPart === partKey}
                aria-controls={`tabpanel-${currentPart}`}
                label={
                  partKey === 'pm'
                    ? '기획'
                    : partKey === 'design'
                      ? '디자인'
                      : partKey === 'frontend'
                        ? '프론트엔드'
                        : '백엔드'
                }
                width={220}
                labelTypo='h3'
                textColor='neutral-50'
                backgroundColor={
                  currentPart === partKey ? 'primary' : 'text-disabled'
                }
                onClick={() => handlePartClick(partKey)}
                className='relative z-10 transition-colors duration-300'
              />
            </div>
          ))}
        </div>

        <div
          className='relative h-60 w-full overflow-hidden rounded-lg bg-neutral-900 lg:h-140 xl:rounded-[40px]'
          id={`tabpanel-${currentPart}`}
          role='tabpanel'
          aria-labelledby={`tab-${currentPart}`}
          tabIndex={0}>
          <AnimatePresence mode='popLayout' custom={direction}>
            <motion.div
              key={currentPart}
              custom={direction}
              variants={variants}
              initial='enter'
              animate='center'
              exit='exit'
              drag='x'
              dragConstraints={{left: 0, right: 0}}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className='focus-visible:outline-primary absolute inset-0 h-full w-full cursor-grab focus-visible:outline-2 active:cursor-grabbing'>
              <div className='pointer-events-none relative h-full w-full overflow-hidden'>
                <motion.div
                  key={`${currentPart}-bg`}
                  custom={direction}
                  variants={imageVariants}
                  initial='enter'
                  animate='center'
                  exit='exit'
                  className='absolute inset-0'>
                  <HomepageContentImage
                    slot={PART_IMAGE_SLOTS[currentPart]}
                    desktopFrom='lg'
                    fallbackSrc={`/images/part-section/${currentPart}.webp`}
                    alt=''
                    priority
                    className='object-cover'
                  />
                  <div className='absolute inset-0 bg-black/50' />
                </motion.div>

                <div className='absolute inset-0 flex flex-col justify-between px-3 py-4 lg:p-17.75'>
                  <motion.p
                    variants={textVariants}
                    className='text-h4 lg:text-h1 line-clamp-2 font-bold text-neutral-50'>
                    {savedCopy?.displayTitle ?? partData[currentPart].title}
                  </motion.p>

                  <motion.div
                    variants={textVariants}
                    className='text-p2 lg:text-h4 pointer-events-auto max-h-[65%] overflow-y-auto overscroll-contain text-neutral-100'>
                    {(savedCopy?.displayDescription !== undefined &&
                    savedCopy.displayDescription !== null
                      ? savedCopy.displayDescription.split('\n')
                      : partData[currentPart].desc
                    ).map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className='flex justify-center gap-3 py-2 lg:hidden'>
          {PARTS.map((partKey) => (
            <div
              key={partKey}
              className={clsx(
                'h-1 w-1 rounded-full transition-all duration-300',
                currentPart === partKey ? 'bg-neutral-600' : 'bg-neutral-300'
              )}
            />
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};

const variants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95,
    filter: 'blur(8px)',
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -100 : 100,
    opacity: 0,
    scale: 1.05,
    filter: 'blur(8px)',
    transition: {
      duration: 0.4,
    },
  }),
};

const imageVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '10%' : '-10%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-10%' : '10%',
    opacity: 0,
    transition: {
      duration: 0.4,
    },
  }),
};

const textVariants = {
  enter: {opacity: 0, y: 20},
  center: {opacity: 1, y: 0},
};
