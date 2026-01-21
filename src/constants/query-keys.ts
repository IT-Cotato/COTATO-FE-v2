export const QUERY_KEYS = {
  APPLY: {
    BASIC_INFO: (applicationId: string) => ['apply-basic-info', applicationId],
    PART_QUESTIONS: (applicationId: string) => [
      'apply-part-questions',
      applicationId,
    ],
  },
  ADMIN_APPLICATIONS: 'admin-applications',
  ADMIN_APPLICATION_BASIC_INFO: 'admin-application-basic-info',
  ADMIN_APPLICATION_PART_QUESTIONS: 'admin-application-part-questions',
  ADMIN_APPLICATION_ETC_QUESTIONS: 'admin-application-etc-questions',
  ADMIN_APPLICATION_QUESTIONS: 'application-questions',
  ADMIN_APPLICATION_EVALUATION: 'application-evaluation',
  ADMIN_RECRUITMENT_INFORMATIONS: 'admin-recruitment-informations',
  RECRUITMENT_STATUS: 'recruitment-status',
} as const;
