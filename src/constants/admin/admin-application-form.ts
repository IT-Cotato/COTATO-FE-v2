import {PartEtcType} from '@/schemas/admin/admin-application-type';

export const scheduleSections = [
  {key: 'recruitmentPeriod', label: '지원 기간', type: 'range'},
  {key: 'documentResultDate', label: '서류 발표', type: 'single'},
  {key: 'interviewPeriod', label: '면접 평가', type: 'range'},
  {key: 'finalResultDate', label: '최종 발표', type: 'single'},
  {key: 'orientationDate', label: 'OT 날짜', type: 'single'},
] as const;

export const PART_TABS: {label: string; value: PartEtcType}[] = [
  {label: '기획', value: 'plan'},
  {label: '디자인', value: 'design'},
  {label: '프론트엔드', value: 'frontend'},
  {label: '백엔드', value: 'backend'},
  {label: '기타', value: 'etc'},
];
