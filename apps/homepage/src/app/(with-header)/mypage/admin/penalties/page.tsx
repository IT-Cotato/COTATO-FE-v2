import {DropdownContainer} from '@/app/(with-header)/mypage/admin/penalties/_containers/DropdownContainer';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';
import {TableContainer} from '@/app/(with-header)/mypage/admin/penalties/_containers/TableContainer';

export default function AdminPenaltiesPage() {
  return (
    <section>
      <div className='flex w-full flex-col gap-3 overflow-hidden py-10 pb-7.5 lg:gap-4.5 lg:py-13.5 lg:pb-0'>
        <h1 className='text-h2 hidden px-11.25 text-neutral-800 lg:block'>
          상벌점 관리
        </h1>
        <SuspenseWrapper>
          <DropdownContainer />
          <TableContainer />
        </SuspenseWrapper>
      </div>
    </section>
  );
}
