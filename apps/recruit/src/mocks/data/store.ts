import {ApplicationType} from '@/schemas/my-page/my-page.schema';
import {
  BasicInfoResponse,
  PartQuestionResponse,
} from '@/schemas/apply/apply-schema';
import {EvaluatorType} from '@/schemas/admin/admin-application.schema';
import {ApplicationPassStatus} from '@/schemas/admin/admin-applications.schema';
import {RecruitmentInformationType} from '@/schemas/admin/admin-recruitment-information.schema';

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
  passStatus: ApplicationPassStatus;
  submittedAt: string | null;
  evaluations: Partial<Record<EvaluatorType, string>>;
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
    passStatus: 'PENDING',
    submittedAt: null,
    evaluations: {},
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
  {
    questionId: 2,
    sequence: 2,
    content: '지원 동기를 작성해주세요.',
    maxLength: 500,
  },
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

export const mockFaqByType: Record<
  string,
  {id: number; question: string; answer: string}[]
> = {
  COMMON: [
    {
      id: 1,
      question: '코테이토는 어떤 동아리인가요?',
      answer: 'IT 연합 동아리입니다.',
    },
  ],
  PM: [
    {
      id: 2,
      question: 'PM 파트는 무슨 일을 하나요?',
      answer: '기획 전반을 담당합니다.',
    },
  ],
  DE: [
    {
      id: 3,
      question: 'DE 파트는 무슨 일을 하나요?',
      answer: '디자인 전반을 담당합니다.',
    },
  ],
  FE: [
    {
      id: 4,
      question: 'FE 파트는 무슨 일을 하나요?',
      answer: '프론트엔드 개발을 담당합니다.',
    },
  ],
  BE: [
    {
      id: 5,
      question: 'BE 파트는 무슨 일을 하나요?',
      answer: '백엔드 개발을 담당합니다.',
    },
  ],
};

export const mockRecruitmentState = {
  isActive: true,
  generationId: 9,
  isAdditionalRecruitmentActive: false,
};

export const mockSubscribedEmails = new Set<string>();

/** ───────────── Admin mock data ───────────── */

export const mockGenerations = [9, 8, 7];

export const mockRecruitmentInformationByGeneration = new Map<
  number,
  RecruitmentInformationType
>([
  [
    9,
    {
      recruitmentStart: '2026-03-01T00:00:00',
      recruitmentEnd: '2026-03-14T23:59:59',
      documentAnnouncement: '2026-03-17',
      interviewStart: '2026-03-19',
      interviewEnd: '2026-03-20',
      finalAnnouncement: '2026-03-22',
      ot: '2026-03-21',
      cokerthon: '2026-04-11',
      demoDay: '2026-05-09',
    },
  ],
]);

const questionKey = (generationId: number, part: string) =>
  `${generationId}-${part}`;

export const mockApplicationQuestionsByPart = new Map<
  string,
  {sequence: number; content: string; maxLength: number}[]
>(
  (['PM', 'DE', 'FE', 'BE'] as const).map((part) => [
    questionKey(9, part),
    [
      {sequence: 1, content: '자기소개를 해주세요.', maxLength: 500},
      {sequence: 2, content: '지원 동기를 작성해주세요.', maxLength: 500},
    ],
  ])
);

export const getApplicationQuestions = (generationId: number, part: string) =>
  mockApplicationQuestionsByPart.get(questionKey(generationId, part)) ?? [];

export const setApplicationQuestions = (
  generationId: number,
  part: string,
  questions: {sequence: number; content: string; maxLength: number}[]
) =>
  mockApplicationQuestionsByPart.set(
    questionKey(generationId, part),
    questions
  );

export interface MockMailTemplate {
  templateId: number | null;
  content: string;
  isSent: boolean;
  sentAt: string | null;
  generationId: number;
  successCount: number;
  failCount: number;
}

export const mockNotificationMailByGeneration = new Map<
  number,
  MockMailTemplate & {subscriberCount: number}
>();

const resultMailKey = (generationId: number, templateType: string) =>
  `${generationId}-${templateType}`;

export const mockResultMailByGenerationAndType = new Map<
  string,
  MockMailTemplate & {
    templateType: string;
    templateTypeDescription: string;
    recipientCount: number;
  }
>();

export const getResultMail = (generationId: number, templateType: string) =>
  mockResultMailByGenerationAndType.get(
    resultMailKey(generationId, templateType)
  );

export const setResultMail = (
  generationId: number,
  templateType: string,
  mail: MockMailTemplate & {
    templateType: string;
    templateTypeDescription: string;
    recipientCount: number;
  }
) =>
  mockResultMailByGenerationAndType.set(
    resultMailKey(generationId, templateType),
    mail
  );

export const toAdminApplicant = (app: MockApplication) => ({
  applicationId: app.applicationId,
  name: app.basicInfo?.name ?? '이름없음',
  gender: app.basicInfo?.gender ?? 'MALE',
  applicationPartType: app.basicInfo?.applicationPartType ?? null,
  university: app.basicInfo?.university ?? '',
  phoneNumber: app.basicInfo?.phoneNumber ?? null,
  passStatus: app.passStatus,
  submittedAt: app.submittedAt ?? new Date().toISOString(),
});

let nextSeedApplicationId = 1;

/** 어드민 지원서 목록/상세 화면 시연용 더미 지원자를 만들어 둔다. */
const seedMockApplicants = () => {
  const seeds: {
    name: string;
    part: 'PM' | 'DE' | 'FE' | 'BE';
    passStatus: ApplicationPassStatus;
  }[] = [
    {name: '김백엔드', part: 'BE', passStatus: 'PASS'},
    {name: '이프론트', part: 'FE', passStatus: 'PASS'},
    {name: '박기획', part: 'PM', passStatus: 'WAITLISTED'},
    {name: '최디자인', part: 'DE', passStatus: 'FAIL'},
    {name: '정백엔드', part: 'BE', passStatus: 'PENDING'},
    {name: '한프론트', part: 'FE', passStatus: 'PENDING'},
  ];

  seeds.forEach((seed, index) => {
    const applicationId = nextSeedApplicationId++;
    mockApplications.set(applicationId, {
      applicationId,
      ownerUserId: 100 + index,
      isSubmitted: true,
      basicInfo: {
        applicationId,
        name: seed.name,
        gender: index % 2 === 0 ? 'MALE' : 'FEMALE',
        birthDate: '2002-01-01',
        phoneNumber: '010-1234-5678',
        university: '코테이토대학교',
        major: '컴퓨터공학과',
        completedSemesters: 6,
        isPrevActivity: false,
        isEnrolled: true,
        applicationPartType: seed.part,
      },
      partQuestions: {
        answers: {1: '자기소개 답변입니다.', 2: '지원 동기 답변입니다.'},
        pdfFileUrl: null,
        pdfFileKey: null,
      },
      etcQuestions: {
        discoveryPath: 'INSTAGRAM',
        parallelActivities: '',
        unavailableInterviewTimes: '',
        sessionAttendance: true,
        mandatoryEvents: true,
        privacyPolicy: true,
      },
      generationNumber: 9,
      passStatus: seed.passStatus,
      submittedAt: '2026-03-10T12:00:00',
      evaluations: {},
    });
  });
};

seedMockApplicants();
