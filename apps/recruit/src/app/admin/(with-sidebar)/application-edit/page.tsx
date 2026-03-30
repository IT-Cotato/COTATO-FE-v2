import {AdminApplicationEditContainer} from '@/app/admin/(with-sidebar)/application-edit/_containers/AdminApplicationEditContainer';

export default function AdminApplicationEditPage() {
  return (
    <section className='flex flex-col gap-6 py-5 lg:p-12.5'>
      <h1 className='text-h5 lg:text-h4 font-bold'>모집 기간</h1>
      <AdminApplicationEditContainer />
    </section>
  );
}
