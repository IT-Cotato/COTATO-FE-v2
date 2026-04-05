'use client';

import Image from 'next/image';
import {QualificationList} from '@/app/(with-header)/(with-footer)/recruit/_desktop/_components/QualificationList';
import {PositionList} from '@/app/(with-header)/(with-footer)/recruit/_desktop/_components/PositionList';
import {ActivityList} from '@/app/(with-header)/(with-footer)/recruit/_components/ActivityList';
import {FaqContainer} from '@/app/(with-header)/(with-footer)/recruit/_containers/FaqContainer';
import {useRecruitmentNoticeQuery} from '@/hooks/queries/useRecruit.query';

export const ContentContainer = () => {
  const {data} = useRecruitmentNoticeQuery();

  const dataPosition = data?.parts;
  const dataActivity = data?.activities;

  return (
    <div className='relative w-full overflow-hidden'>
      {/* dimd */}
      <div className='absolute hidden h-271.25 w-full bg-linear-to-b from-[#010101] from-20% to-transparent to-100% lg:block' />

      {/* object */}
      <Image
        src='/images/recruitment/recruitment-background-object-1.webp'
        alt=''
        aria-hidden={true}
        draggable={false}
        width={817}
        height={1052}
        className='absolute top-144.25 left-0 hidden lg:block'
      />
      <Image
        src='/images/recruitment/recruitment-background-object-2.webp'
        alt=''
        aria-hidden={true}
        draggable={false}
        width={817}
        height={1052}
        className='absolute top-401.25 right-0 hidden lg:block'
      />

      {/* content */}
      <div className='relative z-1 flex w-full flex-col gap-45 pt-73 pb-23'>
        <QualificationList />
        <PositionList parts={dataPosition} />
        <ActivityList activities={dataActivity} />
        <FaqContainer />
      </div>
    </div>
  );
};
