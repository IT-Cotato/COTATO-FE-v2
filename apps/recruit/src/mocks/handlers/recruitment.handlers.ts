import {http} from 'msw';
import {ERROR, success} from '@/mocks/utils';
import {mockRecruitmentState, mockSubscribedEmails} from '@/mocks/data/store';
import {RecruitmentNotifyRequest} from '@/schemas/recruitment/recruitment.schema';

export const recruitmentHandlers = [
  http.get('*/api/recruitment', () =>
    success({
      generationId: mockRecruitmentState.generationId,
      startDate: '2026-03-01',
      endDate: '2026-03-14',
      schedule: [
        {title: '서류 접수', date: '2026-03-01 ~ 2026-03-14'},
        {title: '서류 발표', date: '2026-03-17'},
        {title: '면접', date: '2026-03-19 ~ 2026-03-20'},
      ],
      parts: [
        {short: 'BE', name: '백엔드', detail: '서버 개발을 담당합니다.'},
        {short: 'FE', name: '프론트엔드', detail: '클라이언트 개발을 담당합니다.'},
      ],
      activities: [
        {id: 1, short: 'OT', name: 'OT', date: '2026-03-21'},
        {id: 2, short: 'COKERTHON', name: '코커톤', date: '2026-04-11'},
      ],
    })
  ),

  http.get('*/api/recruitment/status', () => success(mockRecruitmentState)),

  http.get('*/api/recruitment/schedule', () =>
    success({
      generationId: mockRecruitmentState.generationId,
      applicationStartDate: '2026-03-01T00:00:00',
      applicationEndDate: '2026-03-14T23:59:59',
      documentAnnouncement: '2026-03-17',
      interviewStartDate: '2026-03-19',
      interviewEndDate: '2026-03-20',
      finalAnnouncement: '2026-03-22',
      otDate: '2026-03-21',
      cokerthonDate: '2026-04-11',
      demoDayDate: '2026-05-09',
    })
  ),

  http.post('*/api/recruitment/subscribe', async ({request}) => {
    const body = (await request.json()) as RecruitmentNotifyRequest;
    if (mockSubscribedEmails.has(body.email)) {
      return ERROR.ALREADY_SUBSCRIBED();
    }
    mockSubscribedEmails.add(body.email);
    return success(null);
  }),
];
