import RecruitmentLayout from '@/components/layout/RecruitmentLayout';
import bottomBannerBg from '@/assets/backgrounds/recruitment-layout/visual-strip-bg.webp';
import {useRecruitmentStatusQuery} from '@/hooks/queries/useRecruitmentStatus.query';

export const RecruitmentInactive = () => {
  const {data: recruitmentStatus} = useRecruitmentStatusQuery();
  const isRecruiting = recruitmentStatus?.isActive ?? false;

  return (
    <RecruitmentLayout
      isRecruiting={isRecruiting}
      bgColor='bg-neutral-50'
      bottomBannerImage={bottomBannerBg}
    />
  );
};
