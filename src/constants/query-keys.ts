export const QUERY_KEYS = {
  APPLY: {
    STATUS: ['apply-status'],
    BASIC_INFO: (applicationId: number) => ['apply-basic-info', applicationId],
    PART_QUESTIONS: (applicationId: number) => [
      'apply-part-questions',
      applicationId,
    ],
    ETC_QUESTIONS: (applicationId: number) => [
      'apply-etc-questions',
      applicationId,
    ],
  },
  ADMIN_GENERATIONS: 'admin-generations',
  ADMIN_APPLICATIONS: 'admin-applications',
  ADMIN_APPLICATION_BASIC_INFO: 'admin-application-basic-info',
  ADMIN_APPLICATION_PART_QUESTIONS: 'admin-application-part-questions',
  ADMIN_APPLICATION_ETC_QUESTIONS: 'admin-application-etc-questions',
  ADMIN_APPLICATION_PDF_URL: 'admin-application-pdf-url',
  ADMIN_APPLICATION_QUESTIONS: 'admin-application-questions',
  ADMIN_APPLICATION_EVALUATION: 'admin-application-evaluation',
  ADMIN_RECRUITMENT_INFORMATIONS: 'admin-recruitment-informations',
  RECRUITMENT_NOTICE: 'recruitment-notice',
  RECRUITMENT_STATUS: 'recruitment-status',
  FAQ: (type: string) => ['faq', type],
  MAIL_STATUS: 'mail-status',
  ADMIN_RESULT: (generationId: string) => ['admin-result', generationId],
} as const;
