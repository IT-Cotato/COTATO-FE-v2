import {http} from 'msw';
import {ERROR, getRoleFromRequest, success} from '@/mocks/utils';
import {getAccessTokenForRole, mockUsers} from '@/mocks/data/store';

export const authHandlers = [
  http.post('*/api/auth/login/google', () => {
    // 구글이 돌려주는 인증 코드는 통제할 수 없어 항상 APPLICANT로 로그인된다.
    // STAFF로 테스트하려면 NEXT_PUBLIC_MSW_STAFF_TOKEN을 accessToken으로 직접 주입해야 한다.
    return success({
      accessToken: getAccessTokenForRole('APPLICANT'),
      refreshToken: 'mock-refresh-token-applicant',
      tokenType: 'Bearer',
    });
  }),

  http.post('*/api/auth/refresh', async ({request}) => {
    const body = (await request.json()) as {refreshToken?: unknown};
    if (
      typeof body.refreshToken !== 'string' ||
      !body.refreshToken.startsWith('mock-refresh-token-')
    ) {
      return ERROR.UNAUTHORIZED();
    }
    const role = body.refreshToken.includes('staff') ? 'STAFF' : 'APPLICANT';

    return success({
      accessToken: getAccessTokenForRole(role),
      refreshToken: `mock-refresh-token-${role.toLowerCase()}`,
      tokenType: 'Bearer',
    });
  }),

  http.post('*/api/auth/logout', ({request}) => {
    const role = getRoleFromRequest(request);
    if (!role) return ERROR.UNAUTHORIZED();
    return success(null);
  }),

  http.get('*/api/auth/me', ({request}) => {
    const role = getRoleFromRequest(request);
    if (!role) return ERROR.UNAUTHORIZED();
    return success(mockUsers[role]);
  }),
];
