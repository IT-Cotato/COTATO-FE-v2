import NotifyInput from '@/app/(home)/_components/NotifyInput';
import RecruitmentLayout from '@/components/layout/RecruitmentLayout';

export const RecruitmentInactive() => {
  return (
    <RecruitmentLayout
      statusText='코테이토 모집이 마감되었습니다!'
      descriptionText='모집 안내 예약 신청을 해주시면 누구보다 먼저 코테이토에 지원하실 수 있어요.'
      topAction={<NotifyInput />}
      bgImage='/background/visual-strip.svg'
    />
  );
}
