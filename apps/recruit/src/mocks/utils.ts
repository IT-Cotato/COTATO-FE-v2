import {HttpResponse} from 'msw';
import {mockTokenToRole, MockRole} from '@/mocks/data/store';

export const success = <T>(data: T, status = 200) =>
  HttpResponse.json(
    {code: 'SUCCESS', message: '요청이 성공적으로 처리되었습니다.', data},
    {status}
  );

export const failure = (code: string, message: string, status: number) =>
  HttpResponse.json({code, message}, {status});

/** ISO 날짜 문자열을 'M월 D일' 형식으로 변환한다. */
export const formatKoreanDate = (isoDate: string | null) => {
  if (!isoDate) return null;
  const date = new Date(isoDate);
  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
};

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
  APPLICATION_NOT_FOUND: () =>
    failure('AP001', '지원서를 찾을 수 없습니다.', 404),
  RECRUITMENT_NOT_ACTIVE: () =>
    failure('RE001', '현재 모집이 활성화되어 있지 않습니다.', 403),
  ALREADY_SUBSCRIBED: () =>
    failure('SU001', '이미 구독 신청된 이메일입니다.', 400),
  GENERATION_NOT_FOUND: () =>
    failure('GE001', '모집 중인 기수를 찾을 수 없습니다.', 404),
  QUESTION_NOT_FOUND: () => failure('QU001', '질문을 찾을 수 없습니다.', 404),
  RECRUITMENT_INFORMATION_NOT_FOUND: () =>
    failure('RI001', '해당 모집 정보를 찾을 수 없습니다.', 404),
  PASS_STATUS_NOT_FOUND: () =>
    failure('PS001', '해당 패스 상태를 찾을 수 없습니다.', 404),
  EMAIL_TEMPLATE_NOT_FOUND: () =>
    failure('EM001', '이메일 템플릿을 찾을 수 없습니다.', 404),
  EMAIL_ALREADY_SENT: () => failure('EM002', '이미 전송된 이메일입니다.', 400),
  GENERATION_ALREADY_EXISTS: () =>
    failure('GE003', '이미 존재하는 기수입니다.', 400),
};

/** STAFF 권한이 없으면 에러 응답을, 있으면 null을 반환한다. */
export const requireStaff = (request: Request) => {
  const role = getRoleFromRequest(request);
  if (!role) return ERROR.UNAUTHORIZED();
  if (role !== 'STAFF') return ERROR.FORBIDDEN();
  return null;
};
