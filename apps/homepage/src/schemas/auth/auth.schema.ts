import z from 'zod';

/**
 * 로그인 스키마
 */
export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, {message: '이메일을 입력해 주세요.'})
    .email({message: '이메일 형식이 아닙니다.'})
    .or(z.literal('')),

  password: z
    .string()
    .min(1, {message: '비밀번호를 입력해 주세요.'})
    .or(z.literal('')),
});

export const LoginResponse = z.object({
  accessToken: z.string(),
});

/*
 * 회원가입 스키마
 */
export const JoinRequestSchema = z.object({
  email: z
    .string()
    .email({message: '이메일 형식이 아닙니다.'})
    .or(z.literal('')),
  password: z
    .string()
    .min(8, {message: '비밀번호는 최소 8자 이상이어야 합니다.'})
    .max(16, {message: '비밀번호는 최대 16자 이내여야 합니다.'})
    .regex(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,16}$/, {
      message: '비밀번호는 영어, 숫자, 특수문자를 포함하여 8~16자여야 합니다.',
    })
    .or(z.literal('')),
  name: z.string().min(1, {message: '이름을 입력해 주세요.'}).or(z.literal('')),
  phoneNumber: z
    .string()
    .length(11, {message: '전화번호는 숫자 11자리여야 합니다.'})
    .regex(/^010\d{8}$/, {
      message: '전화번호 양식이 올바르지 않습니다.',
    })
    .or(z.literal('')),
  termsOfServiceAgreed: z.boolean().refine((val) => val === true, {
    message: '이용약관에 동의해야 합니다.',
  }),
  privacyPolicyAgreed: z.boolean().refine((val) => val === true, {
    message: '개인정보 수집 및 이용에 동의해야 합니다.',
  }),
  gender: z.enum(['MALE', 'FEMALE']),
  university: z
    .string()
    .regex(/.*대학교$/, {
      message: '학교명이 올바르지 않습니다.',
    })
    .or(z.literal('')),
  position: z.enum(['NONE', 'PM', 'DE', 'FE', 'BE']),
});

export const JoinResponseSchema = z.object({
  memberId: z.number(),
});

export const SendCodeRequestSchema = z.object({
  email: z
    .string()
    .email({message: '이메일 형식이 아닙니다.'})
    .or(z.literal('')),
});

export const VerifyCodeRequestSchema = z.object({
  email: z.string().email(),
  code: z.string().min(1, {message: '인증 코드를 입력해 주세요.'}),
});

// 비밀번호 찾기 인증코드 발송 요청
export const SendResetCodeRequestSchema = z.object({
  email: z
    .string()
    .email({message: '이메일 형식이 아닙니다.'})
    .or(z.literal('')),
});

// 비밀번호 찾기 인증코드 확인 요청
export const VerifyResetCodeRequestSchema = z.object({
  email: z.string().email(),
  code: z
    .string()
    .min(1, {message: '인증 코드를 입력해 주세요.'})
    .or(z.literal('')),
});

// 인증 성공 시 서버에서 내려주는 응답 타입
export interface VerifyResetCodeResponse {
  accessToken: string;
}

/** 타입 추출 */
export type LoginType = z.infer<typeof LoginSchema>;
export type LoginResponseType = z.infer<typeof LoginResponse>;

export type JoinRequestType = z.infer<typeof JoinRequestSchema>;
export type JoinResponseType = z.infer<typeof JoinResponseSchema>;

export type SendCodeRequestType = z.infer<typeof SendCodeRequestSchema>;
export type VerifyCodeRequestType = z.infer<typeof VerifyCodeRequestSchema>;

export type SendResetCodeRequestType = z.infer<
  typeof SendResetCodeRequestSchema
>;
export type VerifyResetCodeRequestType = z.infer<
  typeof VerifyResetCodeRequestSchema
>;
