import z from 'zod';

/**
 * 파트 필터 (전체 포함)
 */
export const PartSchema = z.enum([
  'all',
  'plan',
  'design',
  'frontend',
  'backend',
]);
export type PartType = z.infer<typeof PartSchema>;

/**
 * 파트 (etc 포함)
 */
export const PartEtcSchema = z.enum([
  'etc',
  'plan',
  'design',
  'frontend',
  'backend',
]);
export type PartEtcType = z.infer<typeof PartEtcSchema>;

/**
 * 리뷰어
 */
export const ReviewerSchema = z.enum(['admin1', 'admin2', 'admin3', 'admin4']);
export type ReviewerType = z.infer<typeof ReviewerSchema>;

/**
 * 지원 결과
 */
export const ApplicationResultSchema = z.enum([
  '합격',
  '불합격',
  '예비합격',
  '평가전',
]);

export type ApplicationResultType = z.infer<typeof ApplicationResultSchema>;

/**
 * 지원서
 */
export const ApplicationSchema = z.object({
  id: z.number(),
  name: z.string(),
  phone: z.string(),
  part: z.string(),
  school: z.string(),
  gender: z.string(),
  result: ApplicationResultSchema,
});
export type ApplicationType = z.infer<typeof ApplicationSchema>;
