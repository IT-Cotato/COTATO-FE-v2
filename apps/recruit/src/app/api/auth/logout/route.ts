import {NextRequest, NextResponse} from 'next/server';
import {proxyToBackend} from '@/lib/auth/bff';
import {isAllowedBffRequest} from '@/lib/auth/origin';
import {clearSessionCookies, getSessionTokens} from '@/lib/auth/session';

/**
 * 로그아웃
 * 백엔드 로그아웃(Redis refresh 토큰 삭제)은 최선 노력으로 호출하고, 결과와 관계없이 세션 쿠키를 지운다.
 */
export const POST = async (request: NextRequest) => {
  if (!isAllowedBffRequest(request)) {
    return NextResponse.json(
      {code: 'C005', message: '접근이 거부되었습니다.'},
      {status: 403}
    );
  }

  const {accessToken, refreshToken} = getSessionTokens(request);
  if (accessToken || refreshToken) {
    const backendResponse = await proxyToBackend(request);
    if (!backendResponse.ok) {
      console.error('[Logout] backend logout failed', backendResponse.status);
    }
  }

  const response = NextResponse.json({
    code: 'SUCCESS',
    message: '요청이 성공적으로 처리되었습니다.',
    data: null,
  });
  clearSessionCookies(response.cookies);
  return response;
};
