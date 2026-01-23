const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!baseUrl) {
  throw new Error(
    'NEXT_PUBLIC_API_BASE_URL is not defined. Please check your .env file.'
  );
}

export const API_BASE_URL = baseUrl;

export const ENDPOINT = {
  AUTH: {
    LOGIN_GOOGLE: '/api/auth/login/google',
    REFRESH: '/api/auth/refresh',
    LOGOUT: '/api/auth/logout',
    ME: '/api/auth/me',
  },
  FAQ: 'api/faq',
  RECRUITMENT: {
    STATUS: '/api/recruitment/status',
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
