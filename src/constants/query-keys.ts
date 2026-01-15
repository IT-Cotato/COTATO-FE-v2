export const QUERY_KEYS = {
  APPLY: {
    BASIC_INFO: (applicationId: string) => ['apply-basic-info', applicationId],
  },
  ADMIN_APPLICATION: 'admin-applications',
  ADMIN_RECRUITMENT_INFORMATIONS: 'admin-recruitment-informations',
} as const;
