export const QUERY_KEYS = {
  ADMIN_APPLICATION: 'admin-applications',
  ADMIN_RECRUITMENT_INFORMATIONS: 'admin-recruitment-informations',
  RECRUITMENT_STATUS: 'recruitment-status',
  MAIL_STATUS: 'mail-status',
  ADMIN_RESULT: (generation: string) => ['admin-result', generation],
} as const;
