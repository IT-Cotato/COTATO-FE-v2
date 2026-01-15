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
  RECRUITMENT: {
    STATUS: '/api/recruitment/status',
  },
  ADMIN: {
    APPLICATIONS: '/api/admin/applications',
    RECRUITMENT_ACTIVATION: '/api/admin/recruitment-activation',
    RECRUITMENT_DEACTIVATION: '/api/admin/recruitment-deactivation',
    RECRUITMENT_NOTIFICATION: '/api/admin/recruitment-notification-emails',
    RECRUITMENT_NOTIFICATION_SEND:
      '/api/admin/recruitment-notification-emails/send',
    RECRUITMENT_RESULT: '/api/admin/recruitment-mails',
    RECRUITMENT_RESULT_SEND: '/api/admin/recruitment-mails/send',
  },
};
