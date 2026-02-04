import z from 'zod';

export const RecruitmentNotifyRequestSchema = z.object({email: z.email()});

export type RecruitmentNotifyRequest = z.infer<
  typeof RecruitmentNotifyRequestSchema
>;
