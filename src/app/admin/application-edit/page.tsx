import {AdminApplicationEditContainer} from '@/app/admin/application-edit/_containers/AdminApplicationEditContainer';

export default function AdminApplicationEditPage() {
  return (
    <section className='flex flex-col gap-6'>
      <h1 className='text-h4'>모집 기간</h1>
      <AdminApplicationEditContainer />
    </section>
  );
}
