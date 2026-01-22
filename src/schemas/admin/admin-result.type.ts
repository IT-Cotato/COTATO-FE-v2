import {RESULT_PARTS, STATUS_LABEL_MAP} from '@/constants/admin/admin-result';

export type ResultPartValue = (typeof RESULT_PARTS)[number]['value'];
type StatusLabel = (typeof STATUS_LABEL_MAP)[keyof typeof STATUS_LABEL_MAP];

export interface ResultSummaryData extends Record<ResultPartValue, number> {
  status: StatusLabel;
}

export type PassStatus = keyof typeof STATUS_LABEL_MAP;
