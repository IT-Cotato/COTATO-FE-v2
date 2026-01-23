import RecruitmentLayout from '@/components/layout/RecruitmentLayout';
import bottomBannerBg from '@/assets/backgrounds/recruitment-layout/visual-strip-bg.webp';

export const RecruitmentInactive = () => {
  return (
    <RecruitmentLayout
      statusText='코테이토 모집이 마감되었습니다!'
      descriptionText='모집 안내 예약 신청을 해주시면 누구보다 먼저 코테이토에 지원하실 수 있어요.'
      activateNotifyInput={true}
      bgColor='bg-neutral-50'
      bottomBannerBgImage={bottomBannerBg}
    />
  );
};
