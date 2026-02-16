import {SessionsContainer} from '@/app/(with-header)/mypage/admin/sessions/_containers/SessionsContainer';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';

export default function AdminSessionsPage() {
  return (
    <section className='flex flex-col p-12.5'>
      <div className='flex min-w-275 flex-col gap-13'>
        <h1 className='text-h4'>세션 관리</h1>
        <SuspenseWrapper>
          <SessionsContainer />
        </SuspenseWrapper>
      </div>
    </section>
  );
}
