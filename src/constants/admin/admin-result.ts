import {
  MAIL_ALARM_NUM,
  MAIL_FAIL_NUM,
  MAIL_PASS_NUM,
  MAIL_WAITING_NUM,
  MOCK_MAIL_CONTENT_ALARM,
  MOCK_MAIL_CONTENT_FAIL,
  MOCK_MAIL_CONTENT_PASS,
  MOCK_MAIL_CONTENT_WAITING,
} from '@/mocks/mock-mail';
import {MailType} from '@/schemas/admin/admin-result-type';

export const RESULT_PARTS = [
  {label: '전체', value: 'total'},
  {label: '기획', value: 'plan'},
  {label: '디자인', value: 'design'},
  {label: '프론트엔드', value: 'frontend'},
  {label: '백엔드', value: 'backend'},
] as const;

export const MAIL_DATA_MAP: Record<string, string> = {
  '지원 알림 메일': MOCK_MAIL_CONTENT_ALARM,
  '합격자 메일': MOCK_MAIL_CONTENT_PASS,
  '불합격자 메일': MOCK_MAIL_CONTENT_FAIL,
  '예비 합격자 메일': MOCK_MAIL_CONTENT_WAITING,
};

export const MAIL_NUM_MAP: Record<MailType, number> = {
  '지원 알림 메일': MAIL_ALARM_NUM,
  '합격자 메일': MAIL_PASS_NUM,
  '불합격자 메일': MAIL_FAIL_NUM,
  '예비 합격자 메일': MAIL_WAITING_NUM,
};

export const mailTabs = ['합격자 메일', '불합격자 메일', '예비 합격자 메일'];
