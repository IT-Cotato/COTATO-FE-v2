import z from 'zod';

export const RecruitmentsStatusSchema = z.object({
  isRecruitingActive: z.boolean(),
  isAdditionalRecruitmentActive: z.boolean(),
});

/** 타입 추출 */
export type RecruitmentsStatusType = z.infer<typeof RecruitmentsStatusSchema>;
