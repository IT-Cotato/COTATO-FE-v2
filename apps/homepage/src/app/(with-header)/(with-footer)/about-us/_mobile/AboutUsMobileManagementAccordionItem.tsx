'use client';

import {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import Image from 'next/image';
import SmallLogoIcon from '@/assets/small-logo/small-logo.svg';

interface MobileTeamAccordionProps {
  title: string;
  description: string[];
}

export const AboutUsMobileManagementAccordionItem = ({
  title,
  description,
}: MobileTeamAccordionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className='relative w-81.75 overflow-hidden rounded-[10px] transition-all'>
      <Image
        src='/keycap/management-background.webp'
        alt=''
        aria-hidden='true'
        fill
        className='pointer-events-none object-cover'
      />

      <div className='relative z-10 w-full p-4'>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='flex w-full items-center gap-4.25 text-left'>
          <SmallLogoIcon className='w-6 text-white' />
          <span className='text-h4 text-white'>{title}</span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{height: 0, opacity: 0}}
              animate={{height: 'auto', opacity: 1}}
              exit={{height: 0, opacity: 0}}
              transition={{duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98]}}
              className='overflow-hidden'>
              <div className='flex flex-col gap-2 pt-4 pb-2'>
                {description.map((text, index) => (
                  <p
                    key={index}
                    className='text-body-l leading-relaxed text-white'>
                    {text}
                  </p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
