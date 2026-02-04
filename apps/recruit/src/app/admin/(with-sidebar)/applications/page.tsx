import {AdminApplicationsContainer} from '@/app/admin/(with-sidebar)/applications/_containers/AdminApplicationsContainer';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';

export default function AdminApplicationPage() {
  return (
    <section className='flex flex-col p-12.5'>
      <div className='flex min-w-275 flex-col gap-13.25'>
        <h1 className='text-h4'>지원서 열람</h1>
        <SuspenseWrapper>
          <AdminApplicationsContainer />
        </SuspenseWrapper>
      </div>
    </section>
  );
}
