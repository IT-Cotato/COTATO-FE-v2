import {AdminApplicationsContainer} from '@/app/admin/applications/_containers/AdminApplicationsContainer';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';

export default function AdminApplicationPage() {
  return (
    <section className='flex min-w-275 flex-col items-center justify-center gap-7 px-11.25'>
      <div>
        <h1 className='text-h4'>지원서 열람</h1>
        <SuspenseWrapper>
          <AdminApplicationsContainer />
        </SuspenseWrapper>
      </div>
    </section>
  );
}
