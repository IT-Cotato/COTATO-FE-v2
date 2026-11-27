'use client';

import Image from 'next/image';
import {
  ABOUT_US_ACTIVITIES as ACTIVITIES,
  type AboutUsActivity,
} from '@/constants/homepage-copy';
export type {AboutUsActivity} from '@/constants/homepage-copy';
import {useHomepageImagesQuery} from '@/hooks/queries/useHomepageImages.query';
import {useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
import AboutUsBackgroundSecond from '@/assets/about-us/background-about-us-second.webp';
import {AboutUsDescription} from '@/app/(with-header)/(with-footer)/about-us/_components/AboutUsDescription';
import {motion} from 'framer-motion';
import {
  FADE_IN_UP_CONTAINER,
  FADE_IN_UP_ITEM,
} from '@/constants/animation/motion-variants';
import {AboutUsDesktopMainActivitiesContainer} from '@/app/(with-header)/(with-footer)/about-us/_desktop/_containers/AboutUsDesktopMainActivitiesContainer';

const AboutUsMobileMainActivitiesContainer = dynamic(
  () =>
    import('@/app/(with-header)/(with-footer)/about-us/_mobile/_containers/AboutUsMobileMainActivitiesContainer').then(
      (m) => m.AboutUsMobileMainActivitiesContainer
    ),
  {ssr: false}
);

export const AboutUsMainActivitiesContainer = ({
  initialSlot,
}: {
  initialSlot?: AboutUsActivity['slot'];
}) => {
  const {data: images} = useHomepageImagesQuery();
  const activities = ACTIVITIES.map((activity) => {
    const saved = images?.find((image) => image.slot === activity.slot);
    return {
      ...activity,
      title: saved?.displayTitle ?? activity.title,
      description: saved?.displayDescription ?? activity.description,
    };
  });
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedId(null);
    };
    if (selectedId) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [selectedId]);

  return (
    <section
      className='relative flex w-full flex-col items-center justify-center gap-25 overflow-hidden bg-linear-to-b from-[#010101] from-30% via-white via-70% to-white py-35 lg:py-50'
      id='main-activities'>
      <Image
        src={AboutUsBackgroundSecond}
        alt=''
        aria-hidden={true}
        unoptimized={true}
        draggable={false}
        className='pointer-events-none absolute top-0 right-0 hidden h-auto w-[60vw] max-w-239 lg:block'
      />

      <motion.div
        className='z-10 flex w-full flex-col items-center justify-center gap-25'
        variants={FADE_IN_UP_CONTAINER}
        initial='hidden'
        whileInView='visible'
        viewport={{once: false, amount: 0.2}}>
        <motion.div variants={FADE_IN_UP_ITEM} className='w-full'>
          <AboutUsDescription
            title='코테이토의 활동을 소개합니다'
            subTitle='다양한 활동을 통해 직군별 역량과 협업 경험을 동시에 쌓습니다.'
            titleColor='text-white'
            subTitleColor='text-neutral-300'
          />
        </motion.div>

        <motion.div
          className='flex w-full items-center justify-center'
          variants={FADE_IN_UP_ITEM}>
          <AboutUsDesktopMainActivitiesContainer activities={activities} />
          <AboutUsMobileMainActivitiesContainer
            initialSlide={Math.max(
              0,
              ACTIVITIES.findIndex((activity) => activity.slot === initialSlot)
            )}
            activities={activities}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};
