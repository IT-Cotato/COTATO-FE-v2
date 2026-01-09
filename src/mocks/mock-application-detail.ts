import {ApplicationDetailType} from '@/schemas/admin/admin-application-type';

export const mockApplicationDetail: ApplicationDetailType = {
  applicationId: 1,

  basicInfo: {
    name: '김민아',
    gender: '여',
    birthDate: '2003-12-17',
    phoneNumber: '010-1234-5678',
    school: '홍익대학교',
    enrollmentStatus: '재학',
    major: '컴퓨터공학과',
    completedSemesters: '6학기',
    isPrevActivity: '아니오',
  },
  partQuestionInfo: {
    selectedPart: '프론트엔드',

    ans_1: '코테이토의 프론트엔드 짱을 먹겠습니다',
    ans_2: '감자 탈출할거예용',
    ans_3: '취업하고 싶습니다',
    ans_4: '뽑아줘',
    files: [{name: '포트폴리오.pdf'}, {name: '자기소개서.pdf'}],
    links: ['https://example.com/portfolio', 'https://github.com/my-repo'],
  },

  EtcQuestionInfo: {
    discoveryPath: '인스타그램',
    parallelActivity: '자유로움',
    interviewUnavailableTime: {
      march3: '14:00~16:00',
      march4: '',
    },
    agreeSessionTime: true,
    agreeMandatorySchedule: true,
    agreePrivacyPolicy: true,
  },
};
