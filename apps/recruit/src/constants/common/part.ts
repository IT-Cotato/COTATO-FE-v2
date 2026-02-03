import {PartType} from '@/schemas/admin/admin-application-questions.schema';

export const PART_TABS: {label: string; value: PartType}[] = [
  {label: '기획', value: 'PM'},
  {label: '디자인', value: 'DE'},
  {label: '프론트엔드', value: 'FE'},
  {label: '백엔드', value: 'BE'},
];
