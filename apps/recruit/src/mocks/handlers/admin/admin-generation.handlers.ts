import {http} from 'msw';
import {ERROR, requireStaff, success} from '@/mocks/utils';
import {mockGenerations} from '@/mocks/data/store';
import {PostGenerationRequest} from '@/schemas/admin/admin-generation.schema';

export const adminGenerationHandlers = [
  http.get('*/api/admin/generations', ({request}) => {
    const guardError = requireStaff(request);
    if (guardError) return guardError;

    return success(mockGenerations.map((generationId) => ({generationId})));
  }),

  http.post('*/api/admin/generations', async ({request}) => {
    const guardError = requireStaff(request);
    if (guardError) return guardError;

    const body = (await request.json()) as PostGenerationRequest;
    if (mockGenerations.includes(body.generationId)) {
      return ERROR.GENERATION_ALREADY_EXISTS();
    }
    mockGenerations.unshift(body.generationId);
    return success(null);
  }),
];
