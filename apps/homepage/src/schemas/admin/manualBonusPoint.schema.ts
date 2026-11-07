import {z} from 'zod';

/** 한 번의 수동 상점 부여에 허용하는 입력 상한이다. */
export const MANUAL_BONUS_POINT_MAX = 10;

/** 원기록과 취소 이력을 함께 보여 주는 관리자 전용 수동 상점 응답이다. */
export const ManualBonusPointSchema = z.object({
  id: z.number(),
  generationId: z.number(),
  memberId: z.number(),
  points: z.number(),
  reason: z.string(),
  createdAt: z.string(),
  createdBy: z.number(),
  createdByName: z.string(),
  cancelledAt: z.string().nullable(),
  cancelledBy: z.number().nullable(),
  cancelledByName: z.string().nullable(),
  cancellationReason: z.string().nullable(),
});

/** 같은 저장 시도의 재전송에는 대상·점수·사유와 요청 ID를 모두 유지한다. */
export const GrantManualBonusPointSchema = z.object({
  generationId: z.number().int().positive(),
  memberId: z.number().int().positive(),
  points: z.number().int().min(1).max(MANUAL_BONUS_POINT_MAX),
  reason: z.string().trim().min(1).max(300),
  requestId: z.uuid(),
});

export type ManualBonusPoint = z.infer<typeof ManualBonusPointSchema>;
export type GrantManualBonusPoint = z.infer<typeof GrantManualBonusPointSchema>;
