'use client';

import Image from 'next/image';
import {AboutUsDescription} from '@/app/(with-header)/(with-footer)/about-us/_components/AboutUsDescription';
import {AboutUsManagementTeamCard} from '@/app/(with-header)/(with-footer)/about-us/_components/AboutUsManagementTeamCard';
import AboutUsBackgroundThird from '@/assets/about-us/background-about-us-third.webp';
import {motion} from 'framer-motion';
import {
  FADE_IN_UP_CONTAINER,
  FADE_IN_UP_ITEM,
} from '@/constants/animation/motion-variants';
import {AboutUsSponsorContainer} from '@/app/(with-header)/(with-footer)/about-us/_containers/AboutUsSponsorContainer';
import {AboutUsMobileManagementAccordionItem} from '@/app/(with-header)/(with-footer)/about-us/_mobile/_components/AboutUsMobileManagementAccordionItem';

export const AboutUsManagementTeamContainer = () => {
  return (
    <section
      className='relative flex w-full flex-col items-center gap-25 overflow-hidden py-35 lg:py-50'
      aria-label='코테이토 운영진 소개'
      id='management-team'>
      <Image
        src={AboutUsBackgroundThird}
        alt=''
        aria-hidden='true'
        width={1920}
        height={1737}
        unoptimized={true}
        draggable={false}
        className='pointer-events-none absolute inset-0 z-0 hidden lg:block'
      />

      <motion.div
        className='z-10 flex w-full flex-col items-center gap-25'
        variants={FADE_IN_UP_CONTAINER}
        initial='hidden'
        whileInView='visible'
        viewport={{once: false, amount: 0.2}}>
        <motion.div variants={FADE_IN_UP_ITEM} className='w-full'>
          <AboutUsDescription
            title='코테이토를 이끌어나가는 운영진을 소개합니다'
            titleColor='text-neutral-800'
            subTitleColor='text-neutral-500'
            subTitle='COTATO의 운영진은 네 팀으로 이루어져있으며,'
            subTitleOption='운영팀, 교육팀, 기획팀, 홍보팀으로 구성되어있어요.'
            className='text-left lg:text-center'
          />
        </motion.div>

        <motion.div
          variants={FADE_IN_UP_ITEM}
          className='flex w-full justify-center'>
          <ul className='hidden flex-row gap-10 xl:flex' role='list'>
            {MANAGEMENT_TEAMS.map((team) => (
              <li key={team.title}>
                <AboutUsManagementTeamCard
                  title={team.title}
                  description={team.description}
                />
              </li>
            ))}
          </ul>

          <div className='flex w-full flex-col items-center gap-4 xl:hidden'>
            {MANAGEMENT_TEAMS.map((team) => (
              <AboutUsMobileManagementAccordionItem
                key={team.title}
                title={team.title}
                description={team.description}
              />
            ))}
          </div>
        </motion.div>

        <AboutUsSponsorContainer />
      </motion.div>
    </section>
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
