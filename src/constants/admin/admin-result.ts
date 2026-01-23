export const RESULT_PARTS = [
  {label: '전체', value: 'ALL'},
  {label: '기획', value: 'PM'},
  {label: '디자인', value: 'DE'},
  {label: '프론트엔드', value: 'FE'},
  {label: '백엔드', value: 'BE'},
] as const;

export const STATUS_LABEL_MAP = {
  PASS: '합격',
  WAITLISTED: '예비 합격',
  FAIL: '불합격',
} as const;
