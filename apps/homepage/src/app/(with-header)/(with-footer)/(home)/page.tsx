import {HomeCoreValue} from '@/app/(with-header)/(with-footer)/(home)/_components/HomeCoreValue';
import {HomeCotatoReviewContainer} from '@/app/(with-header)/(with-footer)/(home)/_containers/HomeCotatoReviewContainer';
import {HomePartSectionContainer} from '@/app/(with-header)/(with-footer)/(home)/_containers/HomePartSectionContainer';
import {HomeMainScheduleContainer} from '@/app/(with-header)/(with-footer)/(home)/_containers/HomeMainScheduleContainer';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';
import {HomeRecruitmentContainer} from '@/app/(with-header)/(with-footer)/(home)/_containers/HomeRecruitmentContainer';
import {HomeBannerContainer} from '@/app/(with-header)/(with-footer)/(home)/_containers/HomeBannerContainer';
import {HomeAttendanceContainer} from '@/app/(with-header)/(with-footer)/(home)/_containers/HomeAttendanceContainer';

export default function HomePage() {
  return (
    <div className='flex w-full flex-col gap-42.5 sm:gap-50 md:min-w-360'>
      <HomeBannerContainer />
      <div className='flex flex-col items-center gap-42.5 overflow-x-hidden bg-white px-6 pb-50 sm:gap-50'>
        <HomeCoreValue />
        <HomeMainScheduleContainer />
        <SuspenseWrapper>
          <HomePartSectionContainer />
        </SuspenseWrapper>
        <HomeCotatoReviewContainer />
        <HomeRecruitmentContainer />
        <HomeAttendanceContainer />
      </div>
    </div>
  );
}
