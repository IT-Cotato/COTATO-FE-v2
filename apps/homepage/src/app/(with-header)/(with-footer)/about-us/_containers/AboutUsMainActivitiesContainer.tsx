'use client';

import Image from 'next/image';
import {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import AboutUsBackgroundSecond from '@/assets/about-us/background-about-us-second.svg';
import {AboutUsDescription} from '@/app/(with-header)/(with-footer)/about-us/_components/AboutUsDescription';

export const AboutUsMainActivitiesContainer = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedActivity = ACTIVITIES.find((a) => a.id === selectedId);

  return (
    <div
      className='relative flex w-full flex-col items-center gap-25 overflow-hidden bg-[linear-gradient(180deg,#010101_13.94%,rgba(1,1,1,0)_100%)] py-20 md:gap-25 md:py-40'
      id='main-activities'>
      <div className='pointer-events-none absolute inset-0 z-0'>
        <AboutUsBackgroundSecond className='absolute -right-20 h-full w-auto opacity-50 md:-right-100 md:opacity-100' />
      </div>

      <AboutUsDescription
        title='코테이토의 활동을 소개합니다'
        subTitle='다양한 활동을 통해 직군별 역량과 협업 경험을 동시에 쌓습니다.'
        titleColor='text-white'
        subTitleColor='text-neutral-300'
      />

      <div className='z-10 grid w-full max-w-310 grid-cols-12 gap-4 px-6 md:gap-7.5'>
        {ACTIVITIES.map((activity) => (
          <motion.div
            key={activity.id}
            layoutId={`card-${activity.id}`}
            onClick={() => setSelectedId(activity.id)}
            style={{borderRadius: '20px'}}
            className={`group relative cursor-pointer overflow-hidden bg-neutral-600 shadow-lg ${activity.gridClass} h-121.75`}>
            <motion.div
              layoutId={`image-container-${activity.id}`}
              className='relative h-full w-full'>
              <Image
                src={activity.src}
                alt={activity.title}
                fill
                unoptimized={true}
                className='object-cover transition-transform duration-500 group-hover:scale-105'
              />
              <div className='absolute inset-0 z-10 bg-black/40' />
              <motion.h3
                layoutId={`title-${activity.id}`}
                className='text-h3 absolute top-10 left-10 z-20 font-bold text-white'>
                {activity.title}
              </motion.h3>
            </motion.div>

            <motion.div
              layoutId={`content-${activity.id}`}
              className='h-0 overflow-hidden opacity-0'>
              <p>{activity.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && selectedActivity && (
          <div className='fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10'>
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              onClick={() => setSelectedId(null)}
              className='absolute inset-0 bg-black/60 backdrop-blur-md'
            />

            <motion.div
              layoutId={`card-${selectedId}`}
              style={{borderRadius: '30px'}}
              onClick={() => setSelectedId(null)}
              className='relative z-50 flex h-auto max-h-[90vh] w-full max-w-150 flex-col overflow-hidden bg-neutral-600 shadow-2xl'>
              <motion.div
                layoutId={`image-container-${selectedId}`}
                className='relative h-80 w-full shrink-0 overflow-hidden'>
                <motion.div
                  initial={{scale: 1.4}}
                  animate={{scale: 1.4}}
                  exit={{scale: 1}}
                  transition={{duration: 0.6, ease: [0.16, 1, 0.3, 1]}}
                  className='relative h-full w-full'>
                  <Image
                    src={selectedActivity.src}
                    alt={selectedActivity.title}
                    fill
                    unoptimized={true}
                    className='object-cover'
                  />
                </motion.div>

                <div className='absolute inset-0 bg-black/40' />

                <motion.h3
                  layoutId={`title-${selectedId}`}
                  className='text-h2 absolute top-10 left-10 z-10 font-bold text-white'>
                  {selectedActivity.title}
                </motion.h3>
              </motion.div>

              <motion.div
                layoutId={`content-${selectedId}`}
                layout='position'
                className='custom-scrollbar flex-1 overflow-y-auto p-8 md:p-12'>
                <motion.div
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  exit={{opacity: 0, transition: {duration: 0.1}}}
                  transition={{duration: 0.2, delay: 0.2}}>
                  <p className='text-h5 leading-relaxed font-medium whitespace-pre-wrap text-white/90'>
                    {selectedActivity.description}
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ACTIVITIES = [
  {
    id: 1,
    title: 'CS 교육',
    description: `CS 교육은 코테이토 교육팀의 커리큘럼을 기반으로 진행되며
개발에 필요한 핵심 CS 지식을 단계적으로 학습합니다. 
기획·디자인 직군 또한 교육에 함께 참여하여, 개발 구조와 기술적 제약을
이해하고 원활한 협업을 위한 공통된 개발 지식을 습득할 수 있습니다.`,

    src: '/images/main-activities/cs-education.png',
    gridClass: 'col-span-12 md:col-span-7',
  },
  {
    id: 2,
    title: 'CS 퀴즈',
    description: `CS 교육 이후에는 학습한 내용을 바탕으로 CS 퀴즈 타임이 진행됩니다.
우수한 성적을 거두거나 성실하게 참여한 분들께는 소정의 상품이 제공됩니다. 
모든 퀴즈는 교육 내용을 기반으로 출제되어, 기획·디자인 직군도 부담 없이
개발 지식을 복습하고 재미있게 익힐 수 있습니다.`,
    src: '/images/main-activities/cs-quiz.png',
    gridClass: 'col-span-12 md:col-span-5',
  },
  {
    id: 3,
    title: '기획 · 디자인 발표',
    description: `기획과 디자인 관련 다양한 주제를 자유롭게 다루며 
이를 통해 개인의 시야를 넓히고 지식을 축적하는 것을 목표로 합니다. 
개발 직군 역시 발표 내용을 함께 들으며 서로의 관점을 이해하고 
협업의 밀도를 높입니다.`,
    src: '/images/main-activities/pm-design.png',
    gridClass: 'col-span-12 md:col-span-5',
  },
  {
    id: 4,
    title: '네트워킹',
    description: `파트별로 모여 관련된 내용을 배우고 과제를 공유하며 피드백을 나눕니다. 
또한 통합 네트워킹을 통해 다른 파트의 작업 방식과 관점을 익힐 수 있습니다. 
이 과정을 통해 자신의 작업을 점검하고,
이후 학습과 프로젝트에 필요한 방향성을 정리하게 됩니다.`,
    src: '/images/main-activities/networking.png',
    gridClass: 'col-span-12 md:col-span-7',
  },
];
