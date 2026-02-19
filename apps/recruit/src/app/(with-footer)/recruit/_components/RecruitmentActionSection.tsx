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
      <div className='flex h-screen w-full items-center justify-center bg-black'>
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {isRecruiting ? (
        <RecruitmentLayout
          statusText='코테이토 모집이 시작되었습니다!'
          descriptionText='지금 바로 지원하고 코테이토와 당신의 여정을 함께하세요!'
          activateApplyButton={true}
          bgColor='bg-black'
          bgImage={RecruitmentNoticeBg}
        />
      ) : (
        <RecruitmentLayout
          statusText='코테이토 모집이 곧 시작됩니다!'
          descriptionText='모집 안내 예약 신청을 해주시면 누구보다 먼저 코테이토에 지원하실 수 있어요.'
          activateNotifyInput={true}
          bgColor='bg-black'
          bgImage={RecruitmentNoticeBg}
        />
      )}
    </>
  );
};
