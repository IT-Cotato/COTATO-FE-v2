import {http} from 'msw';
import {ERROR, getRoleFromRequest, success} from '@/mocks/utils';
import {
  mockApplications,
  mockUsers,
  toMyPageApplication,
  toPartQuestionResponse,
} from '@/mocks/data/store';

const requireSubmittedOwnApplication = (request: Request, applicationId: number) => {
  const role = getRoleFromRequest(request);
  if (!role) return {error: ERROR.UNAUTHORIZED()};

  const application = mockApplications.get(applicationId);
  if (!application || !application.isSubmitted) {
    return {error: ERROR.APPLICATION_NOT_FOUND()};
  }
  if (application.ownerUserId !== mockUsers[role].userId) {
    return {error: ERROR.APPLICATION_FORBIDDEN()};
  }
  return {application};
};

export const myPageHandlers = [
  http.get('*/api/submitted-applications/mypage', ({request}) => {
    const role = getRoleFromRequest(request);
    if (!role) return ERROR.UNAUTHORIZED();

    const applications = [...mockApplications.values()]
      .filter((app) => app.ownerUserId === mockUsers[role].userId && app.isSubmitted)
      .map(toMyPageApplication);

    return success(applications);
  }),

  http.get('*/api/submitted-applications/:applicationId/basic-info', ({request, params}) => {
    const result = requireSubmittedOwnApplication(request, Number(params.applicationId));
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
  }),

  http.get('*/api/submitted-applications/:applicationId/part-questions', ({request, params}) => {
    const result = requireSubmittedOwnApplication(request, Number(params.applicationId));
    if ('error' in result) return result.error;

    const partQuestionResponse = toPartQuestionResponse(result.application);
    return success({
      questionsWithAnswers: partQuestionResponse.questionsWithAnswers.map((q) => ({
        sequence: q.sequence,
        questionContent: q.content,
        content: q.savedAnswer?.content ?? null,
        length: q.length,
        maxLength: q.maxLength,
      })),
      pdfFileUrl: partQuestionResponse.pdfFileUrl,
      pdfFileKey: partQuestionResponse.pdfFileKey,
    });
  }),

  http.get('*/api/submitted-applications/:applicationId/etc-info', ({request, params}) => {
    const result = requireSubmittedOwnApplication(request, Number(params.applicationId));
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
  }),
];
