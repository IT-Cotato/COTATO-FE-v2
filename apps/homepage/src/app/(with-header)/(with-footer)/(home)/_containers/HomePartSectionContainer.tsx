'use client';

import {Button} from '@repo/ui/components/buttons/Button';
import {motion, AnimatePresence} from 'framer-motion';
import {useState, useRef} from 'react';
import {HomeSectionDescription} from '@/app/(with-header)/(with-footer)/(home)/_components/HomeSectionDescription';
import Image from 'next/image';

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
        title='성장의 시작, 코테이토의 4가지 파트'
        descriptions={[
          '코테이토는 기획, 디자인, 프론트엔드, 백엔드 파트로 이루어져 있어요. ',
          '다양한 스터디와 프로젝트를 통해 실무 역량을 키울 수 있습니다.',
          '열정만 있다면 누구나 성장할 수 있습니다!',
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
        <div className='relative h-150 w-full overflow-hidden rounded-[40px]'>
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
                  src={`/images/part-section/${currentPart}.png`}
                  alt={`${partData[currentPart].title} 파트 이미지`}
                  fill
                  priority
                  className='object-cover'
                />
                <div className='absolute inset-0 bg-black/40' />

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
