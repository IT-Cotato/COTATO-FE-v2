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

export const mailTabs = ['합격자 메일', '불합격자 메일', '예비 합격자 메일'];
export const MAIL_DATA_MAP: Record<string, string> = {
  '지원 알림 메일': MOCK_MAIL_CONTENT_ALARM,
  '합격자 메일': MOCK_MAIL_CONTENT_PASS,
  '불합격자 메일': MOCK_MAIL_CONTENT_FAIL,
  '예비 합격자 메일': MOCK_MAIL_CONTENT_WAITING,
};

type MailType = keyof typeof MAIL_DATA_MAP;
export const MAIL_NUM_MAP: Record<MailType, number> = {
  '지원 알림 메일': MAIL_ALARM_NUM,
  '합격자 메일': MAIL_PASS_NUM,
  '불합격자 메일': MAIL_FAIL_NUM,
  '예비 합격자 메일': MAIL_WAITING_NUM,
};
