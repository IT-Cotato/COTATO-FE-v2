import {z} from 'zod';

// 출결 결과
export const AttendanceResultEnum = z.enum([
  'PRESENT',
  'LATE',
  'ABSENT',
  'UNAUTHORIZED_ABSENT',
]);

// 세션 타입
export const SessionTypeEnum = z.enum([
  'NO_ATTEND',
  'ONLINE',
  'OFFLINE',
  'ALL',
]);

/** 내 출석 대시보드 조회 응답 */
export const MyAttendanceDashboardResponseSchema = z.object({
  generationId: z.number(),
  statistic: z.object({
    present: z.number().nullable(),
    late: z.number().nullable(),
    absent: z.number().nullable(),
    unauthorizedAbsent: z.number().nullable(),
  }),
});

/** 내 출석 기록 개별 항목 */
export const MemberAttendResponseSchema = z.object({
  sessionId: z.number(),
  sessionNumber: z.number(),
  placeName: z.string(),
  sessionType: SessionTypeEnum,
  result: AttendanceResultEnum.nullable(),
});

/** 내 출석 기록 목록 조회 응답 */
export const MemberAttendanceRecordsResponseSchema = z.object({
  generationId: z.number(),
  attendances: z.array(MemberAttendResponseSchema),
});

export type AttendanceResult = z.infer<typeof AttendanceResultEnum>;
export type SessionType = z.infer<typeof SessionTypeEnum>;
export type MyAttendanceDashboardResponse = z.infer<
  typeof MyAttendanceDashboardResponseSchema
>;
export type MemberAttendResponse = z.infer<typeof MemberAttendResponseSchema>;
export type MemberAttendanceRecordsResponse = z.infer<
  typeof MemberAttendanceRecordsResponseSchema
>;
