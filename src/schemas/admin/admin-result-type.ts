import {RESULT_PARTS} from '@/constants/admin/admin-result';

export type ResultPartValue = (typeof RESULT_PARTS)[number]['value'];

export interface ResultSummaryData extends Record<ResultPartValue, number> {
  status: string;
}
