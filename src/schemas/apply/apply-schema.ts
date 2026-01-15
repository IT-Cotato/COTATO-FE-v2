import {z} from 'zod';

export const BasicInfoFormSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  gender: z.enum(['male', 'female'], {
    message: '성별을 선택해주세요',
  }),
  contact: z.string().min(1, '연락처를 입력해주세요'),
  birthDate: z.string().min(1, '생년월일을 입력해주세요'),
  school: z.string().min(1, '학교를 입력해주세요'),
  isCollegeStudent: z.enum(['enrolled', 'other'], {
    message: '재학 여부를 선택해주세요',
  }),
  department: z.string().min(1, '학과를 입력해주세요'),
  completedSemesters: z.enum(['4', '5', '6', '7', '8'], {
    message: '수료 학기를 선택해주세요',
  }),
  isPrevActivity: z.enum(['yes', 'no'], {
    message: '활동 여부를 선택해주세요',
  }),
  part: z.string().min(1, '파트를 선택해주세요'),
});

export const StartApplicationResponseSchema = z.object({
  applicationId: z.number(),
  isSubmitted: z.boolean(),
});

export const BasicInfoResponseSchema = z.object({
  applicationId: z.number(),
  name: z.string(),
  gender: z.enum(['male', 'female']),
  birthDate: z.string(),
  phoneNumber: z.string(),
  university: z.string(),
  major: z.string(),
  completedSemesters: z.number(),
  isPrevActivity: z.boolean(),
  isEnrolled: z.boolean(),
  applicationPartType: z.string(),
});

export type BasicInfoFormData = z.infer<typeof BasicInfoFormSchema>;
export type StartApplicationResponse = z.infer<
  typeof StartApplicationResponseSchema
>;
export type BasicInfoResponse = z.infer<typeof BasicInfoResponseSchema>;
