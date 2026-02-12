import {z} from 'zod';

export const AttendanceResultEnum = z.enum([
  'PRESENT',
  'LATE',
  'ABSENT',
  'UNAUTHORIZED_ABSENT',
]);

export const SessionTypeEnum = z.enum([
  'ONLINE',
  'OFFLINE',
  'ALL',
  'NO_ATTEND',
]);

// 내 출석 대시보드 스키마
export const AttendanceStatisticSchema = z.object({
  present: z.number().nullable(),
  late: z.number().nullable(),
  absent: z.number().nullable(),
  unauthorizedAbsent: z.number().nullable(),
});

export const MyAttendanceDashboardResponseSchema = z.object({
  generationId: z.number(),
  statistic: AttendanceStatisticSchema,
});

// 내 출석 기록 목록 스키마
export const MemberAttendResponseSchema = z.object({
  sessionId: z.number(),
  sessionNumber: z.number(),
  placeName: z.string(),
  sessionType: SessionTypeEnum,
  result: AttendanceResultEnum.nullable(),
});

export const MemberAttendanceRecordsResponseSchema = z.object({
  generationId: z.number(),
  attendances: z.array(MemberAttendResponseSchema),
});

export type AttendanceResult = z.infer<typeof AttendanceResultEnum>;
export type SessionType = z.infer<typeof SessionTypeEnum>;
export type MemberAttendResponse = z.infer<typeof MemberAttendResponseSchema>;
export type MyAttendanceDashboardResponse = z.infer<
  typeof MyAttendanceDashboardResponseSchema
>;
export type MemberAttendanceRecordsResponse = z.infer<
  typeof MemberAttendanceRecordsResponseSchema
>;
