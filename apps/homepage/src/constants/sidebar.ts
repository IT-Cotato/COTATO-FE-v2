import MyActivityIcon from '@/assets/sidebar/my-activity.svg';
import AttendanceIcon from '@/assets/sidebar/attendance.svg';
import CSQuizIcon from '@/assets/sidebar/cs-quiz.svg';
import CSQuizIconActive from '@/assets/sidebar/cs-quiz-active.svg';
import ApprovalIcon from '@/assets/sidebar/approval.svg';
import SessionManagementIcon from '@/assets/sidebar/session-management.svg';
import AttendanceManagementIcon from '@/assets/sidebar/attendance-management.svg';
import PenaltyManagementIcon from '@/assets/sidebar/penalty-management.svg';
import RecruitSettingIcon from '@/assets/sidebar/recruit-setting.svg';
import SecurityIcon from '@/assets/sidebar/security.svg';
import TermsIcon from '@/assets/sidebar/terms.svg';
import ManageMemIcon from '@/assets/sidebar/manage-mem.svg';

import {ROUTES} from '@/constants/routes';
import {FC, SVGProps} from 'react';

interface NavItem {
  label: string;
  href: string;
  icon: FC<SVGProps<SVGElement>>;
  activeIcon?: FC<SVGProps<SVGElement>>;
  isExternal?: boolean; //외부 링크로 이동 여부 (CS Quiz 바로가기용)
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

export const SIDEBAR_NAV_GROUPS: NavGroup[] = [
  {
    title: '마이메뉴',
    items: [
      {
        label: '나의 활동',
        href: ROUTES.MYPAGE_ACTIVITY,
        icon: MyActivityIcon,
      },
      {
        label: '출석하기',
        href: ROUTES.MYPAGE_ATTENDANCE,
        icon: AttendanceIcon,
      },
      {
        label: 'CS QUIZ 바로가기',
        href: 'https://mait.kr/',
        icon: CSQuizIcon,
        activeIcon: CSQuizIconActive,
        isExternal: true,
      },
    ],
  },
  {
    title: '설정',
    items: [
      {label: '계정 관리', href: ROUTES.MYPAGE_ACCOUNT, icon: SecurityIcon},
      {
        label: '회칙 및 서비스 약관',
        href: ROUTES.MYPAGE_TERMS,
        icon: TermsIcon,
      },
    ],
  },
];

export const ADMIN_NAV_GROUP: NavGroup = {
  title: '관리자 메뉴',
  items: [
    {label: '회원 관리', href: ROUTES.ADMIN_USERS, icon: ManageMemIcon},
    {label: '가입 승인', href: ROUTES.ADMIN_APPROVALS, icon: ApprovalIcon},
    {
      label: '세션 관리',
      href: ROUTES.ADMIN_SESSIONS,
      icon: SessionManagementIcon,
    },
    {
      label: '출석 관리',
      href: ROUTES.ADMIN_ATTENDANCE,
      icon: AttendanceManagementIcon,
    },
    {
      label: '상벌점 관리',
      href: ROUTES.ADMIN_PENALTIES,
      icon: PenaltyManagementIcon,
    },
    {
      label: 'RECRUIT 설정',
      href: ROUTES.ADMIN_RECRUIT,
      icon: RecruitSettingIcon,
    },
  ],
};
