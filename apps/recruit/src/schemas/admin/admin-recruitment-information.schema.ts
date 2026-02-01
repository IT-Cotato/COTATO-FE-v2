import {createSuccessResponseSchema} from '@/schemas/common/common-schema';
import z from 'zod';

/** 어드민 모집 일정 스키마 */
export const RecruitmentInformationSchema = z.object({
  recruitmentStart: z.string().nullable(),
  recruitmentEnd: z.string().nullable(),
  documentAnnouncement: z.string().nullable(),
  interviewStart: z.string().nullable(),
  interviewEnd: z.string().nullable(),
  finalAnnouncement: z.string().nullable(),
  ot: z.string().nullable(),
  cokerthon: z.string().nullable(),
  demoDay: z.string().nullable(),
});

export const GetAdminRecruitmentInformationResponseSchema =
  createSuccessResponseSchema(RecruitmentInformationSchema);

export const PostAdminRecruitmentInformationRequestSchema = z.object({
  generationId: z.number(),
  recruitmentStart: z.string().nullable(),
  recruitmentEnd: z.string().nullable(),
  documentAnnouncement: z.string().nullable(),
  interviewStart: z.string().nullable(),
  interviewEnd: z.string().nullable(),
  finalAnnouncement: z.string().nullable(),
  ot: z.string().nullable(),
  cokerthon: z.string().nullable(),
  demoDay: z.string().nullable(),
});

/** 타입 추출 */
export type RecruitmentInformationType = z.infer<
  typeof RecruitmentInformationSchema
>;
export type GetAdminRecruitmentInformationResponse = z.infer<
  typeof GetAdminRecruitmentInformationResponseSchema
>;
export type PostAdminRecruitmentInformationRequest = z.infer<
  typeof PostAdminRecruitmentInformationRequestSchema
>;
