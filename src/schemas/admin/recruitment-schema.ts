import z from 'zod';
import {createSuccessResponseSchema} from '@/services/schemas/common.schema';

/**
 * 모집 활성화 요청 스키마
 */
export const PostRecruitmentActivationRequestSchema = z.object({
  generationId: z.number(),
  isAdditionalRecruitmentActive: z.boolean(),
  startDate: z.string(), // yyyy-MM-dd
  endDate: z.string(), // yyyy-MM-dd
});

/**
 * 모집 종료 요청 스키마
 */
export const PostRecruitmentDeactivationRequestSchema = z.object({
  generationId: z.number(),
});

/**
 * 응답 데이터 스키마
 */
export const RecruitmentResponseDataSchema = z.object({});

export const RecruitmentResponseSchema = createSuccessResponseSchema(
  RecruitmentResponseDataSchema
);

/**
 * 타입 추출
 */
export type PostRecruitmentActivationRequest = z.infer<
  typeof PostRecruitmentActivationRequestSchema
>;
export type PostRecruitmentDeactivationRequest = z.infer<
  typeof PostRecruitmentDeactivationRequestSchema
>;
export type RecruitmentResponse = z.infer<typeof RecruitmentResponseSchema>;
