import {createSuccessResponseSchema} from '@/schemas/common/common-schema';
import {z} from 'zod';

export const PART_MAP: Record<string, string> = {
  BACKEND: '백엔드',
  FRONTEND: '프론트엔드',
  DESIGN: '디자인',
  PLANNING: '기획',
};

export const ApplicationSchema = z.object({
  applicationId: z.number(),
  generationNumber: z.number(),
  part: z.string(),
  status: z.string(),
});

export const ApplicationListResponseSchema = createSuccessResponseSchema(
  z.array(ApplicationSchema)
);

/** 타입 추출 */
export type ApplicationType = z.infer<typeof ApplicationSchema>;
