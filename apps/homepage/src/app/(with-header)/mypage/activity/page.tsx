import {AttendanceContainer} from '@/app/(with-header)/mypage/activity/_containers/AttendanceContainer';

export default function MyPage() {
  return (
    <section className='flex w-full flex-col px-5 pt-5 pb-10 md:px-23.75 md:py-10'>
      <AttendanceContainer />
    </section>
  );
}
