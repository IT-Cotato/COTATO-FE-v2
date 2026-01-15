import {z} from 'zod';
import {createSuccessResponseSchema} from '@/schemas/common/common-schema';

const BaseMailDataSchema = z.object({
  templateId: z.number().nullable(),
  content: z.string(),
  isSent: z.boolean(),
  sentAt: z.string().nullable(),
  generationId: z.number(),
});

// 지원 알림 메일 데이터
export const NotificationMailDataSchema = BaseMailDataSchema.extend({
  subscriberCount: z.number(),
});

// 결과 통보 메일 데이터 (합격/불합격/예비)
export const ResultMailDataSchema = BaseMailDataSchema.extend({
  templateType: z.string(),
  templateTypeDescription: z.string(),
  recipientCount: z.number(),
});

// 메일 전송 응답 데이터
export const MailSendResultSchema = createSuccessResponseSchema(
  z.object({
    successCount: z.number(),
    failCount: z.number(),
    sentAt: z.string(),
    generationId: z.number(),
  })
);

export const NotificationMailResponseSchema = createSuccessResponseSchema(
  NotificationMailDataSchema
);
export const ResultMailResponseSchema =
  createSuccessResponseSchema(ResultMailDataSchema);
