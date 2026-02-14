import {AboutUsBanner} from '@/app/(with-header)/(with-footer)/about-us/_components/AboutUsBanner';
import {AboutUsMainActivitiesContainer} from '@/app/(with-header)/(with-footer)/about-us/_containers/AboutUsMainActivitiesContainer';
import {AboutUsManagementTeamContainer} from '@/app/(with-header)/(with-footer)/about-us/_containers/AboutUsManagementTeamContainer';
import {AboutUsProjectContainer} from '@/app/(with-header)/(with-footer)/about-us/_containers/AboutUsProjectContainer';
import {AboutUsStudyContainer} from '@/app/(with-header)/(with-footer)/about-us/_containers/AboutUsStudyContainer';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'COTATO | ABOUT US',
  description:
    '함께 도전하며 도착하는 경험, 코테이토가 걸어온 길을 소개합니다.',
  openGraph: {
    title: 'COTATO | ABOUT US',
    description:
      '함께 도전하며 도착하는 경험, 코테이토가 걸어온 길을 소개합니다.',
  },
};

export default function AboutUsPage() {
  return (
    <section className='mx-auto flex w-full flex-col items-center justify-center overflow-hidden'>
      <AboutUsBanner />
      <AboutUsMainActivitiesContainer />
      <AboutUsStudyContainer />
      <AboutUsProjectContainer />
      <AboutUsManagementTeamContainer />
    </section>
  );
}
