import {PartType} from '@/schemas/admin/admin-application-questions.schema';

export const scheduleSections = [
  {
    label: '모집 기간',
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
