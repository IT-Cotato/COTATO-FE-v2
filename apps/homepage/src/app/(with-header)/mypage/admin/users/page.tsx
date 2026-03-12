import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';
import {AdminUsersContainer} from './_containers/AdminUsersContainer';

export default function AdminUsersPage() {
  return (
    <section className='flex flex-col px-4 pt-6.5 md:p-12.5'>
      <div className='flex flex-col gap-6.75 md:min-w-275'>
        <h1 className='text-h2 sr-only md:not-sr-only md:block'>회원 관리</h1>
        <SuspenseWrapper>
          <AdminUsersContainer />
        </SuspenseWrapper>
      </div>
    </section>
  );
}
