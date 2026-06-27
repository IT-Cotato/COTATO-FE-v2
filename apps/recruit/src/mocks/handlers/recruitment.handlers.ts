import {http} from 'msw';
import {ERROR, success} from '@/mocks/utils';
import {
  getRecruitmentInformation,
  mockRecruitmentState,
  mockSubscribedEmails,
} from '@/mocks/data/store';
import {RecruitmentNotifyRequest} from '@/schemas/recruitment/recruitment.schema';

export const recruitmentHandlers = [
  http.get('*/api/recruitment', () => {
    const info = getRecruitmentInformation(mockRecruitmentState.generationId);
    return success({
      generationId: mockRecruitmentState.generationId,
      startDate: info.recruitmentStart,
      endDate: info.recruitmentEnd,
      schedule: [
        {
          title: '서류 접수',
          date: `${info.recruitmentStart} ~ ${info.recruitmentEnd}`,
        },
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
    const info = getRecruitmentInformation(mockRecruitmentState.generationId);
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
