/**
 * TODO: 날짜 string 형태 어떻게 오는지 백엔드 명세 확인
 * */
export const mockRecruitmentInfo = [
  {
    recruitmentPeriod: {
      start: '2025-02-20',
      end: '2025-02-27',
    },
    documentResultDate: {
      start: '2025-02-28',
    },
    interviewPeriod: {
      start: '2025-03-03',
      end: '2025-03-04',
    },
    finalResultDate: {
      start: '2025-03-05',
    },
    orientationDate: {
      start: '2025-03-05',
    },
  },
];

export const mockPlanApplicationForm = [
  {
    id: 1,
    content:
      '코테이토에서 어떤 부분에서 성장하고 싶은지 지원동기를 작성해주세요.',
    limitTextRange: '600',
  },
  {
    id: 2,
    content:
      '지원 파트와 관련된 경험과 그 경험이 본인에게 미친 영향을 작성해주세요.',
    limitTextRange: '600',
  },
  {
    id: 3,
    content:
      '협업할 때 본인이 중요하게 여기는 가치와 원칙을 설명하고, 실제 경험 속에서 이를 어떻게 실천했는지 작성해주세요.',
    limitTextRange: '600',
  },
  {
    id: 4,
    content:
      '코테이토에서 프로젝트를 개설한다면, 어떤 아이디어로 기획해보고 싶나요? 그 이유와 기대효과도 함께 작성해주세요.',
    limitTextRange: '600',
  },
];
