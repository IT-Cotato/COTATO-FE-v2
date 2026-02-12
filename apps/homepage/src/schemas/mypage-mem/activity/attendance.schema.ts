import {z} from 'zod';

export const AttendanceResultEnum = z.enum([
  'PRESENT', // 출석
  'LATE', // 지각
  'ABSENT', // 결석
  'UNAUTHORIZED_ABSENT', // 무단결석
]);

export const SessionTypeEnum = z.enum([
  'OFFLINE', // 대면
  'NO_ATTEND', // 비대면
]);

// 내 출석 통계 대시보드 스키마
export const AttendanceStatisticSchema = z.object({
  present: z.number(),
  late: z.number(),
  absent: z.number(),
  unauthorizedAbsent: z.number(),
});

// 개별 출석 기록 스키마
export const AttendanceRecordSchema = z.object({
  sessionId: z.number(),
  attendanceId: z.number(),
  memberId: z.number(),
  sessionNumber: z.number(),
  sessionTitle: z.string(),
  sessionDateTime: z.iso.datetime(),
  placeName: z.string(),
  sessionType: SessionTypeEnum,
  result: AttendanceResultEnum,
});

// 내 출석 현황 조회 응답
export const MyAttendanceResponseSchema = z.object({
  generationId: z.number(),
  statistic: AttendanceStatisticSchema,
  attendances: z.array(AttendanceRecordSchema),
});

export type AttendanceResult = z.infer<typeof AttendanceResultEnum>;
export type SessionType = z.infer<typeof SessionTypeEnum>;
export type AttendanceRecord = z.infer<typeof AttendanceRecordSchema>;
export type MyAttendanceResponse = z.infer<typeof MyAttendanceResponseSchema>;
