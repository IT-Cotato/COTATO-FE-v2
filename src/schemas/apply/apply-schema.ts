import {z} from 'zod';

export const BasicInfoFormSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  gender: z.enum(['male', 'female'], {
    message: '성별을 선택해주세요',
  }),
  contact: z
    .string()
    .min(1, '연락처를 입력해주세요')
    .regex(/^010-\d{4}-\d{4}$/, '010-0000-0000 형식으로 입력해주세요'),
  birthDate: z
    .string()
    .min(1, '생년월일을 입력해주세요')
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD 형식으로 입력해주세요'),
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

export const BasicInfoRequestSchema = z.object({
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

export const BasicInfoResponseSchema = BasicInfoRequestSchema.extend({
  applicationId: z.number(),
});

export const PartQuestionRequestSchema = z.object({
  answers: z.array(
    z.object({
      questionId: z.number(),
      content: z.string(),
    })
  ),
  pdfFileUrl: z.string().nullable().optional(),
  pdfFileKey: z.string().nullable().optional(),
});

export const PartQuestionResponseSchema = z.object({
  questionsWithAnswers: z.array(
    z.object({
      questionId: z.number(),
      sequence: z.number(),
      content: z.string(),
      partType: z.enum(['COMMON', 'PM', 'DE', 'FE', 'BE']),
      maxByte: z.number(),
      savedAnswer: z
        .object({
          answerId: z.number(),
          questionId: z.number(),
          content: z.string(),
        })
        .nullable(),
    })
  ),
  pdfFileUrl: z.string().nullable(),
  pdfFileKey: z.string().nullable(),
});

export type BasicInfoFormData = z.infer<typeof BasicInfoFormSchema>;
export type StartApplicationResponse = z.infer<
  typeof StartApplicationResponseSchema
>;
export type BasicInfoResponse = z.infer<typeof BasicInfoResponseSchema>;
export type BasicInfoRequest = z.infer<typeof BasicInfoRequestSchema>;
export type PartQuestionRequest = z.infer<typeof PartQuestionRequestSchema>;
export type PartQuestionResponse = z.infer<typeof PartQuestionResponseSchema>;
