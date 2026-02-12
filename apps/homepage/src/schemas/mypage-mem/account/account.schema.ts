import {z} from 'zod';

/**
 * 마이페이지 비밀번호 재설정 스키마
 */
export const MyPageResetPasswordSchema = z
  .object({
    currentPassword: z.string().min(1, '현재 비밀번호를 입력해주세요.'),
    password: z
      .string()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/, {
        message:
          '비밀번호는 영어, 숫자, 특수문자를 포함하여 8~16자 이내여야 합니다.',
      }),
    passwordConfirm: z
      .string()
      .min(1, '새 비밀번호를 다시 한 번 더 입력해주세요.'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

export type MyPageResetPasswordType = z.infer<typeof MyPageResetPasswordSchema>;
