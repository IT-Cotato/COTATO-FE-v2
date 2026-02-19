import Image from 'next/image';
import {QualificationList} from '@/app/(with-header)/(with-footer)/recruit/_components/QualificationList';
import {PositionList} from '@/app/(with-header)/(with-footer)/recruit/_components/PositionList';
import {ActivityList} from '@/app/(with-header)/(with-footer)/recruit/_components/ActivityList';
import {FaqContainer} from '@/app/(with-header)/(with-footer)/recruit/_containers/FaqContainer';

export const ContentContainer = () => {
  return (
    <div className='relative min-w-360 overflow-hidden'>
      {/* dimd */}
      <div className='absolute h-271.25 w-full bg-linear-to-b from-[#010101] from-20% to-transparent to-100%' />

      {/* object */}
      <Image
        src='/images/recruitment/recruitment-background-object-1.webp'
        alt=''
        aria-hidden={true}
        draggable={false}
        width={817}
        height={1052}
        className='absolute top-144.25 left-0'
      />
      <Image
        src='/images/recruitment/recruitment-background-object-2.webp'
        alt=''
        aria-hidden={true}
        draggable={false}
        width={817}
        height={1052}
        className='absolute top-401.25 right-0'
      />

      {/* content */}
      <div className='relative z-1 m-auto flex w-360 flex-col gap-45 px-30.25 pt-73 pb-23'>
        <QualificationList />
        <PositionList />
        <ActivityList />
        <FaqContainer />
      </div>
    </div>
  );
};
