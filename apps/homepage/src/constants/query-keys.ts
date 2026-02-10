export const QUERY_KEYS = {
  PROJECT: {
    LIST: (params: {generationId?: number; projectType?: string}) => [
      'projects',
      params,
    ],
  },
  GENERATIONS: ['generations'],
} as const;
