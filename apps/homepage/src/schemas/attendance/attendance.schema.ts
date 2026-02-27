import {z} from 'zod';

// 출결 상태 Enum
export const AttendanceOpenStatusEnum = z.enum([
  'CLOSED',
  'OPEN',
  'LATE',
  'ABSENT',
  'BEFORE',
]);

// 출결 상태 조회 응답 스키마
export const AttendanceStatusInfoSchema = z.object({
  attendanceId: z.number().int().nullable(),
  openStatus: AttendanceOpenStatusEnum,
});

export type AttendanceOpenStatus = z.infer<typeof AttendanceOpenStatusEnum>;
export type AttendanceStatusInfo = z.infer<typeof AttendanceStatusInfoSchema>;
export type AttendanceStatusResponse = AttendanceStatusInfo;
