import {createSuccessResponseSchema} from '@/schemas/common/common-schema';
import z from 'zod';

/** 어드민 모집 일정 스키마 */
export const RecruitmentInformationSchema = z.object({
  recruitmentStart: z.string(),
  recruitmentEnd: z.string(),
  documentAnnouncement: z.string(),
  interviewStart: z.string(),
  interviewEnd: z.string(),
  finalAnnouncement: z.string(),
  ot: z.string(),
});

export const GetAdminRecruitmentInformationResponseSchema =
  createSuccessResponseSchema(RecruitmentInformationSchema);

export const PostAdminRecruitmentInformationRequestSchema = z.object({
  generationId: z.number(),
  recruitmentStart: z.string(),
  recruitmentEnd: z.string(),
  documentAnnouncement: z.string(),
  interviewStart: z.string(),
  interviewEnd: z.string(),
  finalAnnouncement: z.string(),
  ot: z.string(),
});

/** 타입 추출 */
export type RecruitmentInformation = z.infer<
  typeof RecruitmentInformationSchema
>;
export type GetAdminRecruitmentInformationResponse = z.infer<
  typeof GetAdminRecruitmentInformationResponseSchema
>;
export type PostAdminRecruitmentInformationRequest = z.infer<
  typeof PostAdminRecruitmentInformationRequestSchema
>;
