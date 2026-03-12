'use client';

import {Project} from '@/app/(with-header)/(with-footer)/about-us/_containers/AboutUsProjectContainer';
import {motion} from 'framer-motion';
import Image from 'next/image';

export const AboutUsMobileProjectContainer = ({
  projects,
}: {
  projects: Project[];
}) => {
  const duplicatedProjects = [...projects, ...projects, ...projects];

  return (
    <div className='z-10 block w-full overflow-hidden xl:hidden'>
      <motion.div
        className='flex gap-4'
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
