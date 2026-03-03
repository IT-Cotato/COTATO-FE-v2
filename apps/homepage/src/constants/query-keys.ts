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
    NOTICE: ['recruitments-notice'],
  },
  ATTENDANCE: {
    BASE: 'attendance',
    DASHBOARD: ['attendance', 'dashboard'],
    RECORDS: (month?: number) => ['attendance', 'records', {month}],
    SESSIONS: (month?: number) => ['attendance', 'sessions', {month}],
    STATUS: ['attendance', 'status'],
  },
  PENALTY: {
    BASE: 'penalty',
    DASHBOARD: ['penalty', 'dashboard'],
    RECORDS: (month?: number) => ['penalty', 'records', {month}],
  },
  FAQ: (type: string) => ['faq', type],
  APPROVALS: {
    BASE: ['approvals'],
    LIST: (params: object) => ['approvals', params],
  },
  ADMIN_MEMBERS: {
    BASE: ['admin-members'],
    LIST: (params: object) => ['admin-members', params],
    DETAIL: (memberId: number) => ['admin-members', 'detail', memberId],
    ACTIVE_LIST: (params: object) => ['admin-members', 'active', params],
  },
  SESSIONS: {
    ADMIN_BASE: ['sessions', 'admin'],
    ADMIN_LIST: (generationId?: number) => [
      'sessions',
      'admin',
      {generationId},
    ],
    DETAIL: (sessionId: number) => ['sessions', 'detail', sessionId],
  },
} as const;
