import {HomeCoreValue} from '@/app/(with-header)/(with-footer)/(home)/_components/HomeCoreValue';

import {HomeCotatoReviewContainer} from '@/app/(with-header)/(with-footer)/(home)/_containers/HomeCotatoReviewContainer';
import {HomePartSectionContainer} from '@/app/(with-header)/(with-footer)/(home)/_containers/HomePartSectionContainer';
import {HomeMainScheduleContainer} from '@/app/(with-header)/(with-footer)/(home)/_containers/HomeMainScheduleContainer';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';
import {HomeRecruitmentContainer} from '@/app/(with-header)/(with-footer)/(home)/_containers/HomeRecruitmentContainer';
import {HomeBannerContainer} from '@/app/(with-header)/(with-footer)/(home)/_containers/HomeBannerContainer';

export default function HomePage() {
  return (
    <section className='min-w-360'>
      <HomeBannerContainer />
      <div className='flex flex-col items-center gap-50 bg-white pt-25 pb-50'>
        <HomeCoreValue />
        <HomeMainScheduleContainer />
        <SuspenseWrapper>
          <HomePartSectionContainer />
        </SuspenseWrapper>
        <HomeCotatoReviewContainer />
        <HomeRecruitmentContainer />
      </div>
    </section>
  );
}
