import {z} from 'zod';

export const GenerationSchema = z.object({
  generationId: z.number(),
  startDate: z.string(),
  endDate: z.string(),
});

export const GenerationListSchema = z.array(GenerationSchema);

export type Generation = z.infer<typeof GenerationSchema>;
