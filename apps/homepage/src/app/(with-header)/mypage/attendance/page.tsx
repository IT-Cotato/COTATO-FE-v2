import {SessionAttendanceContainer} from '@/app/(with-header)/mypage/attendance/_containers/SessionAttendanceContainer';

export default function AttendancePage() {
  return (
    <section className='flex w-full flex-col px-6 py-5 md:px-11.25 md:py-12.5'>
      <SessionAttendanceContainer />
    </section>
  );
}
