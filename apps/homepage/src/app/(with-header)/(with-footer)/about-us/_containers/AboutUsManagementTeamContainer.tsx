import {AboutUsDescription} from '@/app/(with-header)/(with-footer)/about-us/_components/AboutUsDescription';
import {AboutUsManagementTeamCard} from '@/app/(with-header)/(with-footer)/about-us/_components/AboutUsManagementTeamCard';
import {AboutUsSponsor} from '@/app/(with-header)/(with-footer)/about-us/_components/AboutUsSponsor';
import AboutUsBackgroundThird from '@/assets/about-us/background-about-us-third.svg';
import {MANAGEMENT_TEAMS} from '@/constants/about-us/management-team';

export const AboutUsManagementTeamContainer = () => {
  return (
    <div className='relative flex w-full flex-col items-center gap-25 overflow-hidden py-40'>
      <div className='pointer-events-none absolute inset-0 z-0'>
        <AboutUsBackgroundThird />
      </div>
      <AboutUsDescription
        title='코테이토를 이끌어나가는 운영진을 소개합니다'
        titleColor='text-neutral-800'
        subTitleColor='text-neutral-500'
        subTitle='COTATO의 운영진은 네 팀으로 이루어져있으며,'
        subTitleOption='운영팀, 교육팀, 기획팀, 홍보팀으로 구성되어있어요.'
      />
      <div className='flex flex-row gap-10'>
        {MANAGEMENT_TEAMS.map((team) => (
          <AboutUsManagementTeamCard
            key={team.title}
            title={team.title}
            description={team.description}
          />
        ))}
      </div>
      <AboutUsSponsor />
    </div>
  );
};
