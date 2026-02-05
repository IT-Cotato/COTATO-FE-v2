import {AboutUsBanner} from '@/app/(with-header)/(with-footer)/about-us/_components/AboutUsBanner';
import {AboutUsMainActivitiesContainer} from '@/app/(with-header)/(with-footer)/about-us/_containers/AboutUsMainActivitiesContainer';

export default function AboutUsPage() {
  return (
    <section className='flex flex-col items-center'>
      <AboutUsBanner />
      <AboutUsMainActivitiesContainer />
    </section>
  );
}
