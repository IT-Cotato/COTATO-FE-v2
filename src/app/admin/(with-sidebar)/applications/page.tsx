import {AdminApplicationInformation} from '@/app/admin/(with-sidebar)/applications/_components/AdminApplicationInformation';
import {AdminApplicationTabs} from '@/app/admin/(with-sidebar)/applications/_components/AdminApplicationTabs';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';

export default function AdminApplicationPage() {
  return (
    <section className='flex max-w-[100vh] flex-col gap-7'>
      <h1 className='text-h4'>지원서 열람</h1>
      <SuspenseWrapper>
        <AdminApplicationInformation />
        <AdminApplicationTabs />
      </SuspenseWrapper>
    </section>
  );
}
