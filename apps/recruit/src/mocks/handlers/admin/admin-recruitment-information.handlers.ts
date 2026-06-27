import {http} from 'msw';
import {ERROR, requireStaff, success} from '@/mocks/utils';
import {mockRecruitmentInformationByGeneration} from '@/mocks/data/store';
import {PostAdminRecruitmentInformationRequest} from '@/schemas/admin/admin-recruitment-information.schema';

/** 모집 기간(시작/종료)을 제외한 일정 필드는 시간 없이 날짜만 저장한다. */
const DATE_ONLY_FIELDS = [
  'documentAnnouncement',
  'interviewStart',
  'interviewEnd',
  'finalAnnouncement',
  'ot',
  'cokerthon',
  'demoDay',
] as const;

const toDateOnly = (value: string | null) => value?.split('T')[0] ?? value;

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

    DATE_ONLY_FIELDS.forEach((field) => {
      information[field] = toDateOnly(information[field]);
    });

    mockRecruitmentInformationByGeneration.set(generationId, information);
    return success(null);
  }),
];
