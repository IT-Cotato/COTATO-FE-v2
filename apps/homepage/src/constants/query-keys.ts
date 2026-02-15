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
} as const;
