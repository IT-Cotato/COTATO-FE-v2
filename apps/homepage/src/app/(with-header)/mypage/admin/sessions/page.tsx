import {SessionsContainer} from '@/app/(with-header)/mypage/admin/sessions/_containers/SessionsContainer';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';

export default function AdminSessionsPage() {
  return (
    <section className='mt-10 flex flex-col px-6 lg:p-12.5'>
      <div className='flex flex-col gap-13 lg:min-w-275'>
        <h1 className='text-h2 sr-only lg:not-sr-only lg:block'>세션 관리</h1>
        <SuspenseWrapper>
          <SessionsContainer />
        </SuspenseWrapper>
      </div>
    </section>
  );
}
