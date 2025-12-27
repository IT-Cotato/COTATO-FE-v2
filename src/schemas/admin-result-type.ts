import {
  MOCK_MAIL_CONTENT_ALERT,
  MOCK_MAIL_CONTENT_FAIL,
  MOCK_MAIL_CONTENT_PASS,
  MOCK_MAIL_CONTENT_WAIT,
} from '@/mocks/mock-mail';

export const mailTabs = ['합격자 메일', '불합격자 메일', '예비 합격자 메일'];

export const MAIL_DATA_MAP: Record<string, string> = {
  '지원 알림 메일': MOCK_MAIL_CONTENT_ALERT,
  '합격자 메일': MOCK_MAIL_CONTENT_PASS,
  '불합격자 메일': MOCK_MAIL_CONTENT_FAIL,
  '예비 합격자 메일': MOCK_MAIL_CONTENT_WAIT,
};
