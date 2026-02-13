import {z} from 'zod';

export const PointTypeEnum = z.enum([
  'BONUS', // 상점
  'MINUS', // 벌점
]);

export const PenaltyDashboardSchema = z.object({
  generationId: z.number(),
  totalPoint: z.number(),
  bonusPoint: z.number(),
  minusPoint: z.number(),
  beerNetworkingCount: z.number(),
});

// 개별 상벌점 기록 스키마
export const PenaltyRecordSchema = z.object({
  sessionId: z.number(),
  week: z.number(),
  sessionDateTime: z.string().datetime(),
  content: z.string(),
  pointType: PointTypeEnum,
  point: z.number(),
  cumulativePoint: z.number(),
});

// 내 상벌점 내역 조회 응답 스키마
export const MyPenaltyResponseSchema = z.object({
  generationId: z.number(),
  dashboard: PenaltyDashboardSchema,
  records: z.array(PenaltyRecordSchema),
});

export type PointType = z.infer<typeof PointTypeEnum>;
export type PenaltyRecord = z.infer<typeof PenaltyRecordSchema>;
export type PenaltyDashboard = z.infer<typeof PenaltyDashboardSchema>;
export type MyPenaltyResponse = z.infer<typeof MyPenaltyResponseSchema>;
