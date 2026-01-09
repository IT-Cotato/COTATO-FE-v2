import {AdminReviewTabs} from '@/app/admin/(no-sidebar)/applications/[id]/_components/AdminReviewTabs';
import {ApplicationDetailContainer} from '@/app/admin/(no-sidebar)/applications/[id]/_components/ApplicationDetailContainer';
import {ApplicationDetailHeader} from '@/app/admin/(no-sidebar)/applications/[id]/_components/ApplicationDetailHeader';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';

export default function ApplicationDetailPage() {
  return (
    <section className='flex w-full flex-col gap-17.5'>
      <ApplicationDetailHeader />
      <SuspenseWrapper>
        <AdminReviewTabs />
        <ApplicationDetailContainer />
      </SuspenseWrapper>
    </section>
  );
}
