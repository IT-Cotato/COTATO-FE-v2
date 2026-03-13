import {HomeSectionHeader} from '@/app/(with-header)/(with-footer)/(home)/_components/HomeSectionHeader';
import {HomeMobileMainScheduleContainer} from '@/app/(with-header)/(with-footer)/(home)/_mobile/HomeMobileMainScheduleContainer';
import {HomeDesktopMainScheduleContainer} from '@/app/(with-header)/(with-footer)/(home)/_desktop/HomeDesktopMainScheduleContainer';

export const HomeMainScheduleContainer = () => {
  return (
    <section className='flex flex-col items-center gap-5 sm:gap-10'>
      <HomeSectionHeader
        mainHeading='Main Schedule'
        subHeading='주요 활동일정'
      />
      <div className='xl:hidden'>
        <HomeMobileMainScheduleContainer />
      </div>
      <div className='hidden xl:block'>
        <HomeDesktopMainScheduleContainer />
      </div>
    </section>
  );
};
