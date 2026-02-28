import z from 'zod';

export const AttendancePartSchema = z.enum(['ALL', 'PM', 'DE', 'FE', 'BE']);

export const FullSessionTableRowSchema = z.object({
  memberInfo: z.object({
    memberId: z.number(),
    name: z.string(),
    position: z.string(),
    generationId: z.number(),
  }),
  statistic: z.object({
    present: z.number(),
    late: z.number(),
    absent: z.number(),
    unauthorizedAbsent: z.number(),
  }),
});

/** 타입 추출 */
export type AttendancePartType = z.infer<typeof AttendancePartSchema>;
export type FullSessionTableRowType = z.infer<typeof FullSessionTableRowSchema>;
