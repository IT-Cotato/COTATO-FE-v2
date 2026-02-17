'use client';

import RecruitmentLayout from '@/components/layout/RecruitmentLayout';
import {Spinner} from '@repo/ui/components/spinner/Spinner';
import {useRecruitmentStatusQuery} from '@/hooks/queries/useRecruitmentStatus.query';
import RecruitmentNoticeBg from '@/assets/backgrounds/recruitment-layout/recruitment-notice-bg.webp';

export const RecruitmentActionSection = () => {
  const {data: recruitmentStatus, isLoading} = useRecruitmentStatusQuery();
  const isRecruiting = recruitmentStatus?.isActive ?? false;

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
      bgColor='bg-[#010101]'
      bgImage={RecruitmentNoticeBg}
    />
  );
};
