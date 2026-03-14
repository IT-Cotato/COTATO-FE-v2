'use client';

import {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import {motion, AnimatePresence} from 'framer-motion';
import {AboutUsActivity} from '@/app/(with-header)/(with-footer)/about-us/_containers/AboutUsMainActivitiesContainer';

interface AboutUsDesktopMainActivitiesContainerProps {
  activities: AboutUsActivity[];
}

export const AboutUsDesktopMainActivitiesContainer = ({
  activities,
}: AboutUsDesktopMainActivitiesContainerProps) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedActivity = activities.find((a) => a.id === selectedId);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedId(null);
    };
    if (selectedId) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [selectedId]);

  useEffect(() => {
    if (selectedId !== null) modalRef.current?.focus();
  }, [selectedId]);

  return (
    <>
      <div className='z-10 hidden w-full max-w-310 grid-cols-12 gap-7.5 px-6 lg:grid'>
        {activities.map((activity) => (
          <motion.div
            key={activity.id}
            role='button'
            tabIndex={0}
            aria-haspopup='dialog'
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedId(activity.id);
              }
            }}
            layoutId={`card-${activity.id}`}
            onClick={() => setSelectedId(activity.id)}
            style={{borderRadius: '20px'}}
            className={`group relative h-121.75 cursor-pointer overflow-hidden bg-neutral-600 shadow-lg ${activity.gridClass}`}>
            <motion.div
              layoutId={`image-container-${activity.id}`}
              className='relative h-full w-full'>
              <Image
                src={activity.src}
                alt=''
                fill
                unoptimized
                aria-hidden='true'
                className='object-cover transition-transform duration-500 group-hover:scale-105'
              />
              <div className='absolute inset-0 z-10 bg-black/40' />
            </motion.div>
            <motion.h3
              layoutId={`title-${activity.id}`}
              className='text-h3 absolute top-10 left-10 z-20 font-bold text-white'>
              {activity.title}
            </motion.h3>
          </motion.div>
        ))}
      </div>

      {/* 모달 */}
      <AnimatePresence>
        {selectedId && selectedActivity && (
          <div className='fixed inset-0 z-50 hidden items-center justify-center p-10 lg:flex'>
            <motion.div
              aria-hidden='true'
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              onClick={() => setSelectedId(null)}
              className='absolute inset-0 bg-black/60 backdrop-blur-md'
            />
            <motion.div
              role='dialog'
              aria-modal='true'
              tabIndex={-1}
              ref={modalRef}
              aria-labelledby={`modal-title-${selectedId}`}
              aria-describedby={`modal-description-${selectedId}`}
              layoutId={`card-${selectedId}`}
              style={{borderRadius: '30px'}}
              className='relative z-50 flex h-auto max-h-[90vh] w-full max-w-150 cursor-pointer flex-col overflow-hidden bg-neutral-600 shadow-2xl'
              onClick={() => setSelectedId(null)}>
              <motion.div
                layoutId={`image-container-${selectedId}`}
                className='relative h-80 w-full shrink-0 overflow-hidden'>
                <motion.div
                  initial={{scale: 1.2}}
                  animate={{scale: 1.2}}
                  className='relative h-full w-full'>
                  <Image
                    src={selectedActivity.src}
                    alt=''
                    fill
                    unoptimized
                    className='object-cover'
                  />
                </motion.div>
                <div className='absolute inset-0 bg-black/40' />
              </motion.div>
              <motion.h3
                id={`modal-title-${selectedId}`}
                layoutId={`title-${selectedId}`}
                className='text-h2 absolute top-10 left-10 z-10 font-bold text-white'>
                {selectedActivity.title}
              </motion.h3>
              <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                className='custom-scrollbar flex-1 overflow-y-auto p-12'>
                <p
                  id={`modal-description-${selectedId}`}
                  className='text-h5 leading-relaxed font-medium whitespace-pre-wrap text-white/90'>
                  {selectedActivity.description}
                </p>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
