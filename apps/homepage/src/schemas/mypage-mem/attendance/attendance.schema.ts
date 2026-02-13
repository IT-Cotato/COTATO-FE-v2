import {z} from 'zod';

export const AttendanceStatusEnum = z.enum([
  'BEFORE',
  'OPEN',
  'LATE',
  'CLOSED',
]);

export const MyAttendanceResultEnum = z.enum([
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

export const SessionAttendanceSchema = z.object({
  sessionId: z.number(),
  sessionNumber: z.number(),
  title: z.string(),
  sessionDateTime: z.string(),
  content: z.string().optional(),
  placeName: z.string().optional(),
  roadNameAddress: z.string().optional(),
  sessionType: SessionTypeEnum,
  imageUrls: z.array(z.string()),
  attendanceId: z.number().nullable(),
  attendanceStatus: AttendanceStatusEnum.nullable(),
  myAttendanceResult: MyAttendanceResultEnum.nullable(),
});

export const SessionAttendanceListResponseSchema = z.object({
  generationId: z.number(),
  availableMonths: z.array(z.number()),
  currentMonth: z.number(),
  hasPreviousMonth: z.boolean(),
  hasNextMonth: z.boolean(),
  sessions: z.array(SessionAttendanceSchema),
});

export type SessionAttendance = z.infer<typeof SessionAttendanceSchema>;
export type SessionAttendanceListResponse = z.infer<
  typeof SessionAttendanceListResponseSchema
>;
export type AttendanceStatus = z.infer<typeof AttendanceStatusEnum>;
export type MyAttendanceResult = z.infer<typeof MyAttendanceResultEnum>;
