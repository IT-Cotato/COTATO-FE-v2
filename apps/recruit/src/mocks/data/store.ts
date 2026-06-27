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

/**
 * 실제 구글 로그인은 항상 APPLICANT로 처리된다 (구글이 돌려주는 인증 코드는 우리가 통제할 수 없음).
 * STAFF로 테스트하려면 NEXT_PUBLIC_MSW_STAFF_TOKEN 값을 accessToken으로 직접 주입해야 한다.
 * env가 설정되지 않으면 STAFF 토큰으로 인증할 방법이 전혀 없다.
 */
const STAFF_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MSW_STAFF_TOKEN;

const ACCESS_TOKEN_BY_ROLE: Partial<Record<MockRole, string>> = {
  APPLICANT: 'mock-access-token-applicant',
  ...(STAFF_ACCESS_TOKEN ? {STAFF: STAFF_ACCESS_TOKEN} : {}),
};

export const getAccessTokenForRole = (role: MockRole) => {
  const token = ACCESS_TOKEN_BY_ROLE[role];

  if (!token) {
    throw new Error(`MSW token for role "${role}" is not configured.`);
  }

  return token;
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

export const mockTokenToRole = new Map<string, MockRole>(
  (Object.entries(ACCESS_TOKEN_BY_ROLE) as [MockRole, string][]).map(
    ([role, token]) => [token, role]
  )
);

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
    generationNumber: mockRecruitmentState.generationId,
    passStatus: 'PENDING',
    submittedAt: null,
    evaluations: {},
  };
  mockApplications.set(application.applicationId, application);
  return application;
};

/** 지원서 작성 플로우는 현재 모집 기수에 한해서만 기존 지원서를 이어서 보여준다. */
export const findApplicationByOwner = (
  ownerUserId: number,
  generationNumber: number
): MockApplication | undefined =>
  [...mockApplications.values()].find(
    (app) =>
      app.ownerUserId === ownerUserId &&
      app.generationNumber === generationNumber
  );

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

export const mockGenerations = [9, 8];

export const mockRecruitmentInformationByGeneration = new Map<
  number,
  RecruitmentInformationType
>([
  [
    9,
    {
      recruitmentStart: '2026-06-01T00:00:00',
      recruitmentEnd: '2026-06-30T23:59:59',
      documentAnnouncement: '2026-07-03',
      interviewStart: '2026-07-05',
      interviewEnd: '2026-07-06',
      finalAnnouncement: '2026-07-08',
      ot: '2026-07-07',
      cokerthon: '2026-08-01',
      demoDay: '2026-09-01',
    },
  ],
  [
    8,
    {
      recruitmentStart: '2025-12-01T00:00:00',
      recruitmentEnd: '2025-12-09T23:59:59',
      documentAnnouncement: '2025-12-12',
      interviewStart: '2025-12-13',
      interviewEnd: '2025-12-14',
      finalAnnouncement: '2025-12-16',
      ot: '2025-12-15',
      cokerthon: '2026-01-10',
      demoDay: '2026-02-07',
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

/** 기본 APPLICANT 로그인 계정(userId 1) 명의로 마이페이지에서 바로 조회 가능한 제출 완료 지원서를 만들어 둔다. */
const seedMyPageApplication = () => {
  const applicationId = nextSeedApplicationId++;
  mockApplications.set(applicationId, {
    applicationId,
    ownerUserId: mockUsers.APPLICANT.userId,
    isSubmitted: true,
    basicInfo: {
      applicationId,
      name: mockUsers.APPLICANT.name,
      gender: 'FEMALE',
      birthDate: '2003-05-14',
      phoneNumber: '010-9876-5432',
      university: '코테이토대학교',
      major: '소프트웨어학과',
      completedSemesters: 5,
      isPrevActivity: false,
      isEnrolled: true,
      applicationPartType: 'FE',
    },
    partQuestions: {
      answers: {
        1: '안녕하세요, 프론트엔드 개발에 관심이 많은 지원자입니다.',
        2: '코테이토에서 다양한 프로젝트 경험을 쌓고 싶어 지원했습니다.',
      },
      pdfFileUrl:
        'https://mock-bucket.s3.ap-northeast-2.amazonaws.com/applications/mock-portfolio.pdf?mock=presigned',
      pdfFileKey: 'applications/mock-portfolio.pdf',
    },
    etcQuestions: {
      discoveryPath: 'INSTAGRAM',
      parallelActivities: '없습니다.',
      unavailableInterviewTimes: '평일 오전에는 수업이 있어 어렵습니다.',
      sessionAttendance: true,
      mandatoryEvents: true,
      privacyPolicy: true,
    },
    generationNumber: 8,
    passStatus: 'PASS',
    submittedAt: '2025-12-10T15:30:00',
    evaluations: {},
  });
};

seedMyPageApplication();
