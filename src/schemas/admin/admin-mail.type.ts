export const MAIL_TYPE_MAP = {
  '합격자 메일': 'PASS',
  '불합격자 메일': 'FAIL',
  '예비합격자 메일': 'PRELIMINARY',
} as const;

export const mailTabs = ['합격자 메일', '불합격자 메일', '예비합격자 메일'];

export interface MailJobStatus {
  jobId: number;
  isCompleted: boolean;
  totalCount: number;
  successCount: number;
  failCount: number;
  createdAt: string;
  completedAt: string | null;
  generationId: number;
}
