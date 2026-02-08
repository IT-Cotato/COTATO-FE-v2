import MyActivityIcon from '@/assets/sidebar/my-activity.svg';
import AttendanceIcon from '@/assets/sidebar/attendance.svg';
import CSQuizIcon from '@/assets/sidebar/cs-quiz.svg';
import ApprovalIcon from '@/assets/sidebar/approval.svg';
import SessionIcon from '@/assets/sidebar/session.svg';
import PenaltyIcon from '@/assets/sidebar/penalty.svg';
import {ROUTES} from '@/constants/routes';

export const SIDEBAR_NAV_GROUPS = [
  {
    title: '마이메뉴',
    items: [
      {label: '나의 활동', href: ROUTES.MYPAGE, icon: MyActivityIcon},
      {
        label: '출석하기',
        href: `${ROUTES.MYPAGE}/attendance`,
        icon: AttendanceIcon,
      },
      {
        label: 'CSQUIZ 바로가기',
        href: `${ROUTES.MYPAGE}/csquiz`,
        icon: CSQuizIcon,
      },
    ],
  },
  {
    title: '설정',
    items: [
      {label: '보안 설정', href: `${ROUTES.MYPAGE}/security`},
      {label: '운영 규정 및 서비스 약관', href: `${ROUTES.MYPAGE}/terms`},
    ],
  },
];

export const ADMIN_NAV_GROUP = {
  title: '관리자 메뉴',
  items: [
    {label: '회원 관리', href: ROUTES.ADMIN_USERS, icon: MyActivityIcon},
    {label: '가입 승인', href: ROUTES.ADMIN_APPROVALS, icon: ApprovalIcon},
    {label: '세션 관리', href: ROUTES.ADMIN_SESSIONS, icon: SessionIcon},
    {label: '출석 관리', href: ROUTES.ADMIN_ATTENDANCE, icon: AttendanceIcon},
    {label: '상벌점 관리', href: ROUTES.ADMIN_PENALTIES, icon: PenaltyIcon},
  ],
};
