import {createSuccessResponseSchema} from '@/schemas/common/common-schema';
import z from 'zod';

/**
 * 어드민 지원서 질문 스키마
 */

export const ApplicationQuestionsSchema = z.object({
  sequence: z.number(),
  content: z.string(),
  maxLength: z.number(),
});

export const ApplicationQuestionsListSchema = z.array(
  ApplicationQuestionsSchema
);

export const GetApplicationQuestionsResponseSchema =
  createSuccessResponseSchema(ApplicationQuestionsListSchema);

export const PartSchema = z.enum(['PM', 'DE', 'FE', 'BE']);

export const PostApplicationQuestionsRequestSchema = z.object({
  generationId: z.number(),
  questionType: PartSchema,
  questions: z.array(ApplicationQuestionsSchema),
});

/**
 * 타입 추출
 */
export type ApplicationQuestionsType = z.infer<
  typeof ApplicationQuestionsSchema
>;
export type GetApplicationQuestionsResponse = z.infer<
  typeof GetApplicationQuestionsResponseSchema
>;
export type PartType = z.infer<typeof PartSchema>;
export type PostApplicationQuestionsRequest = z.infer<
  typeof PostApplicationQuestionsRequestSchema
>;
