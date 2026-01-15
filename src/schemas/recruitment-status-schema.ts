import z from 'zod';
import {createSuccessResponseSchema} from '@/schemas/common/common-schema';

export const RecruitmentStatusDataSchema = z.object({
  isActive: z.boolean(),
  generationId: z.number().nullable(),
  isAdditionalRecruitmentActive: z.boolean(),
});

export const GetRecruitmentStatusResponseSchema = createSuccessResponseSchema(
  RecruitmentStatusDataSchema
);

export type RecruitmentStatusResponse = z.infer<
  typeof GetRecruitmentStatusResponseSchema
>;
