import z from 'zod';

/** 일정 타임라인 */
export const TimelineSchema = z.object({
  title: z.string(),
  date: z.string(),
});

export type TimelineType = z.infer<typeof TimelineSchema>;
