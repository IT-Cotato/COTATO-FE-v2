'use client';

import {useRouter} from 'next/navigation';
import {ROUTES} from '@/constants/routes';
import {AboutUsDescription} from '@/app/(with-header)/(with-footer)/about-us/_components/AboutUsDescription';
import {AboutUsMobileProjectContainer} from '@/app/(with-header)/(with-footer)/about-us/_mobile/AboutUsMobileProjectContainer';
import {AboutUsDesktopProjectContainer} from '@/app/(with-header)/(with-footer)/about-us/_desktop/AboutUsDesktopProjectContainer';
import {motion} from 'framer-motion';
import {
  FADE_IN_UP_CONTAINER,
  FADE_IN_UP_ITEM,
} from '@/constants/animation/motion-variants';

export interface AboutUsProject {
  id: number;
  title: string;
  imageSrc: string;
}

export const AboutUsProjectContainer = () => {
  const router = useRouter();

  const handleProjectMoreViewClick = () => {
    router.push(ROUTES.PROJECT);
  };

  return (
    <section
      className='flex min-h-175 flex-col items-center gap-25 py-35 lg:py-50'
      aria-label='코테이토 프로젝트 소개'
      id='project'>
      <motion.div
        className='flex w-full flex-col items-center gap-25'
        variants={FADE_IN_UP_CONTAINER}
        initial='hidden'
        whileInView='visible'
        viewport={{once: false, amount: 0.2}}>
        <motion.div variants={FADE_IN_UP_ITEM} className='w-full'>
          <AboutUsDescription
            title='코테이토의 프로젝트를 소개합니다'
            subTitle='함께 만들어 도착한, COTATO의 프로젝트를 만나보세요.'
            titleColor='text-neutral-800'
            subTitleColor='text-neutral-500'
            className='text-right lg:text-center'
          />
        </motion.div>

        <motion.div variants={FADE_IN_UP_ITEM} className='w-full'>
          <div className='hidden w-full items-center justify-center xl:flex'>
            <AboutUsDesktopProjectContainer projects={PROJECTS} />
          </div>
          <AboutUsMobileProjectContainer projects={PROJECTS} />
        </motion.div>

        <motion.div variants={FADE_IN_UP_ITEM}>
          <button
            className='text-body-l xl:text-h5 font-bold text-neutral-600 transition-colors hover:text-neutral-900'
            onClick={handleProjectMoreViewClick}
            aria-label='코테이토 전체 프로젝트 목록 페이지로 이동'>
            프로젝트 더보기
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

const PROJECTS: AboutUsProject[] = [
  {
    id: 1,
    title: '온길',
    imageSrc: '/images/project/ongil.webp',
  },
  {
    id: 2,
    title: '냉잔고',
    imageSrc: '/images/project/naengjango.webp',
  },
  {
    id: 3,
    title: 'SIMTALK',
    imageSrc: '/images/project/simtalk.webp',
  },
  {
    id: 4,
    title: 'COOKEEP',
    imageSrc: '/images/project/cookeep.webp',
  },
  {
    id: 5,
    title: 'FinSight',
    imageSrc: '/images/project/finsight.webp',
  },
  {
    id: 6,
    title: 'timetile',
    imageSrc: '/images/project/timetile.webp',
  },
  {
    id: 7,
    title: 'StageMate',
    imageSrc: '/images/project/stagemate.webp',
  },
  {
    id: 8,
    title: 'Troublog',
    imageSrc: '/images/project/troublog.webp',
  },
];
