'use client';

import {AboutUsProject} from '@/app/(with-header)/(with-footer)/about-us/_containers/AboutUsProjectContainer';
import {AnimatePresence, motion} from 'framer-motion';
import Image from 'next/image';
import {useState} from 'react';

interface AboutUsDesktopProjectContainerProps {
  projects: AboutUsProject[];
}

export const AboutUsDesktopProjectContainer = ({
  projects,
}: AboutUsDesktopProjectContainerProps) => {
  const middleIndex = Math.floor(projects.length / 2);
  const [index, setIndex] = useState<number>(middleIndex);

  return (
    <div className='relative flex h-125 w-full max-w-360 items-center justify-center overflow-visible perspective-distant'>
      <button
        onClick={() => setIndex((prev) => Math.max(0, prev - 1))}
        className='absolute top-0 left-0 z-20 h-full w-[calc(50%-218px)] cursor-pointer bg-transparent'
        aria-label='이전 프로젝트'
      />
      <button
        onClick={() =>
          setIndex((prev) => Math.min(projects.length - 1, prev + 1))
        }
        className='absolute top-0 right-0 z-20 h-full w-[calc(50%-218px)] cursor-pointer bg-transparent'
        aria-label='다음 프로젝트'
      />

      <div className='relative flex h-full w-full items-center justify-center transform-3d'>
        {projects.map((project, i) => {
          const offset = i - index;
          const absOffset = Math.abs(offset);
          const isActive = i === index;

          return (
            <motion.div
              key={project.id}
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
              style={{
                position: 'absolute',
                width: '436px',
                height: '437px',
                zIndex: 10 - absOffset,
                transformStyle: 'preserve-3d',
                pointerEvents: 'none',
              }}
              className='rounded-[20px]'>
              <div className='pointer-events-none relative h-full w-full overflow-hidden rounded-[20px] bg-white shadow-2xl'>
                <Image
                  src={project.imageSrc}
                  alt=''
                  fill
                  sizes='436px'
                  className='object-cover'
                  priority={isActive}
                  unoptimized={true}
                />

                {!isActive && (
                  <div className='absolute inset-0 bg-black opacity-40' />
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
  );
};
