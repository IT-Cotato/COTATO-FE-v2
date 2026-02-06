'use client';

import Image from 'next/image';
import {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import AboutUsBackgroundSecond from '@/assets/about-us/background-about-us-second.svg';

const ACTIVITIES = [
  {
    id: 1,
    title: 'CS 교육',
    description: 'CS 교육에 대한 설명이 들어갑니다.',
    src: 'https://picsum.photos/800/600?random=1',
    gridClass: 'col-span-12 md:col-span-7',
  },
  {
    id: 2,
    title: 'CS 퀴즈',
    description: 'CS 퀴즈에 대한 설명이 들어갑니다.',
    src: 'https://picsum.photos/800/600?random=2',
    gridClass: 'col-span-12 md:col-span-5',
  },
  {
    id: 3,
    title: '기획-디자인 10분 발표',
    description: '기획-디자인 10분 발표에 대한 설명이 들어갑니다.',
    src: 'https://picsum.photos/800/600?random=3',
    gridClass: 'col-span-12 md:col-span-5',
  },
  {
    id: 4,
    title: '네트워킹',
    description: '네트워킹에 대한 설명이 들어갑니다.',
    src: 'https://picsum.photos/800/600?random=4',
    gridClass: 'col-span-12 md:col-span-7',
  },
];

export const AboutUsMainActivitiesContainer = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedActivity = ACTIVITIES.find((a) => a.id === selectedId);

  return (
    <section className='relative flex w-full flex-col items-center gap-10 overflow-hidden bg-[linear-gradient(180deg,#010101_13.94%,rgba(1,1,1,0)_100%)] py-20 md:gap-25 md:py-40'>
      <div className='pointer-events-none absolute inset-0 z-0'>
        <AboutUsBackgroundSecond className='absolute -right-20 h-full w-auto opacity-50 md:-right-100 md:opacity-100' />
      </div>

      <h2 className='text-h3 z-10 px-4 text-center text-white'>
        코테이토의 메인 활동을 소개합니다
      </h2>

      {/* Grid Container: 12컬럼 시스템 */}
      <div className='z-10 grid w-full max-w-310 grid-cols-12 gap-4 px-6 md:gap-7.5'>
        {ACTIVITIES.map((activity) => (
          <motion.div
            key={activity.id}
            layoutId={`card-${activity.id}`}
            onClick={() => setSelectedId(activity.id)}
            className={`group relative cursor-pointer overflow-hidden rounded-[20px] shadow-lg ${activity.gridClass} aspect-auto h-121.75`}>
            <motion.div className='relative h-full w-full'>
              <Image
                src={activity.src}
                alt={activity.title}
                fill
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 700px'
                className='object-cover transition-transform duration-500 group-hover:scale-105'
              />
              <div className='absolute inset-0 z-10 bg-linear-to-t from-black/80 via-black/20 to-transparent' />
              <motion.h3
                layoutId={`title-${activity.id}`}
                className='text-h3 absolute top-10 left-10 z-20 font-bold text-white'>
                {activity.title}
              </motion.h3>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* --- App Store 스타일 모달 --- */}
      <AnimatePresence>
        {selectedId && selectedActivity && (
          <div className='fixed inset-0 z-50 flex items-center justify-center p-10'>
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              onClick={() => setSelectedId(null)}
              className='absolute inset-0 bg-black/80 backdrop-blur-md'
            />

            <motion.div
              onClick={() => setSelectedId(null)}
              layoutId={`card-${selectedId}`}
              className='relative z-50 flex h-full max-h-[70%] w-full max-w-250 flex-col overflow-hidden rounded-[26px] bg-neutral-600 text-white'>
              <div className='relative h-[40%] min-h-62.5 w-full md:h-[60%]'>
                <Image
                  src={selectedActivity.src}
                  alt={selectedActivity.title}
                  fill
                  className='object-cover'
                />
                <div className='absolute inset-0 bg-linear-to-t from-neutral-900 to-transparent' />
                <motion.h2
                  layoutId={`title-${selectedId}`}
                  className='text-h2 absolute top-20 left-20'>
                  {selectedActivity.title}
                </motion.h2>
              </div>

              <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0}}
                className='custom-scrollbar flex-1 overflow-y-auto p-10'>
                <p className='text-h3 leading-relaxed opacity-90'>
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
