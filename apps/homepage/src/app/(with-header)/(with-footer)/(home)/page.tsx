import {HomeCoreValue} from '@/app/(with-header)/(with-footer)/(home)/_components/HomeCoreValue';
import {HomeFinalSection} from '@/app/(with-header)/(with-footer)/(home)/_components/HomeFinalSection';
import {HomeBanner} from '@/app/(with-header)/(with-footer)/(home)/_components/HomeBanner';
import {HomeCotatoReviewContainer} from '@/app/(with-header)/(with-footer)/(home)/_containers/HomeCotatoReviewContainer';
import {HomePartSectionContainer} from '@/app/(with-header)/(with-footer)/(home)/_containers/HomePartSectionContainer';
import {HomeMainScheduleContainer} from '@/app/(with-header)/(with-footer)/(home)/_containers/HomeMainScheduleContainer';
import {SuspenseWrapper} from '@/components/wrappers/SuspenseWrapper';

export default function HomePage() {
  return (
    <section>
      <HomeBanner />
      <div className='flex flex-col items-center gap-50 bg-white pt-25 pb-50'>
        <HomeCoreValue />
        <HomeMainScheduleContainer />
        <SuspenseWrapper>
          <HomePartSectionContainer />
        </SuspenseWrapper>
        <HomeCotatoReviewContainer />
        <HomeFinalSection />
      </div>
    </section>
  );
}
