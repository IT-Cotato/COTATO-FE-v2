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
 * 제네릭 헬퍼 타입 제공
 */
export type SuccessResponse<T extends z.ZodTypeAny> = {
  code: string;
  message: string;
  data: z.infer<T>;
};
