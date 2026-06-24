import {http} from 'msw';
import {ERROR, getRoleFromRequest, success} from '@/mocks/utils';
import {MOCK_LOGIN_CODE_TO_ROLE, mockUsers} from '@/mocks/data/store';
import {OAuthLoginRequest} from '@/schemas/auth/auth-schema';

const tokenFor = (role: 'APPLICANT' | 'STAFF') =>
  `mock-access-token-${role.toLowerCase()}`;

export const authHandlers = [
  http.post('*/api/auth/login/google', async ({request}) => {
    const body = (await request.json()) as OAuthLoginRequest;
    const role = MOCK_LOGIN_CODE_TO_ROLE[body.code] ?? 'APPLICANT';

    return success({
      accessToken: tokenFor(role),
      refreshToken: `mock-refresh-token-${role.toLowerCase()}`,
      tokenType: 'Bearer',
    });
  }),

  http.post('*/api/auth/refresh', async ({request}) => {
    const body = (await request.json()) as {refreshToken: string};
    const role = body.refreshToken.includes('staff') ? 'STAFF' : 'APPLICANT';

    if (!body.refreshToken.startsWith('mock-refresh-token-')) {
      return ERROR.UNAUTHORIZED();
    }

    return success({
      accessToken: tokenFor(role),
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
