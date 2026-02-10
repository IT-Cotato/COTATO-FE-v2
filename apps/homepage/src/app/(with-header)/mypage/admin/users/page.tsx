import { SuspenseWrapper } from '@/components/wrappers/SuspenseWrapper';
import {AdminUsersContainer} from './_containers/AdminUsersContainer';

export default function AdminUsersPage() {
  return (
    <section className='flex flex-col p-12.5'>
      <div className='flex min-w-275 flex-col gap-13.25'>
        <h1 className='text-h4'>회원 관리</h1>
        <SuspenseWrapper>
          <AdminUsersContainer />
        </SuspenseWrapper>
      </div>
    </section>
  );
}
