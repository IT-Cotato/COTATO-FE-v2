'use client';

import {Button} from '@repo/ui/components/buttons/Button';
import {motion, AnimatePresence, Variants, PanInfo} from 'framer-motion';
import {useState, useRef, useEffect} from 'react';
import {HomeSectionDescription} from '@/app/(with-header)/(with-footer)/(home)/_components/HomeSectionDescription';
import Image from 'next/image';
import clsx from 'clsx';

const PARTS = ['pm', 'design', 'frontend', 'backend'] as const;
type PartType = (typeof PARTS)[number];

export const HomePartSectionContainer = () => {
  const [currentPart, setCurrentPart] = useState<PartType>('pm');
  const prevIndexRef = useRef<number>(0);
  const currentIndex = PARTS.indexOf(currentPart);
  const direction = currentIndex > prevIndexRef.current ? 1 : -1;

  useEffect(() => {
    PARTS.forEach((part) => {
      const img = new window.Image();
      img.src = `/images/part-section/${part}.webp`;
    });
  }, []);

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
    <section className='flex flex-col gap-10 xl:gap-17.5'>
      <HomeSectionDescription
        title='성장의 시작, 코테이토의 4가지 파트'
        descriptions={[
          '코테이토는 기획, 디자인, 프론트엔드, 백엔드 파트로 이루어져 있어요. ',
          '다양한 스터디와 프로젝트를 통해 실무 역량을 키울 수 있습니다.',
          '열정만 있다면 누구나 성장할 수 있습니다!',
        ]}
        align='start'
      />

      <div className='flex flex-col gap-7.5'>
        {/* 데스크톱 탭 리스트 */}
        <div
          className='hidden flex-row gap-6 xl:flex'
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

        {/* 메인 탭 패널 */}
        <div
          className='relative h-60 w-full overflow-hidden rounded-lg bg-neutral-900 xl:h-140 xl:rounded-[40px]'
          id={`tabpanel-${currentPart}`}
          role='tabpanel'
          // 데스크톱/모바일 아이디 모두를 참조할 수 있도록 설정하거나 현재 활성화된 쪽을 참조
          aria-labelledby={
            typeof window !== 'undefined' && window.innerWidth >= 1280
              ? `tab-desktop-${currentPart}`
              : `tab-mobile-${currentPart}`
          }
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
              {/* 내부 콘텐츠 생략 (기존과 동일) */}
              <div className='pointer-events-none relative h-full w-full overflow-hidden'>
                <motion.div
                  key={`${currentPart}-bg`}
                  custom={direction}
                  variants={imageVariants}
                  initial='enter'
                  animate='center'
                  exit='exit'
                  className='absolute inset-0'>
                  <Image
                    src={`/images/part-section/${currentPart}.webp`}
                    alt=''
                    fill
                    priority
                    className='object-cover'
                  />
                  <div className='absolute inset-0 bg-black/50' />
                </motion.div>

                <div className='absolute inset-0 flex flex-col justify-between px-3 py-4 xl:p-17.75'>
                  <motion.p
                    variants={textVariants}
                    className='text-h4 xl:text-h1 font-bold text-neutral-50'>
                    {partData[currentPart].title}
                  </motion.p>

                  <motion.div
                    variants={textVariants}
                    className='text-p2 xl:text-h4 text-neutral-100'>
                    {partData[currentPart].desc.map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div
          className='flex justify-center xl:hidden'
          role='tablist'
          aria-label='파트 선택 (모바일)'>
          {PARTS.map((partKey) => (
            <button
              key={partKey}
              id={`tab-mobile-${partKey}`}
              role='tab'
              aria-selected={currentPart === partKey}
              aria-controls={`tabpanel-${currentPart}`}
              onClick={() => handlePartClick(partKey)}
              className='group relative flex h-5 w-5 items-center justify-center transition-all'
              aria-label={
                partKey === 'pm'
                  ? '기획 파트 보기'
                  : partKey === 'design'
                    ? '디자인 파트 보기'
                    : partKey === 'frontend'
                      ? '프론트엔드 파트 보기'
                      : '백엔드 파트 보기'
              }>
              <span
                className={clsx(
                  'h-1 w-1 rounded-full transition-all duration-300',
                  currentPart === partKey ? 'bg-neutral-600' : 'bg-neutral-300'
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

const partData = {
  pm: {
    title: 'Product Manager',
    desc: [
      '서비스의 비전을 기획하고 팀을 리드하는 역할입니다.',
      '사용자 중심 사고를 바탕으로 문제를 정의하고, 개발·디자인 파트와의 협업을 통해 서비스를 완성합니다.',
    ],
  },
  design: {
    title: 'Team Design',
    desc: [
      '사용자 여정을 설계하고 와이어프레임, 프로토타입,',
      '디자인 시스템을 구축하며, 팀과 협업하여 서비스의 완성도를 높입니다.',
    ],
  },
  frontend: {
    title: 'Team Frontend',
    desc: [
      'React를 활용하여 UI/UX를 실제로 구현하고,',
      '백엔드와의 API 통신 및 상태관리, 배포 과정을 통해 서비스를 구현합니다.',
    ],
  },
  backend: {
    title: 'Team Backend',
    desc: [
      'Spring 기반 서버 개발을 중심으로, API 설계부터 데이터베이스 구조 설계, ',
      '인증 처리와 배포 환경 구성까지 서비스가 안정적으로 동작하고 성장할 수 있는 기반을 만들어갑니다.',
    ],
  },
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
