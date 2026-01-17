import {PartType} from '@/schemas/admin/admin-appication-questions.schema';

export const scheduleSections = [
  {
    label: '지원 기간',
    type: 'range',
    start: 'recruitmentStart',
    end: 'recruitmentEnd',
  },
  {
    label: '서류 발표',
    type: 'single',
    start: 'documentAnnouncement',
  },
  {
    label: '면접 평가',
    type: 'range',
    start: 'interviewStart',
    end: 'interviewEnd',
  },
  {
    label: '최종 발표',
    type: 'single',
    start: 'finalAnnouncement',
  },
  {
    label: 'OT 날짜',
    type: 'single',
    start: 'ot',
  },
] as const;

export const PART_TABS: {label: string; value: PartType}[] = [
  {label: '기획', value: 'PM'},
  {label: '디자인', value: 'DE'},
  {label: '프론트엔드', value: 'FE'},
  {label: '백엔드', value: 'BE'},
];
