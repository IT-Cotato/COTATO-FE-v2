import {AttendanceStatusType} from '@/schemas/admin/attendance.schema';

export const MOCK_SPECIFIC_SESSION_TABLE = [
  {
    memberInfo: {
      memberId: 4,
      name: '김민아',
      position: 'FE',
      generationId: 11,
    },
    result: 'PRESENT' as AttendanceStatusType,
  },
  {
    memberInfo: {
      memberId: 2,
      name: '박상현',
      position: 'PM',
      generationId: 11,
    },
    result: 'LATE' as AttendanceStatusType,
  },
  {
    memberInfo: {
      memberId: 1,
      name: '양희정',
      position: 'FE',
      generationId: 11,
    },
    result: 'NOT_YET' as AttendanceStatusType,
  },
  {
    memberInfo: {
      memberId: 3,
      name: '진서영',
      position: 'PM',
      generationId: 11,
    },
    result: 'NOT_YET' as AttendanceStatusType,
  },
  {
    memberInfo: {
      memberId: 6,
      name: '하지민',
      position: 'FE',
      generationId: 11,
    },
    result: 'NOT_YET' as AttendanceStatusType,
  },
];
