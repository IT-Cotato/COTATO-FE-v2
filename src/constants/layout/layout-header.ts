import {ROUTES} from '@/constants/routes';

export const HEADER_ITEMS = [
  {
    label: '지원하기',
    href: ROUTES.APPLY,
    requiresAuth: true,
    canBeDisabled: true,
  },
  {label: '모집공고', href: ROUTES.RECRUIT},
  {label: 'FAQ', href: ROUTES.FAQ},
];
