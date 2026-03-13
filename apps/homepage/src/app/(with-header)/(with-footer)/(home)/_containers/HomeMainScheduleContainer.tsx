import {HomeSectionHeader} from '@/app/(with-header)/(with-footer)/(home)/_components/HomeSectionHeader';
import {HomeDesktopMainSchedule} from '@/app/(with-header)/(with-footer)/(home)/_desktop/_components/HomeDesktopMainSchedule';
import {HomeMobileMainSchedule} from '@/app/(with-header)/(with-footer)/(home)/_mobile/_components/HomeMobileMainSchedule';

export const HomeMainScheduleContainer = () => {
  return (
    <section className='flex flex-col items-center gap-5 xl:gap-10'>
      <HomeSectionHeader
        mainHeading='Main Schedule'
        subHeading='주요 활동일정'
      />
      <div className='xl:hidden'>
        <HomeMobileMainSchedule />
      </div>
      <div className='hidden xl:block'>
        <HomeDesktopMainSchedule />
      </div>
    </section>
  );
};
