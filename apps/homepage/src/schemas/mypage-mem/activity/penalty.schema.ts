import {z} from 'zod';

// 상벌점 구분
export const PointTypeEnum = z.enum(['BONUS', 'MINUS']);

/** 내 상벌점 대시보드 조회 응답 */
export const MyMinusPointDashboardResponseSchema = z.object({
  generationId: z.number(),
  totalPoint: z.number().nullable(),
  bonusPoint: z.number().nullable(),
  minusPoint: z.number().nullable(),
  beerNetworkingCount: z.number().nullable(),
});

/** 개별 상/벌점 내역 항목 */
export const MyMinusPointRecordResponseSchema = z.object({
  sessionId: z.number(),
  week: z.number(),
  sessionDateTime: z.string(),
  content: z.string(),
  pointType: PointTypeEnum,
  point: z.number(),
  cumulativePoint: z.number(),
});

/** 내 상벌점 내역 목록 조회 응답 */
export const MyMinusPointRecordsResponseSchema = z.object({
  generationId: z.number(),
  records: z.array(MyMinusPointRecordResponseSchema),
});

export type PointType = z.infer<typeof PointTypeEnum>;

/** 세션 없는 기록은 주차가 null이며 기존 주차 전용 스키마와 별도로 검증한다. */
export const PointTimelineRecordSchema = z.object({
  recordId: z.string(),
  source: z.enum(['SESSION', 'MANUAL']),
  week: z.number().nullable(),
  occurredAt: z.string().nullable(),
  content: z.string(),
  pointType: PointTypeEnum,
  point: z.number(),
  cumulativePoint: z.number(),
});

export const MyPointTimelineResponseSchema = z.object({
  generationId: z.number().nullable(),
  records: z.array(PointTimelineRecordSchema),
});

export type PointTimelineRecord = z.infer<typeof PointTimelineRecordSchema>;
export type MyMinusPointDashboardResponse = z.infer<
  typeof MyMinusPointDashboardResponseSchema
>;
export type PenaltyRecord = z.infer<typeof MyMinusPointRecordResponseSchema>; // 컴포넌트에서 PenaltyRecord로 사용 중
export type MyMinusPointRecordsResponse = z.infer<
  typeof MyMinusPointRecordsResponseSchema
>;
