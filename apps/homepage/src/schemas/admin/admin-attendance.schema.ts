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

export const AttendanceIdByGenerationResponseSchema = z.array(
  z.object({
    sessionId: z.number(),
    attendanceId: z.nullable(z.number()),
  })
);

export const AdminAttendanceEntireTableRowSchema = z.object({
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

export const AdminAttendanceEntireTableResponseSchema = z.array(
  AdminAttendanceEntireTableRowSchema
);

export const AdminAttendanceSpecificTableRowSchema = z.object({
  memberInfo: z.object({
    memberId: z.number(),
    name: z.string(),
    position: z.string(),
    generationId: z.number(),
  }),
  result: AttendanceStatusSchema,
});

export const AdminAttendanceSpecificTableResponseSchema = z.array(
  AdminAttendanceSpecificTableRowSchema
);

/** 타입 추출 */
export type PositionType = z.infer<typeof PositionSchema>;
export type AttendancePartType = z.infer<typeof AttendancePartSchema>;
export type AttendanceStatusType = z.infer<typeof AttendanceStatusSchema>;
export type AttendanceIdByGenerationResponse = z.infer<
  typeof AttendanceIdByGenerationResponseSchema
>;
export type AdminAttendanceEntireTableRowType = z.infer<
  typeof AdminAttendanceEntireTableRowSchema
>;
export type AdminAttendanceEntireTableResponse = z.infer<
  typeof AdminAttendanceEntireTableResponseSchema
>;
export type AdminAttendanceSpecificTableRowType = z.infer<
  typeof AdminAttendanceSpecificTableRowSchema
>;
export type AdminAttendanceSpecificTableResponse = z.infer<
  typeof AdminAttendanceSpecificTableResponseSchema
>;
