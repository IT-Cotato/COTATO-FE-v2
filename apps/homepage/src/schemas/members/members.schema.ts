import {z} from 'zod';

/**
 * 회원 정보 관련 스키마
 */
export const MemberInfoSchema = z.object({
  memberId: z.number(),
  name: z.string(),
  isAdmin: z.boolean(),
});

/**
 * 비밀번호 재설정 관련 스키마
 */
export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, {message: '비밀번호는 최소 8자 이상이어야 합니다.'})
      .max(16, {message: '비밀번호는 최대 16자 이내여야 합니다.'})
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/, {
        message:
          '비밀번호는 영어, 숫자, 특수문자를 포함하여 8~16자여야 합니다.',
      })
      .or(z.literal('')),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

/**
 * 타입 추출
 */
export type MemberInfo = z.infer<typeof MemberInfoSchema>;
export type ResetPasswordType = z.infer<typeof ResetPasswordSchema>;
