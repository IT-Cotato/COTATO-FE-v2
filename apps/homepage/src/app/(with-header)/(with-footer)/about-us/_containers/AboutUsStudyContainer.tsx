'use client';

import {AboutUsDescription} from '@/app/(with-header)/(with-footer)/about-us/_components/AboutUsDescription';
import {AboutUsTickerColumn} from '@/app/(with-header)/(with-footer)/about-us/_components/AboutUsTickerColumn';
import {
  FADE_IN_UP_CONTAINER,
  FADE_IN_UP_ITEM,
} from '@/constants/animation/motion-variants';
import {motion} from 'framer-motion';

export interface AboutUsStudy {
  id: number;
  label: string;
  src: string;
}

export const AboutUsStudyContainer = () => {
  return (
    <section
      className='flex flex-col items-center overflow-hidden py-35 lg:py-50'
      aria-label='코테이토 스터디 소개'
      id='study'>
      <motion.div
        className='flex w-full flex-col items-center gap-25'
        variants={FADE_IN_UP_CONTAINER}
        initial='hidden'
        whileInView='visible'
        viewport={{once: false, amount: 0.2}}>
        <motion.div variants={FADE_IN_UP_ITEM} className='w-full'>
          <AboutUsDescription
            title='코테이토의 스터디를 소개합니다'
            subTitle='COTATO에는 다양한 스터디가 활발하게 운영되며, 배움과 성장을 목표로 한 구성원들이 모여'
            subTitleOption='완성도 높은 다양한 스터디가 꾸준히 운영됩니다.'
            titleColor='text-neutral-800'
            subTitleColor='text-neutral-500'
            className='text-left lg:text-center'
          />
        </motion.div>

        <motion.div
          variants={FADE_IN_UP_ITEM}
          className='relative flex w-full max-w-160 justify-center gap-4 lg:max-w-250'>
          <div className='pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-linear-to-b from-neutral-50 to-transparent' />
          <div className='pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-linear-to-t from-neutral-50 via-neutral-50/20 to-transparent' />

          <AboutUsTickerColumn items={STUDY_GROUPS[0]} duration={25} />
          <AboutUsTickerColumn items={STUDY_GROUPS[1]} duration={25} reverse />
          <AboutUsTickerColumn
            items={STUDY_GROUPS[2]}
            duration={30}
            className='hidden lg:block'
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

const STUDY_GROUPS: AboutUsStudy[][] = [
  [
    {
      id: 1,
      label: '스프링 스터디',
      src: '/images/study/spring-study.webp',
    },
    {
      id: 2,
      label: '리켓단 스터디',
      src: '/images/study/react-study.webp',
    },
    {id: 3, label: 'React 스터디', src: '/images/study/react-study-2.webp'},
    {
      id: 4,
      label: '역기획 스터디',
      src: '/images/study/pm-study-2.webp',
    },
    {
      id: 5,
      label: '아키텍쳐 스터디',
      src: '/images/study/architecture-study.webp',
    },
  ],

  [
    {
      id: 6,
      label: 'Next.js 스터디',
      src: '/images/study/nextjs-study.webp',
    },
    {
      id: 7,
      label: '테크 블로그 스터디',
      src: '/images/study/tech-study.webp',
    },
    {
      id: 8,
      label: '기획 스터디',
      src: '/images/study/pm-study.webp',
    },
    {
      id: 9,
      label: '스프링 스터디',
      src: '/images/study/spring-study-2.webp',
    },
  ],

  [
    {
      id: 8,
      label: '이걸 왜 직접 만드나요?',
      src: '/images/study/crafting-study.webp',
    },
    {id: 9, label: 'UX 분석 스터디', src: '/images/study/ux-study.webp'},
    {
      id: 10,
      label: '아티클 스터디',
      src: '/images/study/article-study.webp',
    },
    {
      id: 11,
      label: '아티클 스터디',
      src: '/images/study/article-study-2.webp',
    },
    {
      id: 12,
      label: '코틀린 스터디',
      src: '/images/study/kotlin-study.webp',
    },
  ],
];
