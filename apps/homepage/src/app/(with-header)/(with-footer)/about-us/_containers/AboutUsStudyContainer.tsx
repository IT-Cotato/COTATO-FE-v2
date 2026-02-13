'use client';

import {AboutUsDescription} from '@/app/(with-header)/(with-footer)/about-us/_components/AboutUsDescription';
import {AboutUsTickerColumn} from '@/app/(with-header)/(with-footer)/about-us/_components/AboutUsTickerColumn';

export const AboutUsStudyContainer = () => {
  return (
    <section className='flex flex-col items-center gap-25 overflow-hidden py-40'>
      <AboutUsDescription
        title='코테이토의 스터디를 소개합니다'
        subTitle='COTATO에는 다양한 스터디가 활발하게 운영되며, 배움과 성장을 목표로 한 구성원들이 모여'
        subTitleOption='완성도 높은 다양한 스터디가 꾸준히 운영됩니다.'
        titleColor='text-neutral-800'
        subTitleColor='text-neutral-500'
      />

      <div className='relative flex w-full max-w-250 gap-4'>
        <div className='pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-linear-to-b from-neutral-50 to-transparent' />
        <div className='pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-linear-to-t from-neutral-50 via-neutral-50/20 to-transparent' />

        <AboutUsTickerColumn items={STUDY_GROUPS[0]} duration={25} />

        <AboutUsTickerColumn items={STUDY_GROUPS[1]} duration={25} reverse />

        <AboutUsTickerColumn items={STUDY_GROUPS[2]} duration={30} />
      </div>
    </section>
  );
};

const STUDY_GROUPS = [
  [
    {
      id: 1,
      label: '스프링 스터디',
      src: '/images/study/study-1.png',
    },
    {
      id: 2,
      label: '알고리즘 스터디',
      src: '/images/study/study-2.png',
    },
    {id: 3, label: 'React 스터디', src: '/images/study/study-3.png'},
  ],

  [
    {
      id: 4,
      label: 'Next.js 스터디',
      src: '/images/study/study-4.png',
    },
    {
      id: 5,
      label: 'Node.js 스터디',
      src: '/images/study/study-5.png',
    },
    {
      id: 6,
      label: '역기획 스터디',
      src: '/images/study/study-6.png',
    },
  ],

  [
    {
      id: 7,
      label: '이걸 왜 직접 만드나요?',
      src: '/images/study/study-7.png',
    },
    {id: 8, label: 'UX 분석 스터디', src: '/images/study/study-8.png'},
    {
      id: 9,
      label: '아티클 스터디',
      src: '/images/study/study-9.png',
    },
  ],
];
