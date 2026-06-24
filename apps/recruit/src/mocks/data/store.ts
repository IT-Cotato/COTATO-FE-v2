import {ApplicationType} from '@/schemas/my-page/my-page.schema';
import {BasicInfoResponse, PartQuestionResponse} from '@/schemas/apply/apply-schema';

export type MockRole = 'APPLICANT' | 'STAFF';

export interface MockApplication {
  applicationId: number;
  ownerUserId: number;
  isSubmitted: boolean;
  basicInfo: BasicInfoResponse | null;
  partQuestions: {
    answers: Record<number, string>;
    pdfFileUrl: string | null;
    pdfFileKey: string | null;
  };
  etcQuestions: {
    discoveryPath: string | null;
    parallelActivities: string | null;
    unavailableInterviewTimes: string | null;
    sessionAttendance: boolean | null;
    mandatoryEvents: boolean | null;
    privacyPolicy: boolean | null;
  };
  generationNumber: number;
}

export interface MockUser {
  userId: number;
  email: string;
  name: string;
  role: MockRole;
}

/** code 값으로 로그인할 역할을 고른다. 그 외 값은 모두 APPLICANT로 로그인된다. */
export const MOCK_LOGIN_CODE_TO_ROLE: Record<string, MockRole> = {
  STAFF_LOGIN: 'STAFF',
};

export const mockUsers: Record<MockRole, MockUser> = {
  APPLICANT: {
    userId: 1,
    email: 'applicant@cotato.kr',
    name: '김지원',
    role: 'APPLICANT',
  },
  STAFF: {
    userId: 2,
    email: 'staff@cotato.kr',
    name: '운영진',
    role: 'STAFF',
  },
};

export const mockTokenToRole = new Map<string, MockRole>([
  ['mock-access-token-applicant', 'APPLICANT'],
  ['mock-access-token-staff', 'STAFF'],
]);

export const mockApplications = new Map<number, MockApplication>();

let nextApplicationId = 1000;

export const createMockApplication = (ownerUserId: number): MockApplication => {
  const application: MockApplication = {
    applicationId: nextApplicationId++,
    ownerUserId,
    isSubmitted: false,
    basicInfo: null,
    partQuestions: {answers: {}, pdfFileUrl: null, pdfFileKey: null},
    etcQuestions: {
      discoveryPath: null,
      parallelActivities: null,
      unavailableInterviewTimes: null,
      sessionAttendance: null,
      mandatoryEvents: null,
      privacyPolicy: null,
    },
    generationNumber: 9,
  };
  mockApplications.set(application.applicationId, application);
  return application;
};

export const findApplicationByOwner = (
  ownerUserId: number
): MockApplication | undefined =>
  [...mockApplications.values()].find((app) => app.ownerUserId === ownerUserId);

export const toMyPageApplication = (app: MockApplication): ApplicationType => ({
  applicationId: app.applicationId,
  generationNumber: app.generationNumber,
  part: app.basicInfo?.applicationPartType ?? 'BACKEND',
  status: app.isSubmitted ? '지원완료' : '작성중',
});

export const mockPartQuestionDefinitions = [
  {questionId: 1, sequence: 1, content: '자기소개를 해주세요.', maxLength: 500},
  {questionId: 2, sequence: 2, content: '지원 동기를 작성해주세요.', maxLength: 500},
];

export const toPartQuestionResponse = (
  app: MockApplication
): PartQuestionResponse => ({
  questionsWithAnswers: mockPartQuestionDefinitions.map((q) => ({
    ...q,
    partType: (app.basicInfo?.applicationPartType ?? 'BE') as
      | 'PM'
      | 'DE'
      | 'FE'
      | 'BE',
    length: app.partQuestions.answers[q.questionId]?.length ?? 0,
    savedAnswer: app.partQuestions.answers[q.questionId]
      ? {
          answerId: q.questionId,
          questionId: q.questionId,
          content: app.partQuestions.answers[q.questionId],
        }
      : null,
  })),
  pdfFileUrl: app.partQuestions.pdfFileUrl,
  pdfFileKey: app.partQuestions.pdfFileKey,
});

export const mockFaqByType: Record<string, {id: number; question: string; answer: string}[]> = {
  COMMON: [
    {id: 1, question: '코테이토는 어떤 동아리인가요?', answer: 'IT 연합 동아리입니다.'},
  ],
  PM: [{id: 2, question: 'PM 파트는 무슨 일을 하나요?', answer: '기획 전반을 담당합니다.'}],
  DE: [{id: 3, question: 'DE 파트는 무슨 일을 하나요?', answer: '디자인 전반을 담당합니다.'}],
  FE: [{id: 4, question: 'FE 파트는 무슨 일을 하나요?', answer: '프론트엔드 개발을 담당합니다.'}],
  BE: [{id: 5, question: 'BE 파트는 무슨 일을 하나요?', answer: '백엔드 개발을 담당합니다.'}],
};

export const mockRecruitmentState = {
  isActive: true,
  generationId: 9,
  isAdditionalRecruitmentActive: false,
};

export const mockSubscribedEmails = new Set<string>();
