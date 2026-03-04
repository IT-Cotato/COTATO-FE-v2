import {DropdownContainer} from '@/app/(with-header)/mypage/admin/penalties/_containers/DropdownContainer';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';

export default function AdminPenaltiesPage() {
  return (
    <section className='px-11.25'>
      <div className='flex min-w-275 flex-col gap-4.5 py-13.5'>
        <h1 className='text-h2 text-neutral-800'>상벌점 관리</h1>
        <SuspenseWrapper>
          <DropdownContainer />
        </SuspenseWrapper>
      </div>
    </section>
  );
}
