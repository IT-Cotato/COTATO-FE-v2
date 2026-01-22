import z from 'zod';
import {createSuccessResponseSchema} from '@/schemas/common/common-schema';

export const GenerationSchema = z.object({
  generationId: z.number(),
});

/** 기수 목록 조회 스키마 */
export const GetGenerationsResponseSchema = createSuccessResponseSchema(
  z.array(GenerationSchema)
);

/** 기수 생성 스키마 */
export const PostGenerationRequestSchema = z.object({
  generationId: z.number(),
});

export const PostGenerationResponseSchema = createSuccessResponseSchema(
  z.any().optional()
);

/** 타입 추출 */
export type Generation = z.infer<typeof GenerationSchema>;
export type GetGenerationsResponse = z.infer<
  typeof GetGenerationsResponseSchema
>;
export type PostGenerationRequest = z.infer<typeof PostGenerationRequestSchema>;
