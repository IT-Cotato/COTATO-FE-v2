'use client';

import {AboutUsProject} from '@/app/(with-header)/(with-footer)/about-us/_containers/AboutUsProjectContainer';
import {motion} from 'framer-motion';
import Image from 'next/image';

interface AboutUsMobileProjectContainerProps {
  projects: AboutUsProject[];
}

export const AboutUsMobileProjectContainer = ({
  projects,
}: AboutUsMobileProjectContainerProps) => {
  const duplicatedProjects = [...projects, ...projects, ...projects];

  return (
    <div className='relative z-10 block w-full overflow-hidden xl:hidden'>
      <div className='pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-linear-to-r from-neutral-50 to-transparent' />

      <div className='pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-linear-to-l from-neutral-50 to-transparent' />

      <motion.div
        className='flex gap-4 px-4'
        animate={{
          x: ['0%', '-33.33%'],
        }}
        transition={{
          duration: 30,
          ease: 'linear',
          repeat: Infinity,
        }}
        style={{width: 'fit-content'}}>
        {duplicatedProjects.map((project, i) => (
          <div
            key={`${project.id}-${i}`}
            className='relative h-60 w-60 shrink-0 overflow-hidden rounded-lg bg-white shadow-lg'>
            <Image
              src={project.imageSrc}
              alt={project.title}
              fill
              unoptimized
              className='object-cover'
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};
