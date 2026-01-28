import {ContentArea} from '@/app/(with-footer)/recruit/_components/ContentArea';
import {RecruitmentActionSection} from '@/app/(with-footer)/recruit/_components/RecruitmentActionSection';

export default function RecruitmentNoticePage() {
  return (
    <section className='flex w-full min-w-min flex-col items-center bg-white'>
      <RecruitmentActionSection />
      <ContentArea />
    </section>
  );
}
