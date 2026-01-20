import {ROUTES} from '@/constants/routes';

export const ADMIN_NAV_ITEMS = [
  {label: '지원서 열람', href: ROUTES.ADMIN_APPLICATION},
  {label: '지원서 수정', href: ROUTES.ADMIN_APPLICATION_EDIT},
  {label: '모집 활성화', href: ROUTES.ADMIN_RECRUITMENT},
  {label: '합격자 관리', href: ROUTES.ADMIN_RESULTS},
];
