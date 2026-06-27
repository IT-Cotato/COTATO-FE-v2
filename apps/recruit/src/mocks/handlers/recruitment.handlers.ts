import {http} from 'msw';
import {ERROR, success} from '@/mocks/utils';
import {
  mockRecruitmentInformationByGeneration,
  mockRecruitmentState,
  mockSubscribedEmails,
} from '@/mocks/data/store';
import {RecruitmentNotifyRequest} from '@/schemas/recruitment/recruitment.schema';

/** 어드민에서 수정한 모집 정보가 없으면 쓸 기본값 */
const FALLBACK_RECRUITMENT_INFO = {
  recruitmentStart: '2026-06-01T00:00:00',
  recruitmentEnd: '2026-06-30T23:59:59',
  documentAnnouncement: '2026-07-03',
  interviewStart: '2026-07-05',
  interviewEnd: '2026-07-06',
  finalAnnouncement: '2026-07-08',
  ot: '2026-07-07',
  cokerthon: '2026-08-01',
  demoDay: '2026-09-01',
};

const getCurrentRecruitmentInformation = () =>
  mockRecruitmentInformationByGeneration.get(mockRecruitmentState.generationId) ??
  FALLBACK_RECRUITMENT_INFO;

export const recruitmentHandlers = [
  http.get('*/api/recruitment', () => {
    const info = getCurrentRecruitmentInformation();
    return success({
      generationId: mockRecruitmentState.generationId,
      startDate: info.recruitmentStart,
      endDate: info.recruitmentEnd,
      schedule: [
        {title: '서류 접수', date: `${info.recruitmentStart} ~ ${info.recruitmentEnd}`},
        {title: '서류 발표', date: info.documentAnnouncement},
        {title: '면접', date: `${info.interviewStart} ~ ${info.interviewEnd}`},
      ],
      parts: [
        {short: 'BE', name: '백엔드', detail: '서버 개발을 담당합니다.'},
        {
          short: 'FE',
          name: '프론트엔드',
          detail: '클라이언트 개발을 담당합니다.',
        },
      ],
      activities: [
        {id: 1, short: 'OT', name: 'OT', date: info.ot},
        {id: 2, short: 'COKERTHON', name: '코커톤', date: info.cokerthon},
      ],
    });
  }),

  http.get('*/api/recruitment/status', () => success(mockRecruitmentState)),

  http.get('*/api/recruitment/schedule', () => {
    const info = getCurrentRecruitmentInformation();
    return success({
      generationId: mockRecruitmentState.generationId,
      applicationStartDate: info.recruitmentStart,
      applicationEndDate: info.recruitmentEnd,
      documentAnnouncement: info.documentAnnouncement,
      interviewStartDate: info.interviewStart,
      interviewEndDate: info.interviewEnd,
      finalAnnouncement: info.finalAnnouncement,
      otDate: info.ot,
      cokerthonDate: info.cokerthon,
      demoDayDate: info.demoDay,
    });
  }),

  http.post('*/api/recruitment/subscribe', async ({request}) => {
    const body = (await request.json()) as RecruitmentNotifyRequest;
    if (mockSubscribedEmails.has(body.email)) {
      return ERROR.ALREADY_SUBSCRIBED();
    }
    mockSubscribedEmails.add(body.email);
    return success(null);
  }),
];
