import {AdminApplicationsContainer} from '@/app/admin/(with-sidebar)/applications/_containers/AdminApplicationsContainer';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';

export default function AdminApplicationsPage() {
  return (
    <section className='flex flex-col pt-2.5 lg:p-12.5'>
      <div className='flex flex-col lg:min-w-275 lg:gap-13.25'>
        <h1 className='text-h4 hidden lg:block'>지원서 열람</h1>
        <SuspenseWrapper>
          <AdminApplicationsContainer />
        </SuspenseWrapper>
      </div>
    </section>
  );
}
