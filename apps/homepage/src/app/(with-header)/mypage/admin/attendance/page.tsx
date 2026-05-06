import {DropdownContainer} from '@/app/(with-header)/mypage/admin/attendance/_containers/DropdownContainer';
import {TableContainer} from '@/app/(with-header)/mypage/admin/attendance/_containers/TableContainer';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';
import {TabContainer} from '@/app/(with-header)/mypage/admin/attendance/_containers/TabContainer';

export default function AdminAttendancePage() {
  return (
    <section>
      <div className='flex w-full flex-col gap-3 overflow-hidden py-10 pb-7.5 lg:gap-4.5 lg:py-13.5 lg:pb-0'>
        <h1 className='text-h2 hidden px-11.25 text-neutral-800 lg:block'>
          출석 관리
        </h1>
        <DropdownContainer />
        <SuspenseWrapper>
          <TabContainer />
          <TableContainer />
        </SuspenseWrapper>
      </div>
    </section>
  );
}
