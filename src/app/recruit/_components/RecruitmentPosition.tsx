import Image from 'next/image';
import DefaultBg from '@/assets/backgrounds/recruitment-position/default-bg.webp';
import BrandLogo from '@/assets/brand-logo/brand-logo.svg';
import clsx from 'clsx';
import {RECRUITMENT_POSITION_STYLES} from '@/constants/recruit/recruit-components';

export const RecruitmentPosition = () => {
  return (
    <div
      className={clsx(
        'group relative flex h-100 w-71.25 flex-col justify-between rounded-[10px] bg-linear-to-b from-neutral-800 to-neutral-700 p-7.5 transition-colors duration-300 select-none',
        RECRUITMENT_POSITION_STYLES['PM']
      )}>
      <Image
        src={DefaultBg}
        alt='RecruitmentPosition Background'
        layout='fill'
        objectFit='cover'
        objectPosition='center'
        draggable={false}
        className='opacity-100 transition-opacity duration-300 group-hover:opacity-0'
      />

      <div className='flex flex-col gap-2.5'>
        <BrandLogo className='z-1 h-5 w-5 fill-neutral-50 transition-colors duration-300 group-hover:fill-neutral-800' />
        <p className='z-1 text-h3 text-neutral-50 transition-colors duration-300 group-hover:text-neutral-800'>
          Product Manager
        </p>
      </div>

      <p className='z-1 mb-7.5 text-body-l text-neutral-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
        서비스의 비전을 기획하고 팀을 리드하는 역할입니다. 사용자 중심 사고를
        바탕으로 문제를 정의하고, 협업을 통해 서비스를 완성합니다.
      </p>
    </div>
  );
};
