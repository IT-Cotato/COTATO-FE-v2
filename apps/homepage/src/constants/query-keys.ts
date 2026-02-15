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
  },
  PENALTY: {
    DASHBOARD: ['penalty', 'dashboard'],
    RECORDS: (month?: number) => ['penalty', 'records', {month}],
  },
} as const;
