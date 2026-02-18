'use client';

import RecruitmentLayout from '@/components/layout/RecruitmentLayout';
import {Spinner} from '@repo/ui/components/spinner/Spinner';
// import {useRecruitmentStatusQuery} from '@/hooks/queries/useRecruitmentStatus.query';

// mock
const isLoading = false;
const isRecruiting = true;

export const ActionContainer = () => {
  // const {data: recruitmentStatus, isLoading} = useRecruitmentStatusQuery();
  // const isRecruiting = recruitmentStatus?.isActive ?? false;

  if (isLoading) {
    return (
      <div className='flex h-screen w-full items-center justify-center bg-[#010101]'>
        <Spinner />
      </div>
    );
  }

  return (
    <RecruitmentLayout
      isRecruiting={isRecruiting}
      backgroundColor='bg-[#010101]'
      visualStripSrc='/images/visual/recruitment-visual-strip-black.webp'
      limitVisualStripWidth={true}
    />
  );
};
