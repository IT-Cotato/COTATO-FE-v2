'use client';

import {useState, useRef} from 'react';
import Collaboration from '@/assets/home/core-value/collaboration.svg';
import Ownership from '@/assets/home/core-value/ownership.svg';
import Growth from '@/assets/home/core-value/growth.svg';
import {HomeSectionHeader} from '@/app/(with-header)/(with-footer)/(home)/_components/HomeSectionHeader';
import {
  FADE_IN_UP_CONTAINER,
  FADE_IN_UP_ITEM,
} from '@/constants/animation/motion-variants';
import {motion} from 'framer-motion';

export const HomeCoreValue = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const scrollRef = useRef<HTMLUListElement>(null);

  const items = [
    {
      defaultIcon: Collaboration,
      title: 'Code Together',
      desc: '함께 성장하는 협업',
    },
    {
      defaultIcon: Ownership,
      title: 'Own the Trip',
      desc: '주도적으로 만들어가는 여정',
    },
    {
      defaultIcon: Growth,
      title: 'Arrive Together',
      desc: '함께 도전하며 도착하는 경험',
    },
  ];

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const {scrollLeft, offsetWidth} = scrollRef.current;
    const index = Math.round(scrollLeft / offsetWidth);
    setActiveIndex(index);
  };

  return (
    <section
      className='flex flex-col gap-10 lg:gap-17.5'
      aria-labelledby='core-value'>
      <div id='core-value' className='scroll-mt-40' />

      <motion.div
        variants={FADE_IN_UP_CONTAINER}
        initial='hidden'
        whileInView='visible'
        viewport={{once: false, amount: 0.2}}
        className='flex flex-col gap-10 lg:gap-17.5'>
        <motion.div variants={FADE_IN_UP_ITEM}>
          <HomeSectionHeader mainHeading='Core Value' subHeading='핵심 가치' />
        </motion.div>

        <div className='relative w-full overflow-hidden'>
          <motion.ul
            ref={scrollRef}
            onScroll={handleScroll}
            variants={FADE_IN_UP_CONTAINER}
            className='scrollbar-hide flex snap-x snap-mandatory flex-row gap-7.5 overflow-x-auto overscroll-x-contain lg:justify-center lg:overflow-x-visible'
            role='list'>
            {items.map((item, idx) => (
              <motion.li
                key={idx}
                variants={FADE_IN_UP_ITEM}
                className='flex min-w-full snap-center flex-col items-center lg:min-w-70 lg:snap-align-none'>
                <div className='relative h-auto w-auto' aria-hidden='true'>
                  <item.defaultIcon className='h-50 w-50 lg:h-75 lg:w-75' />
                </div>
                <div className='mt-3 flex flex-col items-center gap-2 lg:gap-3'>
                  <h3 className='text-h3 font-bold whitespace-nowrap text-neutral-600'>
                    {item.title}
                  </h3>
                  <p className='text-h5 whitespace-nowrap text-neutral-400'>
                    {item.desc}
                  </p>
                </div>
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            variants={FADE_IN_UP_ITEM}
            className='mt-8 flex justify-center gap-2.25 lg:hidden'>
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  scrollRef.current?.scrollTo({
                    left: scrollRef.current.offsetWidth * idx,
                    behavior: 'smooth',
                  });
                }}
                className={`h-1 w-1 rounded-full transition-all ${
                  activeIndex === idx ? 'bg-neutral-600' : 'bg-neutral-200'
                }`}
                aria-label={`${idx + 1}번 슬라이드로 이동`}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
