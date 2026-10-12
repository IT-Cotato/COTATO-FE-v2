/**
 * API 엔드포인트
 * 클라이언트는 같은 origin의 BFF(/api/*)로 요청하고, BFF가 같은 경로로 백엔드에 전달한다.
 * (백엔드 주소는 서버 전용 lib/auth/backend.ts에서 관리)
 */
export const ENDPOINT = {
  AUTH: {
    LOGIN_GOOGLE: '/api/auth/login/google',
    REFRESH: '/api/auth/refresh',
    LOGOUT: '/api/auth/logout',
    ME: '/api/auth/me',
  },
  FAQ: '/api/faq',
  RECRUITMENT: {
    NOTICE: '/api/recruitment',
    STATUS: '/api/recruitment/status',
    SCHEDULE: '/api/recruitment/schedule',
    SUBSCRIBE: '/api/recruitment/subscribe',
  },
  SUBMITTED_APPLICATIONS: {
    SUBMITTED_APPLICATIONS_BASIC_INFO: (applicationId: number) =>
      `/api/submitted-applications/${applicationId}/basic-info`,
    SUBMITTED_APPLICATIONS_ETC_INFO: (applicationId: number) =>
      `/api/submitted-applications/${applicationId}/etc-info`,
    SUBMITTED_APPLICATIONS_PART_QUESTIONS: (applicationId: number) =>
      `/api/submitted-applications/${applicationId}/part-questions`,
    SUBMITTED_APPLICATIONS_MYPAGE: '/api/submitted-applications/mypage',
  },
  ADMIN: {
    APPLICATIONS: '/api/admin/applications',
    APPLICATION_PASS_STATUS: (applicationId: number) =>
      `/api/admin/application/${applicationId}/pass-status`,
    APPLICATION_QUESTIONS: '/api/admin/application-questions',
    APPLICATION_BASIC_INFO: (applicationId: number) =>
      `/api/admin/application/${applicationId}/basic-info`,
    APPLICATION_ETC_QUESTIONS: (applicationId: number) =>
      `/api/admin/application/${applicationId}/etc-questions`,
    APPLICATION_PART_QUESTIONS: (applicationId: number) =>
      `/api/admin/application/${applicationId}/part-questions`,
    APPLICATION_EVALUATION: (applicationId: number) =>
      `/api/admin/application/${applicationId}/evaluation`,
    RECRUITMENT_INFORMATIONS: '/api/admin/recruitment-informations',
    RECRUITMENT_ACTIVATION: '/api/admin/recruitment-activation',
    RECRUITMENT_DEACTIVATION: '/api/admin/recruitment-deactivation',
    RECRUITMENT_NOTIFICATION: '/api/admin/recruitment-notification-emails',
    RECRUITMENT_NOTIFICATION_SEND:
      '/api/admin/recruitment-notification-emails/send',
    RECRUITMENT_RESULT: '/api/admin/recruitment-mails',
    RECRUITMENT_RESULT_SEND: '/api/admin/recruitment-mails/send',
    PASS_STATUS: '/api/admin/pass-status',
    GENERATIONS: '/api/admin/generations',
  },
  APPLY: {
    STATUS: '/api/applications/status',
    START: '/api/applications/start',
    BASIC_INFO: (applicationId: number) =>
      `/api/applications/${applicationId}/basic-info`,
    PART_QUESTIONS: (applicationId: number) =>
      `/api/applications/${applicationId}/part-questions`,
    ANSWERS: (applicationId: number) =>
      `/api/applications/${applicationId}/answers`,
    ETC_QUESTIONS: (applicationId: number) =>
      `/api/applications/${applicationId}/etc-questions`,
    ETC_ANSWERS: (applicationId: number) =>
      `/api/applications/${applicationId}/etc-answers`,
    SUBMIT: (applicationId: number) =>
      `/api/applications/${applicationId}/submit`,
  },
  FILES: {
    GET_URL: '/api/files/geturl',
    POST_URL: '/api/files/posturl',
  },
};
