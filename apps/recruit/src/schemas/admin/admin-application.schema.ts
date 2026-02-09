import {createSuccessResponseSchema} from '@/schemas/common/common-schema';
import z from 'zod';

/**
 * 어드민 지원서 조회 - 운영진 평가 스키마
 */

export const EvaluatorSchema = z.enum(['STAFF1', 'STAFF2', 'STAFF3', 'STAFF4']);

export const GetAdminApplicationEvaluationResponseSchema =
  createSuccessResponseSchema(
    z.object({
      comment: z.string().nullable(),
    })
  );

export const PostAdminApplicationEvaluationRequestSchema = z.object({
  evaluatorType: EvaluatorSchema,
  comment: z.string(),
});

export type EvaluatorType = z.infer<typeof EvaluatorSchema>;
export type GetAdminApplicationEvaluationResponse = z.infer<
  typeof GetAdminApplicationEvaluationResponseSchema
>;
export type PostAdminApplicationEvaluationRequest = z.infer<
  typeof PostAdminApplicationEvaluationRequestSchema
>;
