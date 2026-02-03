import z from 'zod';

/**
 * 모집 활성화 요청 스키마
 */
export const PostRecruitmentActivationRequestSchema = z.object({
  generationId: z.number(),
  isAdditionalRecruitmentActive: z.boolean(),
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
export const RecruitmentResponseSchema = z.object({
  code: z.string(),
  message: z.string(),
  data: z.any().optional(),
});

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
