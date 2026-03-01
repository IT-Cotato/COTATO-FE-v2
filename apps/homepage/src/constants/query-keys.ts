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
    ATTENDANCE_ID: (generation: number) => [
      'attendance',
      'attendance-id',
      {generation},
    ],
    FULL_RECORDS: (generation: number) => [
      'attendance',
      'full-records',
      {generation},
    ],
    SPECIFIC_RECORDS: (attendanceId: number) => [
      'attendance',
      'specific-records',
      {attendanceId},
    ],
    MANAGE_STATUS: (attendanceId: number) => [
      'attendance',
      'manage-status',
      {attendanceId},
    ],
  },
  PENALTY: {
    BASE: 'penalty',
    DASHBOARD: ['penalty', 'dashboard'],
    RECORDS: (month?: number) => ['penalty', 'records', {month}],
  },
  FAQ: (type: string) => ['faq', type],
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
