import {z} from 'zod';

export const GenerationSchema = z.object({
  generationId: z.number(),
  startDate: z.string(),
  endDate: z.string(),
});

const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export const PostGenerationRequestSchema = z.object({
  generationNumber: z.number().int().positive(),
  startDate: z.string().regex(ISO_DATE_REGEX),
  endDate: z.string().regex(ISO_DATE_REGEX),
});

export const GetGenerationDetailResponseSchema = z.object({
  id: z.number(),
  startDate: z.string().regex(ISO_DATE_REGEX),
  endDate: z.string().regex(ISO_DATE_REGEX),
});

export const PatchGenerationRequestSchema = z.object({
  startDate: z.string().regex(ISO_DATE_REGEX, 'YYYY-MM-DD 형식이어야 합니다.'),
  endDate: z.string().regex(ISO_DATE_REGEX, 'YYYY-MM-DD 형식이어야 합니다.'),
});

export const GenerationListSchema = z.array(GenerationSchema);
export const GenerationDetailSchema = GetGenerationDetailResponseSchema;
export const CreateGenerationRequestSchema = PostGenerationRequestSchema;
export const UpdateGenerationRequestSchema = PatchGenerationRequestSchema;

export type Generation = z.infer<typeof GenerationSchema>;
export type GenerationDetail = z.infer<typeof GenerationDetailSchema>;
export type CreateGenerationRequest = z.infer<
  typeof CreateGenerationRequestSchema
>;
export type UpdateGenerationRequest = z.infer<
  typeof UpdateGenerationRequestSchema
>;
