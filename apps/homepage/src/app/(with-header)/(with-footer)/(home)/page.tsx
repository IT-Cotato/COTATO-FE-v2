import {HomeContentLayout} from './_components/HomeContentLayout';
import {HomeCoreValue} from '@/app/(with-header)/(with-footer)/(home)/_components/HomeCoreValue';
import {HomeCotatoReviewContainer} from '@/app/(with-header)/(with-footer)/(home)/_containers/HomeCotatoReviewContainer';
import {HomePartSectionContainer} from '@/app/(with-header)/(with-footer)/(home)/_containers/HomePartSectionContainer';
import {HomeMainScheduleContainer} from '@/app/(with-header)/(with-footer)/(home)/_containers/HomeMainScheduleContainer';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';
import {HomeRecruitmentContainer} from '@/app/(with-header)/(with-footer)/(home)/_containers/HomeRecruitmentContainer';
import {HomeBannerContainer} from '@/app/(with-header)/(with-footer)/(home)/_containers/HomeBannerContainer';
import {HomeMobileAttendanceContainer} from '@/app/(with-header)/(with-footer)/(home)/_mobile/_containers/HomeMobileAttendanceContainer';

export default function HomePage() {
  return (
    <div className='flex w-full flex-col gap-70'>
      <HomeBannerContainer />
      <HomeContentLayout>
        <HomeCoreValue />
        <HomeMainScheduleContainer />
        <SuspenseWrapper>
          <HomePartSectionContainer />
        </SuspenseWrapper>
        <HomeCotatoReviewContainer />
        <HomeRecruitmentContainer />
        <HomeMobileAttendanceContainer />
      </HomeContentLayout>
    </div>
  );
}
