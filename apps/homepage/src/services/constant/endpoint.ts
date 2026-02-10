const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!baseUrl) {
  throw new Error(
    'NEXT_PUBLIC_API_BASE_URL is not defined. Please check your .env file.'
  );
}

export const API_BASE_URL = baseUrl;

export const ENDPOINT = {
  PROJECT: {
    LIST: '/v1/api/projects',
    DETAIL: (projectId: number) => `/v1/api/projects/${projectId}`,
    CREATE: '/v1/api/admin/projects',
    EDIT: (projectId: number) => `/v1/api/admin/projects/${projectId}`,
    PRESIGNED_URL: '/v1/api/admin/projects/presigned-url',
  },
  GENERATIONS: '/v1/api/generations',
} as const;
