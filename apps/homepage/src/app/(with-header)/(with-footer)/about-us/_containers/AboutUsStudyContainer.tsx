'use client';

import {AboutUsDescription} from '@/app/(with-header)/(with-footer)/about-us/_components/AboutUsDescription';
import {AboutUsTickerColumn} from '@/app/(with-header)/(with-footer)/about-us/_components/AboutUsTickerColumn';

export const AboutUsStudyContainer = () => {
  return (
    <div
      className='flex flex-col items-center gap-25 overflow-hidden py-40'
      aria-labelledby='study'
      id='study'>
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
    </div>
  );
};

const STUDY_GROUPS = [
  [
    {
      id: 1,
      label: '스프링 스터디',
      src: '/images/study/spring-study.png',
    },
    {
      id: 2,
      label: '리액트 공식문서 읽기 스터디',
      src: '/images/study/react-study.png',
    },
    {id: 3, label: 'React 스터디', src: '/images/study/react-study-2.png'},
    {
      id: 4,
      label: '역기획 스터디',
      src: '/images/study/pm-study-2.png',
    },
    {
      id: 5,
      label: '아키텍쳐 스터디',
      src: '/images/study/architecture-study.png',
    },
  ],

  [
    {
      id: 6,
      label: 'Next.js 스터디',
      src: '/images/study/nextjs-study.png',
    },
    {
      id: 7,
      label: '테크 블로그 스터디',
      src: '/images/study/tech-study.png',
    },
    {
      id: 8,
      label: '기획 스터디',
      src: '/images/study/pm-study.png',
    },
    {
      id: 9,
      label: '스프링 스터디',
      src: '/images/study/spring-study-2.png',
    },
  ],

  [
    {
      id: 8,
      label: '이걸 왜 직접 만드나요?',
      src: '/images/study/crafting-study.png',
    },
    {id: 9, label: 'UX 분석 스터디', src: '/images/study/ux-study.png'},
    {
      id: 10,
      label: '아티클 스터디',
      src: '/images/study/article-study.png',
    },
    {
      id: 11,
      label: '아티클 스터디',
      src: '/images/study/article-study-2.png',
    },
    {
      id: 12,
      label: '코틀린 스터디',
      src: '/images/study/kotlin-study.png',
    },
  ],
];
