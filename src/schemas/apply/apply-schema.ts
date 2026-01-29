import {z} from 'zod';

export const BasicInfoFormSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요'),
  gender: z.enum(['MALE', 'FEMALE'], {
    message: '성별을 선택해주세요',
  }),
  contact: z
    .string()
    .min(1, '연락처를 입력해주세요')
    .superRefine((val, ctx) => {
      const isDigits = /^010\d{8}$/.test(val);
      const isHyphenated = /^010-\d{4}-\d{4}$/.test(val);

      if (!isDigits && !isHyphenated) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '연락처 형식이 올바르지 않습니다.',
        });
      }
    }),
  birthDate: z
    .string()
    .min(1, '생년월일을 입력해주세요')
    .superRefine((val, ctx) => {
      const is8Digit = /^\d{8}$/.test(val);
      const isHyphenated = /^\d{4}-\d{2}-\d{2}$/.test(val);

      if (!is8Digit && !isHyphenated) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: '생년월일은 8자리 형식이어야 합니다.',
        });
        return;
      }

      if (isHyphenated) {
        const [_, month, day] = val.split('-');
        if (month === '00' || day === '00') {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: '유효하지 않은 날짜입니다.',
          });
        }
      }
      if (is8Digit) {
        const month = val.slice(4, 6);
        const day = val.slice(6, 8);
        if (month === '00' || day === '00') {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: '유효하지 않은 날짜입니다.',
          });
        }
      }
    }),
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
  part: z.enum(['PM', 'DE', 'FE', 'BE'], {
    message: '파트를 선택해주세요',
  }),
});

export const StartApplicationResponseSchema = z.object({
  applicationId: z.number(),
  isSubmitted: z.boolean(),
});

export const BasicInfoRequestSchema = z.object({
  name: z.string(),
  gender: z.enum(['MALE', 'FEMALE']),
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
      partType: z.enum(['PM', 'DE', 'FE', 'BE']),
      length: z.number(),
      maxLength: z.number(),
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

export const DiscoveryPathEnum = z.enum([
  'INSTAGRAM',
  'EVERYTIME',
  'CAMPUSPICK',
  'JIKHAENG',
  'NAVER_CAFE',
  'OTHER_SNS',
  'FRIEND_REFERRAL',
  'NONE',
]);

export const EtcQuestionRequestSchema = z.object({
  discoveryPath: DiscoveryPathEnum,
  parallelActivities: z.string(),
  unavailableInterviewTimes: z.string(),
  sessionAttendanceAgreed: z.boolean(),
  mandatoryEventsAgreed: z.boolean(),
  privacyPolicyAgreed: z.boolean(),
});

export const EtcQuestionResponseSchema = z.object({
  discoveryPath: z.object({
    options: z.array(
      z.object({
        value: z.string(),
        label: z.string(),
      })
    ),
    selectedAnswer: z.string().nullable(),
  }),
  parallelActivities: z.string().nullable(),
  unavailableInterviewTimes: z.string().nullable(),
  sessionAttendance: z.boolean(),
  mandatoryEvents: z.boolean(),
  privacyPolicy: z.boolean(),
  interviewStartDate: z.string(),
  interviewEndDate: z.string(),
  otDate: z.string(),
});

export const GetUploadUrlResponseSchema = z.object({
  preSignedUrl: z.string(),
  key: z.string(),
});

export const GetFileUrlResponseSchema = z.object({
  pdfUrl: z.string(),
});

export type BasicInfoFormData = z.infer<typeof BasicInfoFormSchema>;
export type StartApplicationResponse = z.infer<
  typeof StartApplicationResponseSchema
>;
export type BasicInfoResponse = z.infer<typeof BasicInfoResponseSchema>;
export type BasicInfoRequest = z.infer<typeof BasicInfoRequestSchema>;
export type PartQuestionRequest = z.infer<typeof PartQuestionRequestSchema>;
export type PartQuestionResponse = z.infer<typeof PartQuestionResponseSchema>;
export type EtcQuestionRequest = z.infer<typeof EtcQuestionRequestSchema>;
export type EtcQuestionResponse = z.infer<typeof EtcQuestionResponseSchema>;
export type GetUploadUrlResponse = z.infer<typeof GetUploadUrlResponseSchema>;
export type GetFileUrlResponse = z.infer<typeof GetFileUrlResponseSchema>;
