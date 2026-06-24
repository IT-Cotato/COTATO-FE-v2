import {HttpResponse} from 'msw';
import {mockTokenToRole, MockRole} from '@/mocks/data/store';

export const success = <T>(data: T, status = 200) =>
  HttpResponse.json({code: 'SUCCESS', message: '요청이 성공적으로 처리되었습니다.', data}, {status});

export const failure = (code: string, message: string, status: number) =>
  HttpResponse.json({code, message}, {status});

/** Authorization 헤더에서 role을 추출한다. 토큰이 없거나 알 수 없으면 null. */
export const getRoleFromRequest = (request: Request): MockRole | null => {
  const header = request.headers.get('Authorization');
  if (!header?.startsWith('Bearer ')) return null;
  const token = header.slice('Bearer '.length);
  return mockTokenToRole.get(token) ?? null;
};

export const ERROR = {
  UNAUTHORIZED: () => failure('A001', '인증이 필요합니다.', 401),
  FORBIDDEN: () => failure('A004', '권한이 없습니다.', 403),
  APPLICATION_FORBIDDEN: () =>
    failure('AP003', '해당 지원서에 접근할 권한이 없습니다.', 403),
  APPLICATION_NOT_FOUND: () => failure('AP001', '지원서를 찾을 수 없습니다.', 404),
  RECRUITMENT_NOT_ACTIVE: () =>
    failure('RE001', '현재 모집이 활성화되어 있지 않습니다.', 403),
  ALREADY_SUBSCRIBED: () => failure('SU001', '이미 구독 신청된 이메일입니다.', 400),
};
