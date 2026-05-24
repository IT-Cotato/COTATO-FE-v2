'use client';

import {motion} from 'framer-motion';
import clsx from 'clsx';
import {
  FADE_IN_UP_CONTAINER,
  FADE_IN_UP_ITEM,
} from '../../constants/motion-variants';

export interface HeroMainBannerProps {
  subheading?: string;
  heading: React.ReactNode;
  headingStyle?: string;
  /** paddingVertical이 true이면 웹 79px, 모바일 59px 적용 / false이거나 없으면 104px 적용 */
  paddingVertical?: boolean;
  bannerImage: React.ReactNode;
}

const HeroMainBanner = ({
  subheading,
  heading,
  headingStyle,
  paddingVertical,
  bannerImage,
}: HeroMainBannerProps) => {
  return (
    <aside
      role='banner'
      className={clsx(
        'relative w-full overflow-hidden px-10 lg:h-61 lg:px-60',
        paddingVertical ? 'h-50 py-[59px] lg:py-[79px]' : 'h-auto py-[104px]'
      )}>
      {bannerImage && <>{bannerImage}</>}

      <div
        className='absolute inset-0 h-full w-full bg-[#000000]/60'
        aria-hidden='true'
      />

      <motion.div
        className='relative z-10 flex flex-col gap-2.5 lg:gap-6'
        variants={FADE_IN_UP_CONTAINER}
        initial='hidden'
        animate='visible'>
        {subheading && (
          <motion.p
            className='text-h5 lg:text-h4 whitespace-nowrap text-neutral-400'
            variants={FADE_IN_UP_ITEM}>
            {subheading}
          </motion.p>
        )}

        <motion.h1
          className={clsx(
            'text-h5 lg:text-h3 w-min font-bold whitespace-nowrap text-neutral-100',
            headingStyle
          )}
          variants={FADE_IN_UP_ITEM}>
          {heading}
        </motion.h1>
      </motion.div>
    </aside>
  );
};

export default HeroMainBanner;
