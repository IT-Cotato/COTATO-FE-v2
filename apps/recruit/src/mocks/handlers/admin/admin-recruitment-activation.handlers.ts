import {http} from 'msw';
import {requireStaff, success} from '@/mocks/utils';
import {mockRecruitmentState} from '@/mocks/data/store';
import {PostRecruitmentActivationRequest} from '@/schemas/admin/admin-recruitment.schema';

export const adminRecruitmentActivationHandlers = [
  http.post('*/api/admin/recruitment-activation', async ({request}) => {
    const guardError = requireStaff(request);
    if (guardError) return guardError;

    const body = (await request.json()) as PostRecruitmentActivationRequest;
    mockRecruitmentState.isActive = true;
    mockRecruitmentState.generationId = body.generationId;
    mockRecruitmentState.isAdditionalRecruitmentActive =
      body.isAdditionalRecruitmentActive;
    return success(null);
  }),

  http.post('*/api/admin/recruitment-deactivation', async ({request}) => {
    const guardError = requireStaff(request);
    if (guardError) return guardError;

    mockRecruitmentState.isActive = false;
    return success(null);
  }),
];
