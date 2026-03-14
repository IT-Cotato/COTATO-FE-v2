'use client';

import {HomeSectionHeader} from '@/app/(with-header)/(with-footer)/(home)/_components/HomeSectionHeader';
import {HomeDesktopMainSchedule} from '@/app/(with-header)/(with-footer)/(home)/_desktop/_components/HomeDesktopMainSchedule';
import {HomeMobileMainSchedule} from '@/app/(with-header)/(with-footer)/(home)/_mobile/_components/HomeMobileMainSchedule';
import {
  FADE_IN_UP_CONTAINER,
  FADE_IN_UP_ITEM,
} from '@/constants/animation/motion-variants';
import {motion} from 'framer-motion';

export const HomeMainScheduleContainer = () => {
  return (
    <section className='flex flex-col items-center'>
      <motion.div
        variants={FADE_IN_UP_CONTAINER}
        initial='hidden'
        whileInView='visible'
        viewport={{once: false, amount: 0.1}}
        className='flex w-full flex-col items-center gap-10 lg:gap-17.5'>
        <motion.div variants={FADE_IN_UP_ITEM}>
          <HomeSectionHeader
            mainHeading='Main Schedule'
            subHeading='주요 활동일정'
          />
        </motion.div>
        <motion.div
          variants={FADE_IN_UP_ITEM}
          className='flex w-full justify-center'>
          <div className='xl:hidden'>
            <HomeMobileMainSchedule />
          </div>
          <div className='hidden xl:block'>
            <HomeDesktopMainSchedule />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
