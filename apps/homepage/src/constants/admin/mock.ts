// TODO: API 연동 시 실제 데이터로 교체
import {SessionData} from '@/schemas/admin/session.schema';

export const MOCK_SESSIONS: SessionData[] = [
  {
    sessionId: 1,
    date: '2025.11.14',
    title: '3회차 세션',
    generation: '코테이토 13기',
    description: 'CS교육 및 파트별 네트워킹',
    attendanceStartTime: '18:50',
    placeName: '감자대학교',
    roadNameAddress: '서울시 마포구 감자로 202',
    location: {latitude: 37.5665, longitude: 126.978},
    attendTime: {
      attendanceEndTime: '19:00',
      lateEndTime: '19:20',
    },
    isOffline: true,
    isOnline: false,
    content: 'CS교육 및 파트별 네트워킹',
  },
  {
    sessionId: 2,
    date: '2025.11.14',
    title: '2회차 세션',
    generation: '코테이토 13기',
    description: 'CS교육 및 파트별 네트워킹',
    attendanceStartTime: '18:50',
    placeName: '감자대학교',
    roadNameAddress: '서울시 마포구 감자로 202',
    location: {latitude: 37.5665, longitude: 126.978},
    attendTime: {
      attendanceEndTime: '19:00',
      lateEndTime: '19:20',
    },
    isOffline: true,
    isOnline: false,
    content: 'CS교육 및 파트별 네트워킹',
  },
  {
    sessionId: 3,
    date: '2025.11.21',
    title: '1회차 세션',
    generation: '코테이토 13기',
    description: 'OT 및 파트 소개',
    attendanceStartTime: '18:50',
    placeName: '',
    roadNameAddress: '',
    location: {latitude: 0, longitude: 0},
    attendTime: {
      attendanceEndTime: '19:00',
      lateEndTime: '19:20',
    },
    isOffline: false,
    isOnline: true,
    content: 'OT 및 파트 소개',
  },
];
