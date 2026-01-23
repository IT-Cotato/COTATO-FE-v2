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

// 작업 상태 조회 응답 스키마
export const MailJobStatusSchema = z.object({
  jobId: z.number(),
  isCompleted: z.boolean(),
  totalCount: z.number(),
  successCount: z.number(),
  failCount: z.number(),
  createdAt: z.string(),
  completedAt: z.string().nullable(),
  generationId: z.number(),
});

export const MailSendStartSchema = createSuccessResponseSchema(
  z.object({
    jobId: z.number(),
    totalCount: z.number(),
    generationId: z.number(),
  })
);

export const MailJobStatusResponseSchema =
  createSuccessResponseSchema(MailJobStatusSchema);

export const NotificationMailResponseSchema = createSuccessResponseSchema(
  NotificationMailDataSchema
);
export const ResultMailResponseSchema =
  createSuccessResponseSchema(ResultMailDataSchema);
