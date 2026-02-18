import z from 'zod';

/** faq 타입 */
export const faqParametersSchema = z.enum(['COMMON', 'PM', 'DE', 'FE', 'BE']);

/** faq 타입 */
export const faqSchema = z.object({
  id: z.number(),
  question: z.string(),
  answer: z.string(),
});

/** faq 조회 response */
export const faqResponseSchema = z.array(faqSchema);

/** 타입 추출 */
export type faqParametersType = z.infer<typeof faqParametersSchema>;
export type faqType = z.infer<typeof faqSchema>;
export type faqResponseType = z.infer<typeof faqResponseSchema>;
