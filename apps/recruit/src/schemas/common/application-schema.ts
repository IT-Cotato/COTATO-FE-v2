import {PartSchema} from '@/schemas/admin/admin-application-questions.schema';
import {createSuccessResponseSchema} from '@/schemas/common/common-schema';
import z from 'zod';

/**
 지원서 조회 - basic info 스키마
 */
export const ApplicationBasicInfoSchema = z.object({
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

export const GetApplicationBasicInfoResponseSchema =
  createSuccessResponseSchema(ApplicationBasicInfoSchema);

/**
 * 지원서 조회 - part questions 스키마
 */

export const PartQuestionWithAnswerSchema = z.object({
  sequence: z.number().int(),
  questionContent: z.string(),
  content: z.string().nullable(),
  length: z.number().int(),
  maxLength: z.number().int(),
});

export const ApplicationPartQuestionsSchema = z.object({
  questionsWithAnswers: z.array(PartQuestionWithAnswerSchema),
  pdfFileUrl: z.string().nullable(),
  pdfFileKey: z.string().nullable(),
});
export const GetApplicationPartQuestionsResponseSchema =
  createSuccessResponseSchema(ApplicationPartQuestionsSchema);

/**
 * 지원서 조회 - etc questions 스키마
 */
export const DiscoveryPathOptionSchema = z.object({
  value: z.string(),
});
export const DiscoveryPathSchema = z.object({
  options: z.array(DiscoveryPathOptionSchema),
  selectedAnswer: z.string().nullable(),
});

export const ApplicationEtcQuestionsSchema = z.object({
  discoveryPath: DiscoveryPathSchema,
  parallelActivities: z.string().nullable(),
  unavailableInterviewTimes: z.string().nullable(),
  sessionAttendance: z.boolean().nullable(),
  mandatoryEvents: z.boolean().nullable(),
  privacyPolicy: z.boolean().nullable(),
  interviewStartDate: z.string(),
  interviewEndDate: z.string(),
  otDate: z.string(),
  cokerthonDate: z.string(),
  demoDayDate: z.string(),
});

export const GetApplicationEtcQuestionsResponseSchema =
  createSuccessResponseSchema(ApplicationEtcQuestionsSchema);

/**
 * 타입 추출
 */
export type ApplicationBasicInfoType = z.infer<
  typeof ApplicationBasicInfoSchema
>;
export type GetApplicationBasicInfoResponse = z.infer<
  typeof GetApplicationBasicInfoResponseSchema
>;
export type GetApplicationPartQuestionsResponse = z.infer<
  typeof GetApplicationPartQuestionsResponseSchema
>;
export type PartQuestionWithAnswerType = z.infer<
  typeof PartQuestionWithAnswerSchema
>;
export type GetApplicationEtcQuestionsResponse = z.infer<
  typeof GetApplicationEtcQuestionsResponseSchema
>;
export type ApplicationEtcQuestionsType = z.infer<
  typeof ApplicationEtcQuestionsSchema
>;
