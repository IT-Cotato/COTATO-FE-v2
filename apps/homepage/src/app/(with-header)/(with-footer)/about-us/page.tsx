import {AboutUsBanner} from '@/app/(with-header)/(with-footer)/about-us/_components/AboutUsBanner';
import {AboutUsMainActivitiesContainer} from '@/app/(with-header)/(with-footer)/about-us/_containers/AboutUsMainActivitiesContainer';
import {AboutUsManagementTeamContainer} from '@/app/(with-header)/(with-footer)/about-us/_containers/AboutUsManagementTeamContainer';
import {AboutUsProjectContainer} from '@/app/(with-header)/(with-footer)/about-us/_containers/AboutUsProjectContainer';
import {AboutUsStudyContainer} from '@/app/(with-header)/(with-footer)/about-us/_containers/AboutUsStudyContainer';

export default function AboutUsPage() {
  return (
    <section className='mx-auto flex w-full max-w-480 min-w-360 flex-col items-center justify-center'>
      <AboutUsBanner />
      <AboutUsMainActivitiesContainer />
      <AboutUsStudyContainer />
      <AboutUsProjectContainer />
      <AboutUsManagementTeamContainer />
    </section>
  );
}
