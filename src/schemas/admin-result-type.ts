import {MAIL_DATA_MAP, RESULT_PARTS} from '@/constants/admin/admin-result';

export type MailType = keyof typeof MAIL_DATA_MAP;

export type ResultPartValue = (typeof RESULT_PARTS)[number]['value'];

export interface ResultSummaryData extends Record<ResultPartValue, number> {
  status: string;
}
