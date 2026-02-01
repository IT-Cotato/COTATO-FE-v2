import {AdminApplicationContainer} from '@/app/admin/(no-sidebar)/applications/[id]/_containers/AdminApplicationContainer';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';

export default function ApplicationDetailPage() {
  return (
    <section className='flex w-full flex-col gap-5'>
      <SuspenseWrapper>
        <AdminApplicationContainer />
      </SuspenseWrapper>
    </section>
  );
}
