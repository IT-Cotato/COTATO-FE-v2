import {privateAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';
import {handleApiError} from '@/services/utils/apiHelper';
import {
  NotificationMailResponseSchema,
  ResultMailResponseSchema,
  MailSendResultSchema,
} from '@/schemas/admin/admin-mail-schema';
import {MAIL_TYPE_MAP} from '@/schemas/admin/admin-mail-type';

const getTemplateType = (mailType: string) => {
  const templateType = MAIL_TYPE_MAP[mailType as keyof typeof MAIL_TYPE_MAP];
  if (!templateType) {
    throw new Error(`Invalid mail type: ${mailType}`);
  }
  return templateType;
};

export const getMailData = async (generationId: number, mailType: string) => {
  try {
    const isNotification = mailType === '지원 알림 메일';
    const url = isNotification
      ? ENDPOINT.ADMIN.RECRUITMENT_NOTIFICATION
      : ENDPOINT.ADMIN.RECRUITMENT_RESULT;

    const params = {
      generationId,
      ...(!isNotification && {
        templateType: getTemplateType(mailType),
      }),
    };

    const response = await privateAxios.get(url, {params});
    return isNotification
      ? NotificationMailResponseSchema.parse(response.data).data
      : ResultMailResponseSchema.parse(response.data).data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const saveMailContent = async (
  generationId: number,
  mailType: string,
  content: string
) => {
  try {
    const isNotification = mailType === '지원 알림 메일';
    const url = isNotification
      ? ENDPOINT.ADMIN.RECRUITMENT_NOTIFICATION
      : ENDPOINT.ADMIN.RECRUITMENT_RESULT;
    const body = {
      generationId,
      content,
      ...(!isNotification && {
        templateType: MAIL_TYPE_MAP[mailType as keyof typeof MAIL_TYPE_MAP],
      }),
    };

    const response = await privateAxios.post(url, body);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const sendMail = async (generationId: number, mailType: string) => {
  try {
    const isNotification = mailType === '지원 알림 메일';
    const url = isNotification
      ? ENDPOINT.ADMIN.RECRUITMENT_NOTIFICATION_SEND
      : ENDPOINT.ADMIN.RECRUITMENT_RESULT_SEND;

    const body = {
      generationId,
      ...(!isNotification && {
        templateType: MAIL_TYPE_MAP[mailType as keyof typeof MAIL_TYPE_MAP],
      }),
    };

    const response = await privateAxios.post(url, body);
    return MailSendResultSchema.parse(response.data).data;
  } catch (error) {
    return handleApiError(error);
  }
};
