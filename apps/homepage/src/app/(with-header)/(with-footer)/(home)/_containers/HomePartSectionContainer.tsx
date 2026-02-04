/**
 * 홈 파트 섹션의 파트별 사진, 설명을 조회하는 로직을 포함하는 홈 파트 섹션 컨테이너
 */

'use client';

import {useSearchParams, useRouter} from 'next/navigation';
import {Button} from '@repo/ui/components/buttons/Button';
import {motion, AnimatePresence} from 'framer-motion';
import {useEffect, useState} from 'react';
import {HomeSectionDescription} from '@/app/(with-header)/(with-footer)/(home)/_components/HomeSectionDescription';
import Image from 'next/image';

export const HomePartSectionContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const parts = ['pm', 'design', 'frontend', 'backend'] as const;
  const queryPart =
    (searchParams.get('part') as (typeof parts)[number]) || 'pm';

  const [prevIndex, setPrevIndex] = useState<number>(0);
  const currentIndex = parts.indexOf(queryPart);
  const direction = currentIndex > prevIndex ? 1 : -1;

  useEffect(() => {
    setPrevIndex(currentIndex);
  }, [currentIndex]);

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

  const handlePartClick = (part: 'pm' | 'design' | 'frontend' | 'backend') => {
    router.push(`?part=${part}`, {scroll: false});
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
        <div
          className='flex flex-row gap-6'
          role='tablist'
          aria-label='파트 선택'>
          {(['pm', 'design', 'frontend', 'backend'] as const).map((partKey) => (
            <Button
              key={partKey}
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
                queryPart === partKey ? 'primary' : 'text-disabled'
              }
              onClick={() => handlePartClick(partKey)}
              role='tab'
              className='transition-all duration-500 ease-in-out'
            />
          ))}
        </div>

        <div
          className='relative h-150 w-full overflow-hidden rounded-[40px]'
          role='tabpanel'
          id={`tabpanel-${queryPart}`}
          aria-labelledby={`tab-${queryPart}`}>
          <AnimatePresence mode='popLayout' custom={direction} initial={false}>
            <motion.div
              key={queryPart}
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
              className='absolute inset-0 h-full w-full'>
              <div className='relative flex h-full w-full items-center justify-center'>
                <Image
                  src='https://picsum.photos/600/300?random=3'
                  alt=''
                  fill
                  className='object-cover'
                />
                <div className='absolute inset-0 bg-black/20' />

                <div className='pointer-events-none absolute inset-0 flex flex-col justify-between p-17.75'>
                  <p className='text-h1 text-neutral-50'>
                    {partData[queryPart]?.title}
                  </p>
                  <div className='text-h4 text-neutral-100'>
                    {partData[queryPart]?.desc.map((line, idx) => (
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
    title: 'Project Manager',
    desc: [
      '코테이토에는 기획, 디자인, 프론트엔드와 백엔드 개발 총 4개의 파트가 있어요.',
      '여러 감자들과 함께 스터디와 프로젝트를 진행하며 성장할 수 있어요!',
      '열정만 있다면 누구나 멋진 회오리 감자로 변신 가능!',
    ],
  },
  design: {
    title: 'Team Design',
    desc: [
      '코테이토에는 기획, 디자인, 프론트엔드와 백엔드 개발 총 4개의 파트가 있어요.',
      '여러 감자들과 함께 스터디와 프로젝트를 진행하며 성장할 수 있어요!',
      '열정만 있다면 누구나 멋진 회오리 감자로 변신 가능!',
    ],
  },
  frontend: {
    title: 'Team Frontend',
    desc: [
      '코테이토에는 기획, 디자인, 프론트엔드와 백엔드 개발 총 4개의 파트가 있어요.',
      '여러 감자들과 함께 스터디와 프로젝트를 진행하며 성장할 수 있어요!',
      '열정만 있다면 누구나 멋진 회오리 감자로 변신 가능!',
    ],
  },
  backend: {
    title: 'Team Backend',
    desc: [
      '코테이토에는 기획, 디자인, 프론트엔드와 백엔드 개발 총 4개의 파트가 있어요.',
      '여러 감자들과 함께 스터디와 프로젝트를 진행하며 성장할 수 있어요!',
      '열정만 있다면 누구나 멋진 회오리 감자로 변신 가능!',
    ],
  },
};
