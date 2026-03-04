import z from 'zod';
import {AttendanceStatusSchema} from '@/schemas/admin/admin-attendance.schema';

export const FullSessionTableRowSchema = z.object({
  memberId: z.number(),
  name: z.string(),
  attendanceMinusPoint: z.number(),
  sessionMinusPoint: z.number(),
  beerNetworkingCount: z.number(),
  beerNetworkingBonusPoint: z.number(),
  totalMinusPoint: z.number(),
});

export const FullSessionTableResponseSchema = z.array(
  FullSessionTableRowSchema
);

export const SpecificSessionTableRowSchema = z.object({
  memberId: z.number(),
  name: z.string(),
  attendanceResult: AttendanceStatusSchema,
  beerNetworkingParticipated: z.boolean(),
  extraMinusPoint: z.number(),
});

export const SpecificSessionTableResponseSchema = {
  sessionId: z.number(),
  sessionNumber: z.number(),
  sessionTitle: z.string(),
  sessionDateTime: z.string(),
  members: z.array(SpecificSessionTableRowSchema),
};

/** 타입 추출 */
export type FullSessionTableRowType = z.infer<typeof FullSessionTableRowSchema>;
export type FullSessionTableResponse = z.infer<
  typeof FullSessionTableResponseSchema
>;
export type SpecificSessionTableRowType = z.infer<
  typeof SpecificSessionTableRowSchema
>;
export type SpecificSessionTableResponse = z.infer<
  typeof SpecificSessionTableResponseSchema
>;
