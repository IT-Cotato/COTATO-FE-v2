import {http} from 'msw';
import {ERROR, getRoleFromRequest, success} from '@/mocks/utils';
import {mockUsers} from '@/mocks/data/store';
import {setMockSessionToken} from '@/mocks/session';

/**
 * 로그인(코드 교환)과 토큰 갱신은 서버 Route Handler/BFF가 처리해 브라우저 MSW로 가로챌 수 없으므로,
 * 목 세션 쿠키 기반의 로그아웃·내 정보 조회만 모킹한다. (로그인은 lib/googleAuth.ts 참고)
 */
export const authHandlers = [
  http.post('*/api/auth/logout', ({request}) => {
    const role = getRoleFromRequest(request);
    if (!role) return ERROR.UNAUTHORIZED();
    setMockSessionToken(null);
    return success(null);
  }),

  http.get('*/api/auth/me', ({request}) => {
    const role = getRoleFromRequest(request);
    if (!role) return ERROR.UNAUTHORIZED();
    return success(mockUsers[role]);
  }),
];
