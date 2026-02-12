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
    <div className='flex min-h-175 flex-col items-center gap-25 py-20'>
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
                className='overflow-hidden rounded-[20px] bg-white shadow-2xl'>
                <div className='relative h-full w-full'>
                  <Image
                    src={project.imageSrc}
                    alt={project.title}
                    fill
                    className='object-cover'
                    priority={isActive}
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
        onClick={handleProjectMoreViewClick}>
        프로젝트 더보기
      </button>
    </div>
  );
};

const PROJECTS = [
  {
    id: 1,
    title: '프로젝트 A',
    imageSrc: 'https://picsum.photos/400/600?random=1',
  },
  {
    id: 2,
    title: '프로젝트 B',
    imageSrc: 'https://picsum.photos/400/600?random=2',
  },
  {
    id: 3,
    title: '프로젝트 C',
    imageSrc: 'https://picsum.photos/400/600?random=3',
  },
  {
    id: 4,
    title: '프로젝트 D',
    imageSrc: 'https://picsum.photos/400/600?random=4',
  },
  {
    id: 5,
    title: '프로젝트 E',
    imageSrc: 'https://picsum.photos/400/600?random=5',
  },
  {
    id: 6,
    title: '프로젝트 F',
    imageSrc: 'https://picsum.photos/400/600?random=6',
  },
  {
    id: 7,
    title: '프로젝트 G',
    imageSrc: 'https://picsum.photos/400/600?random=7',
  },
  {
    id: 8,
    title: '프로젝트 H',
    imageSrc: 'https://picsum.photos/400/600?random=8',
  },
  {
    id: 9,
    title: '프로젝트 I',
    imageSrc: 'https://picsum.photos/400/600?random=9',
  },
];
