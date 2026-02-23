'use client';

import SmallLogo from '@/assets/small-logo/small-logo.svg';
import Image from 'next/image';
import {motion} from 'framer-motion';

interface AboutUsManagementTeamCardProps {
  title: string;
  description: string[];
}

export const AboutUsManagementTeamCard = ({
  title,
  description,
}: AboutUsManagementTeamCardProps) => {
  return (
    <div className='group relative h-93.5 w-67.5 cursor-pointer [perspective:1000px]'>
      <motion.div className='relative h-full w-full transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]'>
        <div className='absolute inset-0 [backface-visibility:hidden]'>
          <Image
            src='/keycap/management-background.svg'
            alt='background'
            fill
            className='object-cover'
          />
          <div className='absolute inset-0 flex flex-col items-center justify-between p-8'>
            <div className='flex flex-col items-center gap-2'>
              <SmallLogo className='group-hover:text-primary h-6.25 w-6.25 text-white transition-colors duration-300' />
              <span className='text-h3 text-white'>{title}</span>
            </div>
          </div>
        </div>

        <div className='absolute inset-0 h-full w-full [transform:rotateY(180deg)] overflow-hidden [backface-visibility:hidden]'>
          <Image
            src='/keycap/management-background-hover.svg'
            alt='background hover'
            fill
            className='object-cover'
          />

          <div className='absolute inset-0 flex flex-col items-center justify-center p-8'>
            <div className='flex flex-col gap-5'>
              {description.map((line, index) => (
                <div key={index} className='flex items-start gap-2.5'>
                  <span className='mt-2.5 h-1 w-1 shrink-0 rounded-full bg-white opacity-80' />
                  <p className='text-body-l leading-relaxed tracking-tight break-keep text-white'>
                    {line}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
