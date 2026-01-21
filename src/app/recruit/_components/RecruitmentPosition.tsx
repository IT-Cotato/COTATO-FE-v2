import Image from 'next/image';
import DefaultBg from '@/assets/backgrounds/recruitment-position/default-bg.webp';
import BrandLogo from '@/assets/brand-logo/brand-logo.svg';
import clsx from 'clsx';
import {RECRUITMENT_POSITION_STYLES} from '@/constants/recruit/recruit-components';
import {RecruitmentPositionType} from '@/schemas/recruit/recruit-components.schema';

interface RecruitmentPositionProps {
  item: RecruitmentPositionType;
}

export const RecruitmentPosition = ({item}: RecruitmentPositionProps) => {
  return (
    <div
      className={clsx(
        'group relative flex h-100 w-71.25 flex-col justify-between rounded-[10px] bg-linear-to-b from-neutral-800 to-neutral-700 p-7.5 transition-colors duration-300 select-none',
        RECRUITMENT_POSITION_STYLES[item.short]
      )}>
      <Image
        src={DefaultBg}
        alt='RecruitmentPosition Background'
        fill={true}
        draggable={false}
        className='object-cover object-center opacity-100 transition-opacity duration-300 group-hover:opacity-0'
      />

      <div className='flex flex-col gap-2.5'>
        <BrandLogo className='z-1 h-5 w-5 fill-neutral-50 transition-colors duration-300 group-hover:fill-neutral-800' />
        <p className='z-1 text-h3 text-neutral-50 transition-colors duration-300 group-hover:text-neutral-800'>
          {item.name}
        </p>
      </div>

      <p className='z-1 mb-7.5 text-body-l wrap-anywhere whitespace-pre-line text-neutral-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
        {item.detail}
      </p>
    </div>
  );
};
