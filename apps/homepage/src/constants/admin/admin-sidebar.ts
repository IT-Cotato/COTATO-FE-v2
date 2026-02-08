import {ROUTES} from '@/constants/routes';

export const ADMIN_NAV_ITEMS = [
  {label: '회원 관리', href: ROUTES.ADMIN_USERS},
  {label: '가입 승인', href: ROUTES.ADMIN_APPROVALS},
  {label: '세션 관리', href: ROUTES.ADMIN_SESSIONS},
  {label: '출석 관리', href: ROUTES.ADMIN_ATTENDANCE},
  {label: '상벌점 관리', href: ROUTES.ADMIN_PENALTIES},
];
