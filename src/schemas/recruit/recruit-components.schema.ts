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
