import {RESULT_PARTS, STATUS_LABEL_MAP} from '@/constants/admin/admin-result';

export type ResultPartValue = (typeof RESULT_PARTS)[number]['value'];
export type PassStatus = keyof typeof STATUS_LABEL_MAP;

export interface ResultSummaryData {
  passStatus: PassStatus;
  counts: Record<ResultPartValue, number>;
}
