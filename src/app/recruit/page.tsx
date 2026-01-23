import {ContentArea} from '@/app/recruit/_components/ContentArea';
import {RecruitmentActionSection} from '@/app/recruit/_components/RecruitmentActionSection';

export default function RecruitmentNoticePage() {
  return (
    <section className='flex w-full min-w-min flex-col items-center bg-white'>
      <RecruitmentActionSection />
      <ContentArea />
    </section>
  );
}
