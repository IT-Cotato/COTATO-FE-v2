'use client';

import {Button} from '@repo/ui/components/buttons/Button';
import {motion, AnimatePresence} from 'framer-motion';
import {useState, useRef} from 'react';
import {HomeSectionDescription} from '@/app/(with-header)/(with-footer)/(home)/_components/HomeSectionDescription';
import Image from 'next/image';

/** 추후 스키마로 변경 */
const PARTS = ['pm', 'design', 'frontend', 'backend'] as const;
type PartType = (typeof PARTS)[number];

export const HomePartSectionContainer = () => {
  const [currentPart, setCurrentPart] = useState<PartType>('pm');

  const prevIndexRef = useRef<number>(0);

  const currentIndex = PARTS.indexOf(currentPart);
  const direction = currentIndex > prevIndexRef.current ? 1 : -1;

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
      filter: 'blur(4px)',
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -200 : 200,
      opacity: 0,
      filter: 'blur(4px)',
    }),
  };

  const handlePartClick = (part: PartType) => {
    prevIndexRef.current = currentIndex;
    setCurrentPart(part);
  };

  return (
    <div className='flex flex-col gap-17.5'>
      <HomeSectionDescription
        title='4개의 파트로 구성되어 있어요'
        descriptions={[
          '코테이토에는 기획, 디자인, 프론트엔드와 백엔드 개발 총 4개의 파트가 있어요.',
          '여러 감자들과 함께 스터디와 프로젝트를 진행하며 성장할 수 있어요.',
          '열정만 있다면 누구나 멋진 회오리 감자로 변신 가능!',
        ]}
        align='start'
      />

      <div className='flex flex-col gap-7.5'>
        {/* TabList */}
        <div
          className='flex flex-row gap-6'
          role='tablist'
          aria-label='파트 선택'>
          {PARTS.map((partKey) => (
            <Button
              key={partKey}
              id={`tab-${partKey}`}
              role='tab'
              aria-selected={currentPart === partKey}
              aria-controls={`tabpanel-${partKey}`}
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
              className='transition-all duration-500 ease-in-out'
            />
          ))}
        </div>
        {/** TabPanel */}
        <div
          className='relative h-150 w-full overflow-hidden rounded-[40px]'
          role='tabpanel'
          id={`tabpanel-${currentPart}`}>
          <AnimatePresence mode='popLayout' custom={direction} initial={false}>
            <motion.div
              key={currentPart}
              id={`tabpanel-${currentPart}`}
              role='tabpanel'
              aria-labelledby={`tab-${currentPart}`}
              tabIndex={0}
              custom={direction}
              variants={variants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{
                x: {type: 'spring', stiffness: 70, damping: 20},
                opacity: {duration: 0.5},
                filter: {duration: 0.5},
              }}
              className='absolute inset-0 h-full w-full overflow-hidden rounded-[40px]'>
              <div className='relative flex h-full w-full items-center justify-center'>
                <Image
                  src={`https://picsum.photos/600/300?random=${currentPart}`}
                  alt={`${currentPart} 이미지`}
                  fill
                  className='object-cover'
                />
                <div className='absolute inset-0 bg-black/20' />

                <div className='pointer-events-none absolute inset-0 flex flex-col justify-between p-17.75'>
                  <p className='text-h1 text-neutral-50'>
                    {partData[currentPart].title}
                  </p>
                  <div className='text-h4 text-neutral-100'>
                    {partData[currentPart].desc.map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const partData = {
  pm: {title: 'Project Manager', desc: ['기획 파트 설명...']},
  design: {title: 'Team Design', desc: ['디자인 파트 설명...']},
  frontend: {title: 'Team Frontend', desc: ['프론트엔드 파트 설명...']},
  backend: {title: 'Team Backend', desc: ['백엔드 파트 설명...']},
};
