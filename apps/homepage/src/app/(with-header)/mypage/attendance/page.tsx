import {SessionAttendanceContainer} from '@/app/(with-header)/mypage/attendance/_containers/SessionAttendanceContainer';

export default function AttendancePage() {
  return (
    <section className='flex w-full flex-col px-6 py-5 lg:px-11.25 lg:py-12.5'>
      <SessionAttendanceContainer />
    </section>
  );
}
