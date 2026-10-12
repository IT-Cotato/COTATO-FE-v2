import {NextRequest, NextResponse} from 'next/server';
import {proxyToBackend} from '@/lib/auth/bff';
import {getSessionTokens} from '@/lib/auth/session';

/**
 * 현재 사용자 조회
 * 앱 진입마다 호출되므로, 세션 쿠키가 전혀 없으면 백엔드까지 가지 않고 바로 401을 돌려준다.
 */
export const GET = (request: NextRequest) => {
  const {accessToken, refreshToken} = getSessionTokens(request);
  if (!accessToken && !refreshToken) {
    return NextResponse.json(
      {code: 'A001', message: '인증이 필요합니다.'},
      {status: 401}
    );
  }
  return proxyToBackend(request);
};
