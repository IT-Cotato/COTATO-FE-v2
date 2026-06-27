import {http} from 'msw';
import {ERROR, requireStaff, success} from '@/mocks/utils';
import {
  getResultMail,
  mockNotificationMailByGeneration,
  setResultMail,
} from '@/mocks/data/store';

const MAIL_TYPE_DESCRIPTIONS: Record<string, string> = {
  PASS: '합격자 메일',
  FAIL: '불합격자 메일',
  PRELIMINARY: '예비합격자 메일',
};

let nextJobId = 1;

export const adminMailHandlers = [
  http.get('*/api/admin/recruitment-notification-emails', ({request}) => {
    const guardError = requireStaff(request);
    if (guardError) return guardError;

    const generationId = Number(
      new URL(request.url).searchParams.get('generationId') ?? '9'
    );
    const mail = mockNotificationMailByGeneration.get(generationId) ?? {
      templateId: null,
      content: '',
      isSent: false,
      sentAt: null,
      generationId,
      successCount: 0,
      failCount: 0,
      subscriberCount: 12,
    };
    return success(mail);
  }),

  http.post(
    '*/api/admin/recruitment-notification-emails',
    async ({request}) => {
      const guardError = requireStaff(request);
      if (guardError) return guardError;

      const body = (await request.json()) as {
        generationId: number;
        content: string;
      };
      const existing = mockNotificationMailByGeneration.get(body.generationId);
      if (existing?.isSent) return ERROR.EMAIL_ALREADY_SENT();

      mockNotificationMailByGeneration.set(body.generationId, {
        templateId: existing?.templateId ?? Date.now(),
        content: body.content,
        isSent: false,
        sentAt: null,
        generationId: body.generationId,
        successCount: 0,
        failCount: 0,
        subscriberCount: existing?.subscriberCount ?? 12,
      });
      return success(null);
    }
  ),

  http.post(
    '*/api/admin/recruitment-notification-emails/send',
    async ({request}) => {
      const guardError = requireStaff(request);
      if (guardError) return guardError;

      const body = (await request.json()) as {generationId: number};
      const mail = mockNotificationMailByGeneration.get(body.generationId);
      if (!mail) return ERROR.EMAIL_TEMPLATE_NOT_FOUND();
      if (mail.isSent) return ERROR.EMAIL_ALREADY_SENT();

      mail.isSent = true;
      mail.sentAt = new Date().toISOString();
      mail.successCount = mail.subscriberCount;

      return success({
        jobId: nextJobId++,
        totalCount: mail.subscriberCount,
        sentAt: mail.sentAt,
        generationId: body.generationId,
      });
    }
  ),

  http.get('*/api/admin/recruitment-mails', ({request}) => {
    const guardError = requireStaff(request);
    if (guardError) return guardError;

    const url = new URL(request.url);
    const generationId = Number(url.searchParams.get('generationId') ?? '9');
    const templateType = url.searchParams.get('templateType') ?? 'PASS';

    const mail = getResultMail(generationId, templateType) ?? {
      templateId: null,
      content: '',
      isSent: false,
      sentAt: null,
      generationId,
      successCount: 0,
      failCount: 0,
      templateType,
      templateTypeDescription:
        MAIL_TYPE_DESCRIPTIONS[templateType] ?? templateType,
      recipientCount: 8,
    };
    return success(mail);
  }),

  http.post('*/api/admin/recruitment-mails', async ({request}) => {
    const guardError = requireStaff(request);
    if (guardError) return guardError;

    const body = (await request.json()) as {
      generationId: number;
      templateType: string;
      content: string;
    };
    const existing = getResultMail(body.generationId, body.templateType);
    if (existing?.isSent) return ERROR.EMAIL_ALREADY_SENT();

    setResultMail(body.generationId, body.templateType, {
      templateId: existing?.templateId ?? Date.now(),
      content: body.content,
      isSent: false,
      sentAt: null,
      generationId: body.generationId,
      successCount: 0,
      failCount: 0,
      templateType: body.templateType,
      templateTypeDescription:
        MAIL_TYPE_DESCRIPTIONS[body.templateType] ?? body.templateType,
      recipientCount: existing?.recipientCount ?? 8,
    });
    return success(null);
  }),

  http.post('*/api/admin/recruitment-mails/send', async ({request}) => {
    const guardError = requireStaff(request);
    if (guardError) return guardError;

    const body = (await request.json()) as {
      generationId: number;
      templateType: string;
    };
    const mail = getResultMail(body.generationId, body.templateType);
    if (!mail) return ERROR.EMAIL_TEMPLATE_NOT_FOUND();
    if (mail.isSent) return ERROR.EMAIL_ALREADY_SENT();

    mail.isSent = true;
    mail.sentAt = new Date().toISOString();
    mail.successCount = mail.recipientCount;

    return success({
      jobId: nextJobId++,
      templateType: body.templateType,
      totalCount: mail.recipientCount,
      sentAt: mail.sentAt,
      generationId: body.generationId,
    });
  }),
];
