import {
  MemberAttendanceRecordsResponse,
  MyAttendanceDashboardResponse,
} from '@/schemas/mypage-mem/activity/attendance.schema';
import {MyPenaltyResponse} from '@/schemas/mypage-mem/activity/penalty.schema';

// 출석 대시보드용 목데이터
export const MOCK_ATTENDANCE_DASHBOARD: MyAttendanceDashboardResponse = {
  generationId: 1,
  statistic: {
    present: 12,
    late: 2,
    absent: 1,
    unauthorizedAbsent: 0,
  },
};

// 출석 기록 목록
export const MOCK_ATTENDANCE_RECORDS: MemberAttendanceRecordsResponse = {
  generationId: 1,
  attendances: [
    {
      sessionId: 105,
      sessionNumber: 15,
      placeName: '공덕 창업허브',
      sessionType: 'OFFLINE',
      result: 'PRESENT',
    },
    {
      sessionId: 104,
      sessionNumber: 14,
      placeName: 'ZOOM',
      sessionType: 'ONLINE',
      result: 'UNAUTHORIZED_ABSENT',
    },
    {
      sessionId: 103,
      sessionNumber: 13,
      placeName: '공덕 창업허브',
      sessionType: 'OFFLINE',
      result: 'LATE',
    },
    {
      sessionId: 102,
      sessionNumber: 12,
      placeName: '마포청년나래',
      sessionType: 'ALL',
      result: 'ABSENT',
    },
  ],
};

export const MOCK_PENALTY_DATA: MyPenaltyResponse = {
  generationId: 1,
  dashboard: {
    generationId: 1,
    totalPoint: -2,
    bonusPoint: 10,
    minusPoint: 12,
    beerNetworkingCount: 2,
  },
  records: [
    {
      sessionId: 204,
      week: 15,
      sessionDateTime: '2026-02-14T18:00:00.000Z',
      content: '비어네트워킹 3회차 참여',
      pointType: 'BONUS',
      point: 5,
      cumulativePoint: -2,
    },
    {
      sessionId: 203,
      week: 13,
      sessionDateTime: '2026-01-31T14:15:00.000Z',
      content: '13주차 세션 지각',
      pointType: 'MINUS',
      point: 3,
      cumulativePoint: -7,
    },
    {
      sessionId: 202,
      week: 12,
      sessionDateTime: '2026-01-24T14:00:00.000Z',
      content: '12주차 세션 무단 결석',
      pointType: 'MINUS',
      point: 9,
      cumulativePoint: -4,
    },
    {
      sessionId: 201,
      week: 11,
      sessionDateTime: '2026-01-17T18:00:00.000Z',
      content: '비어네트워킹 1회차 참여',
      pointType: 'BONUS',
      point: 5,
      cumulativePoint: 5,
    },
  ],
};
