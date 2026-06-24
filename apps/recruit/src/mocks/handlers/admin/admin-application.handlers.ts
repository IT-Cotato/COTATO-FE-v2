import {http} from 'msw';
import {ERROR, requireStaff, success} from '@/mocks/utils';
import {mockApplications} from '@/mocks/data/store';
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

      const {partQuestions} = result.application;
      return success({
        questionsWithAnswers: [
          {
            sequence: 1,
            questionContent: '자기소개를 해주세요.',
            content: partQuestions.answers[1] ?? null,
            length: (partQuestions.answers[1] ?? '').length,
            maxLength: 500,
          },
          {
            sequence: 2,
            questionContent: '지원 동기를 작성해주세요.',
            content: partQuestions.answers[2] ?? null,
            length: (partQuestions.answers[2] ?? '').length,
            maxLength: 500,
          },
        ],
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

      const {etcQuestions} = result.application;
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
        interviewStartDate: '3월 19일',
        interviewEndDate: '3월 20일',
        otDate: '3월 21일',
        cokerthonDate: '4월 11일',
        demoDayDate: '5월 9일',
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
