import MyActivityIcon from '@/assets/sidebar/my-activity.svg';
import AttendanceIcon from '@/assets/sidebar/attendance.svg';
import CSQuizIcon from '@/assets/sidebar/cs-quiz.svg';
import ApprovalIcon from '@/assets/sidebar/approval.svg';
import SessionManagementIcon from '@/assets/sidebar/session-management.svg';
import AttendanceManagementIcon from '@/assets/sidebar/attendance-management.svg';
import PenaltyManagementIcon from '@/assets/sidebar/penalty-management.svg';

import {ROUTES} from '@/constants/routes';
import {FC, SVGProps} from 'react';

interface NavItem {
  label: string;
  href: string;
  icon?: FC<SVGProps<SVGElement>>;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

export const SIDEBAR_NAV_GROUPS: NavGroup[] = [
  {
    title: '마이메뉴',
    items: [
      {label: '나의 활동', href: ROUTES.MYPAGE_ACTIVITY, icon: MyActivityIcon},
      {
        label: '출석하기',
        href: ROUTES.MYPAGE_ATTENDANCE,
        icon: AttendanceIcon,
      },
      {
        label: 'CS QUIZ 바로가기',
        href: ROUTES.MYPAGE_CSQUIZ,
        icon: CSQuizIcon,
      },
    ],
  },
  {
    title: '설정',
    items: [
      {label: '보안 설정', href: ROUTES.MYPAGE_SECURITY},
      {label: '운영 규정 및 서비스 약관', href: ROUTES.MYPAGE_TERMS},
    ],
  },
];

export const ADMIN_NAV_GROUP: NavGroup = {
  title: '관리자 메뉴',
  items: [
    {label: '회원 관리', href: ROUTES.ADMIN_USERS, icon: MyActivityIcon},
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
  ],
};
