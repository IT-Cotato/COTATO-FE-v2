import {z} from 'zod';

export const AttendanceStatusEnum = z.enum([
  'BEFORE',
  'OPEN',
  'LATE',
  'ABSENT',
  'CLOSED',
]);

export const MyAttendanceResultEnum = z.enum([
  'PRESENT',
  'LATE',
  'ABSENT',
  'UNAUTHORIZED_ABSENT',
  'NOT_YET',
]);

export const SessionTypeEnum = z.enum([
  'ONLINE',
  'OFFLINE',
  'ALL',
  'NO_ATTEND',
]);

export const SessionAttendanceSchema = z.object({
  sessionId: z.number(),
  sessionNumber: z.number(),
  title: z.string(),
  sessionDateTime: z.string(),
  content: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  placeName: z.string().nullable().optional(),
  roadNameAddress: z.string().nullable().optional(),
  sessionType: SessionTypeEnum,
  imageUrls: z.array(z.string()),
  attendanceId: z.number().nullable(),
  attendanceStatus: AttendanceStatusEnum.nullable(),
  myAttendanceResult: MyAttendanceResultEnum.nullable(),
});

export const AttendanceStatisticSchema = z.object({
  present: z.number().nullable(),
  late: z.number().nullable(),
  absent: z.number().nullable(),
  unauthorizedAbsent: z.number().nullable(),
});

export const SessionAttendanceListResponseSchema = z.object({
  generationId: z.number(),
  availableMonths: z.array(z.number()),
  currentMonth: z.number(),
  hasPreviousMonth: z.boolean(),
  hasNextMonth: z.boolean(),
  sessions: z.array(SessionAttendanceSchema),
});

export const MyAttendanceDashboardResponseSchema = z.object({
  generationId: z.number(),
  statistic: AttendanceStatisticSchema,
});

export type SessionAttendance = z.infer<typeof SessionAttendanceSchema>;
export type SessionAttendanceListResponse = z.infer<
  typeof SessionAttendanceListResponseSchema
>;
export type MyAttendanceDashboardResponse = z.infer<
  typeof MyAttendanceDashboardResponseSchema
>;
export type AttendanceStatistic = z.infer<typeof AttendanceStatisticSchema>;
export type AttendanceStatus = z.infer<typeof AttendanceStatusEnum>;
export type MyAttendanceResult = z.infer<typeof MyAttendanceResultEnum>;
