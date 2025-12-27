export const RESULT_PARTS = [
  {label: '전체', value: 'total'},
  {label: '기획', value: 'plan'},
  {label: '디자인', value: 'design'},
  {label: '프론트엔드', value: 'frontend'},
  {label: '백엔드', value: 'backend'},
] as const;

export type ResultPartValue = (typeof RESULT_PARTS)[number]['value'];

export interface ResultSummaryData extends Record<ResultPartValue, number> {
  status: string;
}
