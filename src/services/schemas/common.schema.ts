import {z} from 'zod';

/**
 * 성공 응답 스키마 팩토리
 * @param dataSchema - 데이터 부분의 Zod 스키마
 * @returns SuccessResponse 스키마
 */
export const createSuccessResponseSchema = <T extends z.ZodTypeAny>(
  dataSchema: T
) => {
  return z.object({
    code: z.string(),
    message: z.string(),
    data: dataSchema,
  });
};

/**
 * 타입 추출
 */
export type SuccessResponse = z.infer<typeof createSuccessResponseSchema>;
