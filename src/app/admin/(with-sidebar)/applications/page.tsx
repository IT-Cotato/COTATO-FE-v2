import {AdminApplicationContainer} from '@/app/admin/(with-sidebar)/applications/_containers/AdminApplicationContainer';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';

export default function AdminApplicationPage() {
  return (
    <section className='flex w-full flex-col gap-7'>
      <h1 className='text-h4'>지원서 열람</h1>
      <SuspenseWrapper>
        <AdminApplicationContainer />
      </SuspenseWrapper>
    </section>
  );
}
