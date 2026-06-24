import {http} from 'msw';
import {ERROR, requireStaff, success} from '@/mocks/utils';
import {mockRecruitmentInformationByGeneration} from '@/mocks/data/store';
import {PostAdminRecruitmentInformationRequest} from '@/schemas/admin/admin-recruitment-information.schema';

export const adminRecruitmentInformationHandlers = [
  http.get('*/api/admin/recruitment-informations', ({request}) => {
    const guardError = requireStaff(request);
    if (guardError) return guardError;

    const generationId = Number(
      new URL(request.url).searchParams.get('generationId')
    );
    const information =
      mockRecruitmentInformationByGeneration.get(generationId);
    if (!information) return ERROR.RECRUITMENT_INFORMATION_NOT_FOUND();

    return success(information);
  }),

  http.post('*/api/admin/recruitment-informations', async ({request}) => {
    const guardError = requireStaff(request);
    if (guardError) return guardError;

    const body =
      (await request.json()) as PostAdminRecruitmentInformationRequest;
    const {generationId, ...information} = body;
    mockRecruitmentInformationByGeneration.set(generationId, information);
    return success(null);
  }),
];
