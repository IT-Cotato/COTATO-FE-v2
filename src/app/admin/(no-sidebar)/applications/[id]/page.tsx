import {AdminReviewTabs} from '@/app/admin/(no-sidebar)/applications/_components/AdminReviewTabs';
import {ApplicationDetailHeader} from '@/app/admin/(no-sidebar)/applications/_components/ApplicationDetailHeader';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';

export default function ApplicationDetailPage() {
  return (
    <section className='flex w-full flex-col gap-17.5'>
      <ApplicationDetailHeader />
      <SuspenseWrapper>
        <AdminReviewTabs />
      </SuspenseWrapper>
    </section>
  );
}
