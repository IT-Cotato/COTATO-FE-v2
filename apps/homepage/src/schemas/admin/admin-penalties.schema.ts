import z from 'zod';
import {AttendanceStatusSchema} from '@/schemas/admin/admin-attendance.schema';

export const AdminPenaltiesEntireTableRowSchema = z.object({
  memberId: z.number(),
  name: z.string(),
  attendanceMinusPoint: z.number(),
  sessionMinusPoint: z.number(),
  beerNetworkingCount: z.number(),
  beerNetworkingBonusPoint: z.number(),
  totalMinusPoint: z.number(),
});

export const AdminPenaltiesEntireTableResponseSchema = z.array(
  AdminPenaltiesEntireTableRowSchema
);

export const AdminPenaltiesSpecificTableRowSchema = z.object({
  memberId: z.number(),
  name: z.string(),
  attendanceResult: AttendanceStatusSchema,
  beerNetworkingParticipated: z.boolean(),
  extraMinusPoint: z.number(),
});

export const AdminPenaltiesSpecificTableResponseSchema = z.object({
  sessionId: z.number(),
  sessionNumber: z.number(),
  sessionTitle: z.string(),
  sessionDateTime: z.string(),
  members: z.array(AdminPenaltiesSpecificTableRowSchema),
});

/** 타입 추출 */
export type AdminPenaltiesEntireTableRowType = z.infer<
  typeof AdminPenaltiesEntireTableRowSchema
>;
export type AdminPenaltiesEntireTableResponse = z.infer<
  typeof AdminPenaltiesEntireTableResponseSchema
>;
export type AdminPenaltiesSpecificTableRowType = z.infer<
  typeof AdminPenaltiesSpecificTableRowSchema
>;
export type AdminPenaltiesSpecificTableResponse = z.infer<
  typeof AdminPenaltiesSpecificTableResponseSchema
>;
