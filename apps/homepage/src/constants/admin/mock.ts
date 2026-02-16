// TODO: API 연동 시 실제 데이터로 교체

export interface SessionData {
  sessionId: number;
  date: string;
  title: string;
  generation: string;
  place: string;
  placeDetail: string;
  attendanceType: 'offline' | 'online';
  attendanceStartTime: string;
  attendanceEndTime: string;
  lateStartTime: string;
  lateEndTime: string;
  description: string;
}

export const MOCK_SESSIONS: SessionData[] = [
  {
    sessionId: 1,
    date: '2025.11.14',
    title: '3회차 세션',
    generation: '코테이토 13기',
    place: '감자대학교',
    placeDetail: '202호',
    attendanceType: 'offline',
    attendanceStartTime: '18:50',
    attendanceEndTime: '19:00',
    lateStartTime: '19:00',
    lateEndTime: '19:20',
    description: 'CS교육 및 파트별 네트워킹',
  },
  {
    sessionId: 2,
    date: '2025.11.14',
    title: '2회차 세션',
    generation: '코테이토 13기',
    place: '감자대학교',
    placeDetail: '202호',
    attendanceType: 'offline',
    attendanceStartTime: '18:50',
    attendanceEndTime: '19:00',
    lateStartTime: '19:00',
    lateEndTime: '19:20',
    description: 'CS교육 및 파트별 네트워킹',
  },
  {
    sessionId: 3,
    date: '2025.11.21',
    title: '1회차 세션',
    generation: '코테이토 13기',
    place: '감자대학교',
    placeDetail: '202호',
    attendanceType: 'online',
    attendanceStartTime: '18:50',
    attendanceEndTime: '19:00',
    lateStartTime: '19:00',
    lateEndTime: '19:20',
    description: 'OT 및 파트 소개',
  },
];
