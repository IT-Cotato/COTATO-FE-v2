import {AttendanceContainer} from '@/app/(with-header)/mypage/activity/_containers/AttendanceContainer';

export default function MyPage() {
  return (
    <section className='flex w-full flex-col px-6 pt-5 pb-10 lg:px-23.75 lg:py-10'>
      <AttendanceContainer />
    </section>
  );
}
