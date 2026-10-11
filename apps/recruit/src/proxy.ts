import {NextRequest, NextResponse} from 'next/server';
import {fetchCurrentUser} from '@/lib/auth/backend';
import {
  applySessionUpdate,
  getSessionTokens,
  rotateSession,
  SessionUpdate,
} from '@/lib/auth/session';
import {isMockingEnabled} from '@/mocks/session';
import {ROUTES} from '@/constants/routes';

const matchesRoute = (pathname: string, route: string) =>
  pathname === route || pathname.startsWith(`${route}/`);

/**
 * 페이지 요청 단계의 인증 처리 (화면이 그려지기 전에 실행)
 *
 * 1. 선제 갱신: access 쿠키는 토큰 exp보다 일찍 만료되므로, 없고 refresh 쿠키만 있으면 여기서 갱신한다.
 *    화면의 API 요청들이 동시에 refresh하기 전에 갱신을 끝내 경합을 줄인다.
 *    (Next.js는 proxy에 prefetch 여부 헤더를 넘기지 않아, 동시 prefetch는 rotateSession의
 *    single-flight로 합치고, 다른 인스턴스와 엇갈리면 쿠키를 유지한 채 통과시킨다.)
 * 2. 접근 차단: /apply, /admin은 세션이 없으면 홈으로 리다이렉트하고,
 *    /admin은 백엔드 /api/auth/me로 STAFF 역할까지 확인한다. (JWT에 role 클레임이 없음)
 *
 * 쿠키 존재 여부는 낙관적 검사이고, 실제 인가는 백엔드가 API마다 수행한다.
 * 모집 활성화 여부 등 화면 단위 조건은 ProtectedRoute가 계속 담당한다.
 */
export async function proxy(request: NextRequest) {
  // MSW 모드에는 실제 세션 쿠키가 없으므로 클라이언트 ProtectedRoute에 맡긴다.
  if (isMockingEnabled) return NextResponse.next();

  const {pathname} = request.nextUrl;
  const {refreshToken} = getSessionTokens(request);
  let {accessToken} = getSessionTokens(request);
  let update: SessionUpdate = null;

  if (!accessToken && refreshToken) {
    const result = await rotateSession(refreshToken);
    if (result.ok) {
      accessToken = result.tokens.accessToken;
      update = {type: 'set', tokens: result.tokens};
    } else if (result.reason === 'rejected') {
      update = {type: 'clear'};
    }
    // rotated(다른 요청이 이미 회전)·unavailable은 쿠키를 유지하고 다음 요청에 맡긴다.
  }

  const hasSession =
    Boolean(accessToken) || (Boolean(refreshToken) && update?.type !== 'clear');

  const respond = (response: NextResponse) => {
    applySessionUpdate(response.cookies, update);
    return response;
  };
  const redirectHome = () =>
    respond(NextResponse.redirect(new URL(ROUTES.HOME, request.url)));

  const isApplyRoute = matchesRoute(pathname, ROUTES.APPLY);
  const isAdminRoute = matchesRoute(pathname, ROUTES.ADMIN);

  if ((isApplyRoute || isAdminRoute) && !hasSession) {
    return redirectHome();
  }

  if (isAdminRoute) {
    // 다른 요청과 회전이 엇갈려 access 토큰을 못 얻은 경우: 세션은 유효하므로 통과시키고
    // ProtectedRoute(클라이언트)와 백엔드 hasRole('STAFF')에 역할 검사를 맡긴다.
    if (!accessToken) return respond(NextResponse.next());

    const result = await fetchCurrentUser(accessToken);
    if (result.status !== 'ok' || result.user.role !== 'STAFF') {
      return redirectHome();
    }
  }

  return respond(NextResponse.next());
}

export const config = {
  // API(BFF가 직접 처리), OAuth 라우트, 정적 파일은 제외
  matcher: [
    '/((?!api/|oauth2/|_next/static|_next/image|favicon.ico|.*\\.\\w+$).*)',
  ],
};
