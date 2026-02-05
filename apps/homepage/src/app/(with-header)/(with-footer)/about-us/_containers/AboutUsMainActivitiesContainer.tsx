'use client';

import Image from 'next/image';
import {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import AboutUsBackgroundSecond from '@/assets/about-us/background-about-us-second.svg';
/** 추후 서버 데이터 조회 */
const ACTIVITIES = [
  {
    id: 1,
    title: 'CS 교육',
    description: 'CS 교육에 대한 설명이 들어갑니다.',
    src: 'https://picsum.photos/800/600?random=1',
    className: 'col-span-1 h-[487px] w-[718px]',
  },
  {
    id: 2,
    title: 'CS 퀴즈',
    description: 'CS 퀴즈에 대한 설명이 들어갑니다.',
    src: 'https://picsum.photos/800/600?random=2',
    className: 'col-span-1 h-[487px] w-[496px]',
  },
  {
    id: 3,
    title: '기획-디자인 10분 발표',
    description: '기획-디자인 10분 발표에 대한 설명이 들어갑니다.',
    src: 'https://picsum.photos/800/600?random=3',
    className: 'col-span-1 h-[487px] w-[496px]',
  },
  {
    id: 4,
    title: '네트워킹',
    description: '네트워킹에 대한 설명이 들어갑니다.',
    src: 'https://picsum.photos/800/600?random=4',
    className: 'col-span-1 h-[487px] w-[718px]',
  },
];

export const AboutUsMainActivitiesContainer = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const rows = [
    [ACTIVITIES[0], ACTIVITIES[1]],
    [ACTIVITIES[2], ACTIVITIES[3]],
  ];

  const selectedActivity = ACTIVITIES.find((a) => a.id === selectedId);

  return (
    <section className='relative flex w-full flex-col items-center gap-25 overflow-hidden py-40'>
      <div className='absolute inset-0 z-0'>
        <AboutUsBackgroundSecond className='h-full w-full object-cover' />
      </div>

      <h2 className='text-h3 z-10 text-white'>
        코테이토의 메인 활동을 소개합니다
      </h2>

      <div className='flex flex-col gap-7.5'>
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className='flex gap-7.5'>
            {row.map((activity) => (
              <motion.div
                key={activity.id}
                layoutId={`card-${activity.id}`}
                onClick={() => setSelectedId(activity.id)}
                className={`group relative h-121.75 cursor-pointer overflow-hidden rounded-[20px] ${activity.className.match(/w-\[\d+px\]/)?.[0]}`}>
                <motion.div className='relative h-full w-full'>
                  <Image
                    src={activity.src}
                    alt={activity.title}
                    fill
                    className='object-cover'
                  />
                  <div className='absolute inset-0 z-10 bg-linear-to-t from-black/70 via-black/20 to-transparent' />
                  <motion.h3
                    layoutId={`title-${activity.id}`}
                    className='text-h3 absolute top-10 left-10 z-20 font-bold text-white'>
                    {activity.title}
                  </motion.h3>
                </motion.div>
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      {/* --- App Store 스타일 모달 --- */}
      <AnimatePresence>
        {selectedId && selectedActivity && (
          <div className='fixed inset-0 z-50 flex items-center justify-center'>
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              onClick={() => setSelectedId(null)}
              className='pointer-events-auto absolute inset-0 bg-black/60 backdrop-blur-sm'
            />

            <motion.div
              layoutId={`card-${selectedId}`}
              onClick={(e) => e.stopPropagation()}
              className='pointer-events-auto relative z-50 h-[80vh] w-274.5 overflow-hidden rounded-[26px] bg-neutral-600 text-black'>
              <div className='relative h-125 w-full'>
                <Image
                  src={selectedActivity.src}
                  alt={selectedActivity.title}
                  fill
                  className='object-cover'
                />
                <div className='absolute inset-0 bg-linear-to-t from-black/60 to-transparent' />
                <motion.h3
                  layoutId={`title-${selectedId}`}
                  className='text-h2 absolute top-20 left-20 text-white'>
                  {selectedActivity.title}
                </motion.h3>
              </div>

              <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0}}
                className='overflow-y-auto p-10'>
                <p className='text-h3 leading-relaxed text-white'>
                  {selectedActivity.description}
                </p>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
