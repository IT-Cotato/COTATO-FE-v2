import z from 'zod';

export const PositionSchema = z.enum(['PM', 'DE', 'FE', 'BE']);

export const AttendancePartSchema = z.enum(['ALL', 'PM', 'DE', 'FE', 'BE']);

export const AttendanceStatusSchema = z.enum([
  'PRESENT',
  'LATE',
  'ABSENT',
  'UNAUTHORIZED_ABSENT',
  'NOT_YET',
]);

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

export const FullSessionTableResponseSchema = z.array(
  FullSessionTableRowSchema
);

export const SpecificSessionTableRowSchema = z.object({
  memberInfo: z.object({
    memberId: z.number(),
    name: z.string(),
    position: z.string(),
    generationId: z.number(),
  }),
  result: AttendanceStatusSchema,
});

/** 타입 추출 */
export type PositionType = z.infer<typeof PositionSchema>;
export type AttendancePartType = z.infer<typeof AttendancePartSchema>;
export type AttendanceStatusType = z.infer<typeof AttendanceStatusSchema>;
export type FullSessionTableRowType = z.infer<typeof FullSessionTableRowSchema>;
export type FullSessionTableResponse = z.infer<
  typeof FullSessionTableResponseSchema
>;
export type SpecificSessionTableRowType = z.infer<
  typeof SpecificSessionTableRowSchema
>;
