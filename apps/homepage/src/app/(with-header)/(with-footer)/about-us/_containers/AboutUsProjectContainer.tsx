'use client';

import {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {ROUTES} from '@/constants/routes';
import {AboutUsDescription} from '@/app/(with-header)/(with-footer)/about-us/_components/AboutUsDescription';

export const AboutUsProjectContainer = () => {
  const middleIndex = Math.floor(PROJECTS.length / 2);
  const [index, setIndex] = useState<number>(middleIndex);
  const router = useRouter();

  const handleProjectMoreViewClick = () => {
    router.push(ROUTES.PROJECT);
  };

  return (
    <section
      className='flex min-h-175 flex-col items-center gap-25 py-20'
      aria-label='코테이토 프로젝트 소개'
      id='project'>
      <AboutUsDescription
        title='코테이토의 프로젝트를 소개합니다'
        subTitle='함께 만들어 도착한, COTATO의 프로젝트를 만나보세요'
        titleColor='text-neutral-800'
        subTitleColor='text-neutral-500'
      />

      <div className='relative flex h-125 w-full max-w-360 items-center justify-center perspective-distant'>
        <div className='relative flex h-full w-full items-center justify-center transform-3d'>
          {PROJECTS.map((project, i) => {
            const offset = i - index;
            const absOffset = Math.abs(offset);
            const isActive = i === index;

            return (
              <motion.div
                key={project.id}
                initial={false}
                role='button'
                tabIndex={isActive ? 0 : -1}
                aria-label={`${project.title} 프로젝트 상세보기`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setIndex(i);
                  if (e.key === 'ArrowRight')
                    setIndex((prev) => Math.min(prev + 1, PROJECTS.length - 1));
                  if (e.key === 'ArrowLeft')
                    setIndex((prev) => Math.max(prev - 1, 0));
                }}
                animate={{
                  x: offset * 300,
                  z: isActive ? 0 : -150,
                  rotateY: offset === 0 ? 0 : offset > 0 ? -50 : 50,
                  scale: isActive ? 1 : 0.75,
                  opacity: absOffset > 2 ? 0 : 1,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 250,
                  damping: 25,
                }}
                onClick={() => setIndex(i)}
                style={{
                  position: 'absolute',
                  width: '436px',
                  height: '437px',
                  zIndex: 10 - absOffset,
                  cursor: 'pointer',
                }}
                aria-hidden={!isActive && absOffset > 1}
                className='overflow-hidden rounded-[20px] bg-white shadow-2xl'>
                <div className='relative h-full w-full'>
                  <Image
                    src={project.imageSrc}
                    alt=''
                    aria-hidden='true'
                    fill
                    className='object-cover'
                    priority={isActive}
                    unoptimized={true}
                  />

                  {!isActive && (
                    <motion.div
                      initial={{opacity: 0.4}}
                      animate={{opacity: 0.4}}
                      className='absolute inset-0 bg-black'
                    />
                  )}

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: 10}}
                        className='absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 via-black/40 to-transparent p-6.5'>
                        <p className='text-h3 font-bold text-white'>
                          {project.title}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <button
        className='text-h5 text-neutral-600'
        onClick={handleProjectMoreViewClick}
        aria-label='코테이토 전체 프로젝트 목록 페이지로 이동'>
        프로젝트 더보기
      </button>
    </section>
  );
};

const PROJECTS = [
  {
    id: 1,
    title: '온길',
    imageSrc: '/images/project/ongil.png',
  },
  {
    id: 2,
    title: '냉잔고',
    imageSrc: '/images/project/naengjango.png',
  },
  {
    id: 3,
    title: 'SIMTALK',
    imageSrc: '/images/project/simtalk.png',
  },
  {
    id: 4,
    title: 'COOKEEP',
    imageSrc: '/images/project/cookeep.png',
  },
  {
    id: 5,
    title: 'FinSight',
    imageSrc: '/images/project/finsight.png',
  },
  {
    id: 6,
    title: 'timetile',
    imageSrc: '/images/project/timetile.png',
  },
  {
    id: 7,
    title: 'StageMate',
    imageSrc: '/images/project/stagemate.png',
  },
  {
    id: 8,
    title: 'Troublog',
    imageSrc: '/images/project/troublog.png',
  },
];
