export const QUERY_KEYS = {
  APPLY: {
    BASIC_INFO: (applicationId: string) => ['apply-basic-info', applicationId],
    PART_QUESTIONS: (applicationId: string) => [
      'apply-part-questions',
      applicationId,
    ],
  },
  ADMIN_APPLICATION: 'admin-applications',
  ADMIN_RECRUITMENT_INFORMATIONS: 'admin-recruitment-informations',
  RECRUITMENT_STATUS: 'recruitment-status',
} as const;
