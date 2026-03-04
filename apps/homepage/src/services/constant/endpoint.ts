const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!baseUrl) {
  throw new Error(
    'NEXT_PUBLIC_API_BASE_URL is not defined. Please check your .env file.'
  );
}

export const API_BASE_URL = baseUrl;

export const ENDPOINT = {
  /** 인증 관련 API */
  AUTH: {
    LOGIN: '/v1/api/auth/login',
    JOIN: '/v1/api/auth/join',
    VERIFICATION: '/v1/api/auth/verification/sign-up',
    PASSWORD: '/v1/api/auth/verification/password',
    REISSUE: '/v1/api/auth/reissue',
    LOGOUT: '/v1/api/auth/logout',
    EMAIL: '/v1/api/auth/email',
  },

  /** 회원 관련 API */
  MEMBERS: {
    INFO: '/v1/api/members/info',
    UPDATE_PASSWORD: '/v1/api/members/update/password',
    VERIFY_PASSWORD: '/v1/api/members/verify/password',
    DEACTIVATE: (memberId: number) => `/v1/api/members/${memberId}/deactivate`,
  },

  /** 모집 관련 API */
  RECRUITMENTS: {
    STATUS: '/v1/api/recruitments/status',
    TOGGLE: '/v1/api/admin/recruitments/toggle',
    SUBSCRIBE: '/v1/api/recruitments/subscribe',
    NOTICES: '/v1/api/recruitments/notices',
  },

  /** 프로젝트 API */
  PROJECT: {
    LIST: '/v1/api/projects',
    DETAIL: (projectId: number) => `/v1/api/projects/${projectId}`,
    CREATE: '/v1/api/admin/projects',
    EDIT: (projectId: number) => `/v1/api/admin/projects/${projectId}`,
    PRESIGNED_URL: '/v1/api/admin/projects/presigned-url',
  },

  /** 출석 API */
  ATTENDANCE: {
    RECORDS: '/v1/api/attendances/records',
    SESSIONS: '/v1/api/attendances/sessions',
    MY_DASHBOARD: '/v1/api/attendances/my/dashboard',
    MY_RECORDS: '/v1/api/attendances/my',
    STATUS: '/v1/api/events/attendances', //출결 상태 조회
    ATTENDANCE_ID: '/v1/api/admin/attendances/sessions',
    FULL_RECORDS: '/v1/api/admin/attendances/records',
    SPECIFIC_RECORDS: (attendanceId: number) =>
      `/v1/api/admin/attendances/${attendanceId}/records`,
    MANAGE_STATUS: (attendanceId: number) =>
      `/v1/api/admin/attendances/${attendanceId}/records`,
  },

  /** 상벌점 API */
  PENALTY: {
    MY_DASHBOARD: '/v1/api/minus-points/my/dashboard',
    MY_RECORDS: '/v1/api/minus-points/my',
  },

  /** faq API */
  FAQ: '/v1/api/faq',

  /** 어드민 기수 관련 API */
  GENERATIONS: {
    LIST: '/v1/api/generations',
    CREATE: '/v1/api/admin/generations',
    DETAIL: (generationId: number) =>
      `/v1/api/admin/generations/${generationId}`,
    UPDATE: (generationId: number) =>
      `/v1/api/admin/generations/${generationId}`,
  },

  /** 가입 승인 관련 API */
  APPROVALS: {
    LIST: '/v1/api/admin/member-approvals/applicants',
    APPROVE: '/v1/api/admin/member-approvals/approve',
    REJECT: '/v1/api/admin/member-approvals/reject',
    RESTORE: '/v1/api/admin/member-approvals/restore',
    DELETE: '/v1/api/admin/member-approvals',
  },

  /** 어드민 회원 관련 API */
  ADMIN_MEMBERS: {
    LIST: '/v1/api/admin/members',
    DETAIL: (memberId: number) => `/v1/api/admin/members/${memberId}`,
    PATCH_STATUS: '/v1/api/admin/members/status',
    DELETE: '/v1/api/admin/members',
    ACTIVE_LIST: '/v1/api/admin/members/active',
    ACTIVE: (generationMemberId: number) =>
      `/v1/api/admin/members/active/${generationMemberId}`,
    ACTIVE_ROLE: (generationMemberId: number) =>
      `/v1/api/admin/members/active/${generationMemberId}/role`,
  },

  /** 어드민 세션 관련 API */
  SESSIONS: {
    ADMIN_LIST: '/v1/api/admin/sessions',
    DETAIL: (sessionId: number) => `/v1/api/sessions/${sessionId}`,
    IMAGE: {
      PRESIGNED_URL: '/v1/api/admin/sessions/presigned-url',
      COMPLETE: '/v1/api/admin/sessions/image/complete',
      ORDER: '/v1/api/admin/sessions/image/order',
      DELETE: '/v1/api/admin/sessions/image',
    },
    DELETE: (sessionId: number) => `/v1/api/admin/sessions/${sessionId}`,
  },
} as const;
