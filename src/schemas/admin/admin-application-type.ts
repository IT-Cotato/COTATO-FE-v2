import {PartSchema} from '@/schemas/admin/admin-application-questions.schema';
import z from 'zod';

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
  part: PartSchema,
  school: z.string(),
  submitDate: z.string(),
  result: ApplicationResultSchema,
});
export type ApplicationType = z.infer<typeof ApplicationSchema>;

/**
 * 지원서 상세
 */

export const ApplicationDetailSchema = z.object({
  applicationId: z.number(),

  basicInfo: z.object({
    name: z.string(),
    gender: z.enum(['남', '여']),
    birthDate: z.string(),
    phoneNumber: z.string(),
    school: z.string(),
    enrollmentStatus: z.enum(['재학', '휴학 · 졸업 · 유예']),
    major: z.string(),
    completedSemesters: z.enum([
      '4학기',
      '5학기',
      '6학기',
      '7학기',
      '8학기 이상',
    ]),
    isPrevActivity: z.string(),
  }),

  partQuestionInfo: z.object({
    selectedPart: z.enum(['기획', '디자인', '프론트엔드', '백엔드']),
    ans_1: z.string().max(600),
    ans_2: z.string().max(600),
    ans_3: z.string().max(600),
    ans_4: z.string().max(600),
    files: z
      .array(
        z.object({
          name: z.string(),
        })
      )
      .optional(),
    links: z.array(z.string().optional()),
  }),

  EtcQuestionInfo: z.object({
    discoveryPath: z.enum([
      'INSTAGRAM',
      'NAVER_CAFE',
      'EVERYTIME',
      'CAMPUSPICK',
      'JIKHANG',
      'OTHER_SNS',
      'FRIEND_REFERRAL',
      'NONE',
    ]),

    parallelActivity: z.string(),

    interviewUnavailableTime: z.object({
      march3: z.string(),
      march4: z.string(),
    }),

    agreeSessionTime: z.boolean(),
    agreeMandatorySchedule: z.boolean(),
    agreePrivacyPolicy: z.literal(true),
  }),
});

export type ApplicationDetailType = z.infer<typeof ApplicationDetailSchema>;

export type BasicInfoType = z.infer<
  typeof ApplicationDetailSchema.shape.basicInfo
>;

export type PartQuestionType = z.infer<
  typeof ApplicationDetailSchema.shape.partQuestionInfo
>;

export type EtcQuestionType = z.infer<
  typeof ApplicationDetailSchema.shape.EtcQuestionInfo
>;
