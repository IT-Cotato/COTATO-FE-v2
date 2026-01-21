import {PartSchema} from '@/schemas/admin/admin-application-questions.schema';
import {createSuccessResponseSchema} from '@/schemas/common/common-schema';
import z from 'zod';

/**
 * 어드민 지원서 조회 - basic info 스키마
 */
export const AdminApplicationBasicInfoSchema = z.object({
  applicationId: z.number().int(),
  name: z.string(),
  gender: z.string(),
  birthDate: z.string(),
  phoneNumber: z.string(),
  school: z.string(),
  major: z.string(),
  isEnrolled: z.boolean(),
  completedSemesters: z.number().int(),
  isPrevActivity: z.boolean(),
  applicationPartType: PartSchema,
});

export const GetAdminApplicationBasicInfoResponseSchema =
  createSuccessResponseSchema(AdminApplicationBasicInfoSchema);

/**
 * 어드민 지원서 조회 - part questions 스키마
 */

export const PartQuestionWithAnswerSchema = z.object({
  sequence: z.number().int(),
  questionContent: z.string(),
  content: z.string().nullable(),
  byteSize: z.number().int(),
});

export const AdminApplicationPartQuestionsSchema = z.object({
  questionsWithAnswers: z.array(PartQuestionWithAnswerSchema),
  pdfFileUrl: z.string().nullable(),
  pdfFileKey: z.string().nullable(),
});
export const GetAdminApplicationPartQuestionsResponseSchema =
  createSuccessResponseSchema(AdminApplicationPartQuestionsSchema);

/**
 * 어드민 지원서 조회 - etc questions 스키마
 */
export const DiscoveryPathOptionSchema = z.object({
  value: z.string(),
});
export const DiscoveryPathSchema = z.object({
  options: z.array(DiscoveryPathOptionSchema),
  selectedAnswer: z.string().nullable(),
});

export const AdminApplicationEtcQuestionsSchema = z.object({
  discoveryPath: DiscoveryPathSchema,
  parallelActivities: z.string().nullable(),
  unavailableInterviewTimes: z.string().nullable(),
  sessionAttendance: z.boolean().nullable(),
  mandatoryEvents: z.boolean().nullable(),
  privacyPolicy: z.boolean().nullable(),
  interviewStartDate: z.string(),
  interviewEndDate: z.string(),
  otDate: z.string(),
});

/**
 * 어드민 지원서 조회 - 운영진 평가 스키마
 */
export const GetAdminApplicationEtcQuestionsResponseSchema =
  createSuccessResponseSchema(AdminApplicationEtcQuestionsSchema);

export const EvaluatorSchema = z.enum(['STAFF1', 'STAFF2', 'STAFF3', 'STAFF4']);

export const GetAdminApplicationEvaluationResponseSchema =
  createSuccessResponseSchema(
    z.object({
      comment: z.string().nullable(),
    })
  );

export const PostAdminApplicationEvaluationRequestSchema = z.object({
  evaluatorType: EvaluatorSchema,
  comment: z.string(),
});

/**
 * 타입 추출
 */
export type AdminApplicationBasicInfoType = z.infer<
  typeof AdminApplicationBasicInfoSchema
>;
export type GetAdminApplicationBasicInfoResponse = z.infer<
  typeof GetAdminApplicationBasicInfoResponseSchema
>;
export type GetAdminApplicationPartQuestionsResponse = z.infer<
  typeof GetAdminApplicationPartQuestionsResponseSchema
>;
export type PartQuestionWithAnswerType = z.infer<
  typeof PartQuestionWithAnswerSchema
>;
export type GetAdminApplicationEtcQuestionsResponse = z.infer<
  typeof GetAdminApplicationEtcQuestionsResponseSchema
>;
export type AdminApplicationEtcQuestionsType = z.infer<
  typeof AdminApplicationEtcQuestionsSchema
>;
export type EvaluatorType = z.infer<typeof EvaluatorSchema>;
export type GetAdminApplicationEvaluationResponse = z.infer<
  typeof GetAdminApplicationEvaluationResponseSchema
>;
export type PostAdminApplicationEvaluationRequest = z.infer<
  typeof PostAdminApplicationEvaluationRequestSchema
>;
