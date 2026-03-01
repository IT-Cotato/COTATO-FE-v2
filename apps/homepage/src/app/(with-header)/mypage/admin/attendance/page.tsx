import {DropdownContainer} from '@/app/(with-header)/mypage/admin/attendance/_containers/DropdownContainer';
import {TableContainer} from '@/app/(with-header)/mypage/admin/attendance/_containers/TableContainer';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';
import {TabContainer} from '@/app/(with-header)/mypage/admin/attendance/_containers/TabContainer';

export default function AdminAttendancePage() {
  return (
    <section className='px-11.25'>
      <div className='flex min-w-275 flex-col gap-4.5 py-13.5'>
        <h1 className='text-h2 text-neutral-800'>출석 관리</h1>
        <DropdownContainer />
        <SuspenseWrapper>
          <TabContainer />
          <TableContainer />
        </SuspenseWrapper>
      </div>
    </section>
  );
}
