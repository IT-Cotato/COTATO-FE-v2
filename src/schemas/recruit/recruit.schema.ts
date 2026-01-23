import z from 'zod';

/** 일정 타임라인 */
export const TimelineSchema = z.object({
  title: z.string(),
  date: z.string(),
});

/** 모집 포지션 - 직무 */
export const PositionSchema = z.enum(['PM', 'DE', 'FE', 'BE']);

/** 모집 포지션 */
export const PositionCardSchema = z.object({
  short: PositionSchema,
  name: z.string(),
  detail: z.string(),
});

/** 세션 활동 - 종류 */
export const ActivityCategorySchema = z.enum([
  'OT',
  'SESSION',
  'MT',
  'DEVTALK',
  'COKERTHON',
  'DEMODAY',
]);

/** 세션 활동 */
export const ActivityCardSchema = z.object({
  id: z.number(),
  short: ActivityCategorySchema,
  name: z.string(),
  date: z.string(),
});

/** 모집공고 조회 response */
export const RecruitmentNoticeSchema = z.object({
  generationId: z.number(),
  startDate: z.string(),
  endDate: z.string(),
  schedule: z.array(TimelineSchema),
  parts: z.array(PositionCardSchema),
  activities: z.array(ActivityCardSchema),
});

/** 타입 추출 */
export type TimelineType = z.infer<typeof TimelineSchema>;
export type PositionType = z.infer<typeof PositionSchema>;
export type PositionCardType = z.infer<typeof PositionCardSchema>;
export type ActivityCategoryType = z.infer<typeof ActivityCategorySchema>;
export type ActivityCardType = z.infer<typeof ActivityCardSchema>;
export type RecruitmentNoticeType = z.infer<typeof RecruitmentNoticeSchema>;
