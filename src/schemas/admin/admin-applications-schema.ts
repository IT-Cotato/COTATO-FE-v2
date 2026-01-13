import {createSuccessResponseSchema} from '@/services/schemas/common.schema';
import z from 'zod';

/**
 * 모집 기간 조회 스키마
 */
export const RecruitmentPeriodSchema = z.object({
  recruitmentStart: z.string(),
  recruitmentEnd: z.string(),
});

/**
 * 파트 필터
 * */
export const ApplicationPartViewTypeSchema = z.enum([
  'PM',
  'DE',
  'FE',
  'BE',
  'ALL',
]);

/**
 * 합불 상태 필터
 */
export const ApplicationPassViewStatusSchema = z.enum([
  'PASS',
  'FAIL',
  'WAITLISTED',
  'PENDING',
  'ALL',
]);

/**
 * 합불 드롭다운용 필터 스키마
 */
export const ApplicationPassStatusSchema = z.enum([
  'PASS',
  'FAIL',
  'WAITLISTED',
  'PENDING',
]);

/**
 * 지원서 summary 스키마
 * 지원서에 대한 파트별 count, 전체 count
 */
export const ApplicationSummarySchema = z.object({
  totalCount: z.number(),
  pmCount: z.number(),
  designCount: z.number(),
  frontendCount: z.number(),
  backendCount: z.number(),
});

/**
 * 지원서 스키마
 * 지원서 목록에 대한 셀
 */
export const ApplicantSchema = z.object({
  applicationId: z.number(),
  name: z.string(),
  gender: z.string(),
  applicationPartType: z.string().nullable(),
  university: z.string(),
  phoneNumber: z.string(),
  passStatus: ApplicationPassStatusSchema,
  submittedAt: z.string(),
});

/**
 * 페이지네이션 스키마
 */
export const PageInfoSchema = z.object({
  currentPage: z.number(),
  totalPages: z.number(),
  totalElements: z.number(),
  size: z.number(),
});

/**
 * 지원서에 대한 데이터 스키마
 * 지원서 스키마 + 페이지네이션 스키마
 */
export const ApplicantsPageSchema = z.object({
  content: z.array(ApplicantSchema),
  pageInfo: PageInfoSchema,
});

/**
 * admin/applications 응답 데이터 전체 스키마
 */
export const AdminApplicationsDataSchema = z.object({
  recruitmentPeriodResponse: RecruitmentPeriodSchema,
  summary: ApplicationSummarySchema,
  applicants: ApplicantsPageSchema,
});

/**
 * admin/application response
 */
export const GetAdminApplicationsResponseSchema = createSuccessResponseSchema(
  AdminApplicationsDataSchema
);

/**
 * admin/application query
 */
export const GetAdminApplicationsParamsSchema = z.object({
  generationId: z.number(),
  partViewType: ApplicationPartViewTypeSchema,
  passViewStatuses: z.array(ApplicationPassViewStatusSchema),
  searchKeyword: z.string().optional(),
  page: z.number().optional(),
  size: z.number().optional(),
  sort: z.array(z.string()).optional(),
});

/**
 * 타입 추출
 */
export type RecruitmentPeriodSchemaType = z.infer<
  typeof RecruitmentPeriodSchema
>;
export type GetAdminApplicationsResponse = z.infer<
  typeof GetAdminApplicationsResponseSchema
>;
export type ApplicationPartViewType = z.infer<
  typeof ApplicationPartViewTypeSchema
>;
export type ApplicationPassViewStatus = z.infer<
  typeof ApplicationPassViewStatusSchema
>;
export type ApplicationPassStatus = z.infer<typeof ApplicationPassStatusSchema>;
export type GetAdminApplicationsParamsType = z.infer<
  typeof GetAdminApplicationsParamsSchema
>;
export type ApplicationSummaryType = z.infer<typeof ApplicationSummarySchema>;
export type ApplicantsPageType = z.infer<typeof ApplicantsPageSchema>;
export type ApplicantType = z.infer<typeof ApplicantSchema>;
