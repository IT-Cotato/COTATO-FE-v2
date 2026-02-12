import {AboutUsDescription} from '@/app/(with-header)/(with-footer)/about-us/_components/AboutUsDescription';
import {AboutUsManagementTeamCard} from '@/app/(with-header)/(with-footer)/about-us/_components/AboutUsManagementTeamCard';
import {AboutUsSponsor} from '@/app/(with-header)/(with-footer)/about-us/_components/AboutUsSponsor';
import AboutUsBackgroundThird from '@/assets/about-us/background-about-us-third.svg';

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

export const MANAGEMENT_TEAMS = [
  {
    title: '운영팀',
    description: [
      '운영팀은 회장단과 파트장들로 이루어진 팀입니다.',
      '동아리 세션 및 파트별 커리큘럼을 기획하고, 동아리의 전략적 운영과 프로젝트 관리를 담당합니다.',
    ],
  },
  {
    title: '교육팀',
    description: [
      'CS 기초 지식과 실무 기술 교육을 기획하고 세미나를 운영합니다.',
      '신입 회원의 성장을 지원하고, 지식 공유 문화를 확산시킵니다.',
    ],
  },
  {
    title: '기획팀',
    description: [
      '동아리 내 다양한 행사를 기획하고 운영 전략을 수렴합니다. ',
      '내부 행사 및 이벤트 기획 등 핵심 실무를 주도합니다.',
    ],
  },

  {
    title: '홍보팀',
    description: [
      'SNS 및 카드뉴스 콘텐츠를 통해 동아리의 활동을 외부에 알립니다.',
      '디자인, 커뮤니케이션을 아우르는 홍보 전략을 수립합니다.',
    ],
  },
];
