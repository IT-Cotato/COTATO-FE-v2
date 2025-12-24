import {AdminApplicationInformation} from '@/app/admin/(with-sidebar)/applications/_components/AdminApplicationInformation';
import {AdminApplicationTabs} from '@/app/admin/(with-sidebar)/applications/_components/AdminApplicationTabs';

export default function AdminApplicationPage() {
  return (
    <section className='flex flex-col gap-7'>
      <h1 className='text-h4'>지원서 열람</h1>
      <AdminApplicationInformation />
      <AdminApplicationTabs />
    </section>
  );
}
