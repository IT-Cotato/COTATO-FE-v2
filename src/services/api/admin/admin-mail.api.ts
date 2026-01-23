import {privateAxios} from '@/services/config/axios';
import {ENDPOINT} from '@/services/constant/endpoint';
import {handleApiError} from '@/services/utils/apiHelper';
import {
  NotificationMailResponseSchema,
  ResultMailResponseSchema,
  MailSendStartSchema,
} from '@/schemas/admin/admin-mail.schema';
import {MAIL_TYPE_MAP} from '@/schemas/admin/admin-mail.type';

const getTemplateType = (mailType: string) => {
  const templateType = MAIL_TYPE_MAP[mailType as keyof typeof MAIL_TYPE_MAP];
  if (!templateType && mailType !== '지원 알림 메일') {
    throw new Error(`Invalid mail type: ${mailType}`);
  }
  return templateType;
};

/**
 * 메일 내용 조회 (성공/실패 카운트 포함)
 */
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

/**
 * 메일 내용 저장 (수정)
 */
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
        templateType: getTemplateType(mailType),
      }),
    };

    const response = await privateAxios.post(url, body);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

/**
 * 메일 전송
 */
export const sendMail = async (generationId: number, mailType: string) => {
  try {
    const isNotification = mailType === '지원 알림 메일';
    const url = isNotification
      ? ENDPOINT.ADMIN.RECRUITMENT_NOTIFICATION_SEND
      : ENDPOINT.ADMIN.RECRUITMENT_RESULT_SEND;

    const body = {
      generationId,
      ...(!isNotification && {
        templateType: getTemplateType(mailType),
      }),
    };

    const response = await privateAxios.post(url, body);
    return MailSendStartSchema.parse(response.data).data;
  } catch (error) {
    return handleApiError(error);
  }
};
