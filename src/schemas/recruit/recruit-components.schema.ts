import z from 'zod';

/** 일정 타임라인 */
export const TimelineSchema = z.object({
  title: z.string(),
  date: z.string(),
});

export type TimelineType = z.infer<typeof TimelineSchema>;

/** 모집 포지션 - 직무 */
export const PositionSchema = z.enum(['PM', 'DE', 'FE', 'BE']);

export type PositionType = z.infer<typeof PositionSchema>;

/** 모집 포지션 */
export const PositionCardSchema = z.object({
  short: PositionSchema,
  name: z.string(),
  detail: z.string(),
});

export type PositionCardType = z.infer<typeof PositionCardSchema>;

/** 세션 활동 - 종류 */
export const ActivityCategorySchema = z.enum([
  'OT',
  'SESSION',
  'MT',
  'DEVTALK',
  'COKERTHON',
  'DEMODAY',
]);

export type ActivityCategoryType = z.infer<typeof ActivityCategorySchema>;

/** 세션 활동 */
export const ActivityCardSchema = z.object({
  id: z.number(),
  short: ActivityCategorySchema,
  name: z.string(),
  date: z.string(),
  imageUrl: z.url(),
});

export type ActivityCardType = z.infer<typeof ActivityCardSchema>;
