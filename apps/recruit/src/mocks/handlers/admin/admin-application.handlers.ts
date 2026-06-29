import {http} from 'msw';
import {ERROR, formatKoreanDate, requireStaff, success} from '@/mocks/utils';
import {
  getApplicationQuestions,
  getRecruitmentInformation,
  mockApplications,
} from '@/mocks/data/store';
import {
  EvaluatorType,
  PostAdminApplicationEvaluationRequest,
} from '@/schemas/admin/admin-application.schema';

const findApplicationOrError = (applicationId: number) => {
  const application = mockApplications.get(applicationId);
  if (!application) return {error: ERROR.APPLICATION_NOT_FOUND()};
  return {application};
};

export const adminApplicationHandlers = [
  http.get(
    '*/api/admin/application/:applicationId/basic-info',
    ({request, params}) => {
      const guardError = requireStaff(request);
      if (guardError) return guardError;

      const result = findApplicationOrError(Number(params.applicationId));
      if ('error' in result) return result.error;
      if (!result.application.basicInfo) return ERROR.APPLICATION_NOT_FOUND();

      return success({
        applicationId: result.application.applicationId,
        name: result.application.basicInfo.name,
        gender: result.application.basicInfo.gender,
        birthDate: result.application.basicInfo.birthDate,
        phoneNumber: result.application.basicInfo.phoneNumber ?? '',
        school: result.application.basicInfo.university,
        major: result.application.basicInfo.major,
        isEnrolled: result.application.basicInfo.isEnrolled,
        completedSemesters: result.application.basicInfo.completedSemesters,
        isPrevActivity: result.application.basicInfo.isPrevActivity,
        applicationPartType: result.application.basicInfo.applicationPartType,
      });
    }
  ),

  http.get(
    '*/api/admin/application/:applicationId/part-questions',
    ({request, params}) => {
      const guardError = requireStaff(request);
      if (guardError) return guardError;

      const result = findApplicationOrError(Number(params.applicationId));
      if ('error' in result) return result.error;

      const {partQuestions, generationNumber, basicInfo} = result.application;
      const questions = getApplicationQuestions(
        generationNumber,
        basicInfo?.applicationPartType ?? ''
      );

      return success({
        questionsWithAnswers: questions.map((question) => ({
          sequence: question.sequence,
          questionContent: question.content,
          content: partQuestions.answers[question.sequence] ?? null,
          length: (partQuestions.answers[question.sequence] ?? '').length,
          maxLength: question.maxLength,
        })),
        pdfFileUrl: partQuestions.pdfFileUrl,
        pdfFileKey: partQuestions.pdfFileKey,
      });
    }
  ),

  http.get(
    '*/api/admin/application/:applicationId/etc-questions',
    ({request, params}) => {
      const guardError = requireStaff(request);
      if (guardError) return guardError;

      const result = findApplicationOrError(Number(params.applicationId));
      if ('error' in result) return result.error;

      const {etcQuestions, generationNumber} = result.application;
      const info = getRecruitmentInformation(generationNumber);
      return success({
        discoveryPath: {
          options: [{value: etcQuestions.discoveryPath ?? 'NONE'}],
          selectedAnswer: etcQuestions.discoveryPath,
        },
        parallelActivities: etcQuestions.parallelActivities,
        unavailableInterviewTimes: etcQuestions.unavailableInterviewTimes,
        sessionAttendance: etcQuestions.sessionAttendance,
        mandatoryEvents: etcQuestions.mandatoryEvents,
        privacyPolicy: etcQuestions.privacyPolicy,
        interviewStartDate: formatKoreanDate(info.interviewStart),
        interviewEndDate: formatKoreanDate(info.interviewEnd),
        otDate: formatKoreanDate(info.ot),
        cokerthonDate: formatKoreanDate(info.cokerthon),
        demoDayDate: formatKoreanDate(info.demoDay),
      });
    }
  ),

  http.get(
    '*/api/admin/application/:applicationId/evaluation',
    ({request, params}) => {
      const guardError = requireStaff(request);
      if (guardError) return guardError;

      const result = findApplicationOrError(Number(params.applicationId));
      if ('error' in result) return result.error;

      const evaluatorType = new URL(request.url).searchParams.get(
        'evaluatorType'
      ) as EvaluatorType | null;
      return success({
        comment:
          (evaluatorType && result.application.evaluations[evaluatorType]) ??
          null,
      });
    }
  ),

  http.post(
    '*/api/admin/application/:applicationId/evaluation',
    async ({request, params}) => {
      const guardError = requireStaff(request);
      if (guardError) return guardError;

      const result = findApplicationOrError(Number(params.applicationId));
      if ('error' in result) return result.error;

      const body =
        (await request.json()) as PostAdminApplicationEvaluationRequest;
      result.application.evaluations[body.evaluatorType] = body.comment;
      return success(null);
    }
  ),
];
