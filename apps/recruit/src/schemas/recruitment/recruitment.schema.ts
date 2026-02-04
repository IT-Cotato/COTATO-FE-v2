import z from 'zod';

export const RecruitmentStatusResponseSchema = z.object({
  isActive: z.boolean(),
  generationId: z.number().nullable(),
  isAdditionalRecruitmentActive: z.boolean(),
});

export const RecruitmentNotifyRequestSchema = z.object({email: z.email()});

export type RecruitmentStatusResponse = z.infer<
  typeof RecruitmentStatusResponseSchema
>;
export type RecruitmentNotifyRequest = z.infer<
  typeof RecruitmentNotifyRequestSchema
>;
