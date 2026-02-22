import {z} from 'zod';

export const GenerationSchema = z.object({
  generationId: z.number(),
  startDate: z.string(),
  endDate: z.string(),
});

export const PostGenerationRequestSchema = z.object({
  generationNumber: z.number(),
  startDate: z.string(),
  endDate: z.string(),
});

export const GetGenerationDetailResponseSchema = z.object({
  id: z.number(),
  startDate: z.string(),
  endDate: z.string(),
});

export const PatchGenerationRequestSchema = z.object({
  startDate: z.string(),
  endDate: z.string(),
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
