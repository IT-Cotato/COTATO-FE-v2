import {createSuccessResponseSchema} from '@/schemas/common/common-schema';
import z from 'zod';

/** 모집 일정 API 응답 스키마 */
export const RecruitmentScheduleDataSchema = z.object({
  generationId: z.number(),
  applicationStartDate: z.string(),
  applicationEndDate: z.string(),
  documentAnnouncement: z.string().nullable(),
  interviewStartDate: z.string().nullable(),
  interviewEndDate: z.string().nullable(),
  finalAnnouncement: z.string().nullable(),
  otDate: z.string().nullable(),
});

export const GetRecruitmentScheduleResponseSchema = createSuccessResponseSchema(
  RecruitmentScheduleDataSchema
);

export type RecruitmentScheduleData = z.infer<
  typeof RecruitmentScheduleDataSchema
>;
export type GetRecruitmentScheduleResponse = z.infer<
  typeof GetRecruitmentScheduleResponseSchema
>;
