'use client';

import {AboutUsTickerColumn} from '@/app/(with-header)/(with-footer)/about-us/_components/AboutUsTickerColumn';

export const AboutUsStudyContainer = () => {
  return (
    <section className='flex flex-col items-center gap-15 overflow-hidden py-40'>
      <h3 className='text-h3 text-neutral-800'>
        코테이토의 스터디를 소개합니다
      </h3>

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

/** TODO: 추후 데이터 조회로 변경 */
const STUDY_GROUPS = [
  [
    {
      id: 101,
      label: 'React 스터디',
      src: 'https://picsum.photos/400/600?random=11',
    },
    {
      id: 102,
      label: 'Next.js 딥다이브',
      src: 'https://picsum.photos/400/600?random=12',
    },
    {id: 103, label: 'CS 기초', src: 'https://picsum.photos/400/600?random=13'},
    {
      id: 104,
      label: '알고리즘',
      src: 'https://picsum.photos/400/600?random=14',
    },
  ],

  [
    {
      id: 201,
      label: 'UI/UX 디자인',
      src: 'https://picsum.photos/400/600?random=21',
    },
    {
      id: 202,
      label: 'Nest.js 백엔드',
      src: 'https://picsum.photos/400/600?random=22',
    },
    {
      id: 203,
      label: 'Typescript',
      src: 'https://picsum.photos/400/600?random=23',
    },
    {
      id: 204,
      label: '자료구조',
      src: 'https://picsum.photos/400/600?random=24',
    },
  ],

  [
    {
      id: 301,
      label: '기획 프로젝트',
      src: 'https://picsum.photos/400/600?random=31',
    },
    {id: 302, label: 'Node.js', src: 'https://picsum.photos/400/600?random=32'},
    {
      id: 303,
      label: 'Figma 마스터',
      src: 'https://picsum.photos/400/600?random=33',
    },
    {
      id: 304,
      label: '데이터베이스',
      src: 'https://picsum.photos/400/600?random=34',
    },
  ],
];
