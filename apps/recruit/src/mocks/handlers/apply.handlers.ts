import {http} from 'msw';
import {ERROR, getRoleFromRequest, success} from '@/mocks/utils';
import {
  createMockApplication,
  findApplicationByOwner,
  mockApplications,
  mockUsers,
  toPartQuestionResponse,
} from '@/mocks/data/store';
import {
  BasicInfoRequest,
  EtcQuestionRequest,
  PartQuestionRequest,
} from '@/schemas/apply/apply-schema';

/** 요청자 본인 소유의 지원서인지 확인하고, 아니면 적절한 에러 응답을 돌려준다. */
const requireOwnApplication = (request: Request, applicationId: number) => {
  const role = getRoleFromRequest(request);
  if (!role) return {error: ERROR.UNAUTHORIZED()};

  const application = mockApplications.get(applicationId);
  if (!application) return {error: ERROR.APPLICATION_NOT_FOUND()};

  const user = mockUsers[role];
  if (application.ownerUserId !== user.userId) {
    return {error: ERROR.APPLICATION_FORBIDDEN()};
  }
  return {application};
};

export const applyHandlers = [
  http.get('*/api/applications/status', ({request}) => {
    const role = getRoleFromRequest(request);
    if (!role) return ERROR.UNAUTHORIZED();

    const application = findApplicationByOwner(mockUsers[role].userId);
    if (!application) return success(null);

    return success({
      applicationId: application.applicationId,
      isSubmitted: application.isSubmitted,
      isEnd: false,
    });
  }),

  http.post('*/api/applications/start', ({request}) => {
    const role = getRoleFromRequest(request);
    if (!role) return ERROR.UNAUTHORIZED();

    const existing = findApplicationByOwner(mockUsers[role].userId);
    const application = existing ?? createMockApplication(mockUsers[role].userId);

    return success({
      applicationId: application.applicationId,
      isSubmitted: application.isSubmitted,
    });
  }),

  http.get('*/api/applications/:applicationId/basic-info', ({request, params}) => {
    const applicationId = Number(params.applicationId);
    const result = requireOwnApplication(request, applicationId);
    if ('error' in result) return result.error;

    if (!result.application.basicInfo) return ERROR.APPLICATION_NOT_FOUND();
    return success(result.application.basicInfo);
  }),

  http.post('*/api/applications/:applicationId/basic-info', async ({request, params}) => {
    const applicationId = Number(params.applicationId);
    const result = requireOwnApplication(request, applicationId);
    if ('error' in result) return result.error;

    const body = (await request.json()) as BasicInfoRequest;
    result.application.basicInfo = {...body, applicationId};
    return success(null);
  }),

  http.get('*/api/applications/:applicationId/part-questions', ({request, params}) => {
    const applicationId = Number(params.applicationId);
    const result = requireOwnApplication(request, applicationId);
    if ('error' in result) return result.error;

    return success(toPartQuestionResponse(result.application));
  }),

  http.post('*/api/applications/:applicationId/answers', async ({request, params}) => {
    const applicationId = Number(params.applicationId);
    const result = requireOwnApplication(request, applicationId);
    if ('error' in result) return result.error;

    const body = (await request.json()) as PartQuestionRequest;
    body.answers.forEach(({questionId, content}) => {
      result.application.partQuestions.answers[questionId] = content;
    });
    result.application.partQuestions.pdfFileUrl = body.pdfFileUrl ?? null;
    result.application.partQuestions.pdfFileKey = body.pdfFileKey ?? null;
    return success(null);
  }),

  http.get('*/api/applications/:applicationId/etc-questions', ({request, params}) => {
    const applicationId = Number(params.applicationId);
    const result = requireOwnApplication(request, applicationId);
    if ('error' in result) return result.error;

    const {etcQuestions} = result.application;
    return success({
      discoveryPath: {
        options: [
          {value: 'INSTAGRAM', label: '인스타그램'},
          {value: 'EVERYTIME', label: '에브리타임'},
          {value: 'NAVER_CAFE', label: '네이버 카페'},
          {value: 'OTHER_SNS', label: '기타 SNS'},
          {value: 'FRIEND_REFERRAL', label: '지인 추천'},
          {value: 'NONE', label: '기타'},
        ],
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
    });
  }),

  http.post('*/api/applications/:applicationId/etc-answers', async ({request, params}) => {
    const applicationId = Number(params.applicationId);
    const result = requireOwnApplication(request, applicationId);
    if ('error' in result) return result.error;

    const body = (await request.json()) as EtcQuestionRequest;
    result.application.etcQuestions = {
      discoveryPath: body.discoveryPath,
      parallelActivities: body.parallelActivities,
      unavailableInterviewTimes: body.unavailableInterviewTimes,
      sessionAttendance: body.sessionAttendanceAgreed,
      mandatoryEvents: body.mandatoryEventsAgreed,
      privacyPolicy: body.privacyPolicyAgreed,
    };
    return success(null);
  }),

  http.post('*/api/applications/:applicationId/submit', ({request, params}) => {
    const applicationId = Number(params.applicationId);
    const result = requireOwnApplication(request, applicationId);
    if ('error' in result) return result.error;

    result.application.isSubmitted = true;
    return success(null);
  }),
];
