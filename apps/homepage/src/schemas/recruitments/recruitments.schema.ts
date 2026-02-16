import z from 'zod';

export const RecruitmentsStatusSchema = z.object({
  active: z.boolean(),
});

/** 타입 추출 */
export type RecruitmentsStatusType = z.infer<typeof RecruitmentsStatusSchema>;
