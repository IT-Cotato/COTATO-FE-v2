export const QUERY_KEYS = {
  PROJECT: {
    LIST: (params: {generationId?: number; projectType?: string}) => [
      'projects',
      params,
    ],
    DETAIL: (projectId: number) => ['projects', 'detail', projectId],
  },
  GENERATIONS: ['generations'],
  MEMBERS: {
    INFO: ['members-info'],
  },
  RECRUITMENTS: {
    STATUS: ['recruitments-status'],
  },
  ATTENDANCE: {
    DASHBOARD: ['attendance', 'dashboard'],
    RECORDS: (month?: number) => ['attendance', 'records', {month}],
    SESSIONS: (month?: number) => ['attendance', 'sessions', {month}],
  },
  PENALTY: {
    DASHBOARD: ['penalty', 'dashboard'],
    RECORDS: (month?: number) => ['penalty', 'records', {month}],
  },
  SESSIONS: {
    ADMIN_LIST: (generationId?: number) => ['sessions', 'admin', {generationId}],
    DETAIL: (sessionId: number) => ['sessions', 'detail', sessionId],
  },
} as const;
