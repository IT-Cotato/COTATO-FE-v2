import {RESULT_PARTS, STATUS_LABEL_MAP} from '@/constants/admin/admin-result';

export type ResultPartValue = (typeof RESULT_PARTS)[number]['value'];

export interface ResultSummaryData extends Record<ResultPartValue, number> {
  status: string;
}

export type PassStatus = keyof typeof STATUS_LABEL_MAP;
