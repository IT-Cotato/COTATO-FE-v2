import {http} from 'msw';
import {ERROR, requireStaff, success} from '@/mocks/utils';
import {
  mockApplications,
  mockRecruitmentInformationByGeneration,
  toAdminApplicant,
} from '@/mocks/data/store';
import {ApplicationPassStatus} from '@/schemas/admin/admin-applications.schema';

export const adminApplicationsHandlers = [
  http.get('*/api/admin/applications', ({request}) => {
    const guardError = requireStaff(request);
    if (guardError) return guardError;

    const url = new URL(request.url);
    const generationId = Number(url.searchParams.get('generationId'));
    const partViewType = url.searchParams.get('partViewType') ?? 'ALL';
    const passViewStatuses = url.searchParams.getAll('passViewStatuses');
    const searchKeyword = url.searchParams.get('searchKeyword') ?? '';
    const parsedPage = Number(url.searchParams.get('page') ?? '0');
    const parsedSize = Number(url.searchParams.get('size') ?? '10');
    const page =
      Number.isInteger(parsedPage) && parsedPage >= 0 ? parsedPage : 0;
    const size =
      Number.isInteger(parsedSize) && parsedSize > 0 ? parsedSize : 10;

    const allApplicants = [...mockApplications.values()]
      .filter((app) => app.isSubmitted && app.generationNumber === generationId)
      .map(toAdminApplicant);

    const filtered = allApplicants.filter((applicant) => {
      const matchesPart =
        partViewType === 'ALL' ||
        applicant.applicationPartType === partViewType;
      const matchesStatus =
        passViewStatuses.length === 0 ||
        passViewStatuses.includes('ALL') ||
        passViewStatuses.includes(applicant.passStatus);
      const matchesKeyword =
        !searchKeyword || applicant.name.includes(searchKeyword);
      return matchesPart && matchesStatus && matchesKeyword;
    });

    const content = filtered.slice(page * size, page * size + size);
    const information =
      mockRecruitmentInformationByGeneration.get(generationId);

    return success({
      recruitmentPeriodResponse: {
        recruitmentStart: information?.recruitmentStart ?? null,
        recruitmentEnd: information?.recruitmentEnd ?? null,
      },
      summary: {
        totalCount: allApplicants.length,
        pmCount: allApplicants.filter((a) => a.applicationPartType === 'PM')
          .length,
        designCount: allApplicants.filter((a) => a.applicationPartType === 'DE')
          .length,
        frontendCount: allApplicants.filter(
          (a) => a.applicationPartType === 'FE'
        ).length,
        backendCount: allApplicants.filter(
          (a) => a.applicationPartType === 'BE'
        ).length,
      },
      applicants: {
        content,
        pageInfo: {
          currentPage: page,
          totalPages: Math.max(1, Math.ceil(filtered.length / size)),
          totalElements: filtered.length,
          size,
        },
      },
    });
  }),

  http.post(
    '*/api/admin/application/:applicationId/pass-status',
    async ({request, params}) => {
      const guardError = requireStaff(request);
      if (guardError) return guardError;

      const application = mockApplications.get(Number(params.applicationId));
      if (!application) return ERROR.APPLICATION_NOT_FOUND();

      const body = (await request.json()) as {
        passStatus: ApplicationPassStatus;
      };
      application.passStatus = body.passStatus;
      return success(null);
    }
  ),
];
