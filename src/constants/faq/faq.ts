export const FAQ_NAV_ITEMS = [
  {label: '공통 질문', searchParams: 'common'},
  {label: 'Product Manager', searchParams: 'product-manager'},
  {label: 'Design', searchParams: 'design'},
  {label: 'FrontEnd', searchParams: 'frontend'},
  {label: 'BackEnd', searchParams: 'backend'},
];

export const FAQ_TYPE_MAP = {
  common: 'COMMON',
  'product-manager': 'PM',
  design: 'DE',
  frontend: 'FE',
  backend: 'BE',
} as const;
