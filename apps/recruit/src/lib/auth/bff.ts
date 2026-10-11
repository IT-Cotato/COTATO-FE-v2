import {NextRequest, NextResponse} from 'next/server';
import {AUTH_RETRY_HEADER} from '@/lib/auth/constants';
import {backendFetch} from '@/lib/auth/backend';
import {isAllowedRequestOrigin} from '@/lib/auth/origin';
import {
  applySessionUpdate,
  getSessionTokens,
  rotateSession,
  SessionUpdate,
} from '@/lib/auth/session';

/**
 * BFF 프록시
 * 브라우저 → Next.js(/api/*) → 백엔드(/api/*)
 * 브라우저는 토큰을 볼 수 없고, 서버가 HttpOnly 쿠키의 토큰을 Authorization 헤더로 옮겨 붙인다.
 */

const FORWARDED_REQUEST_HEADERS = [
  'accept',
  'accept-language',
  'content-type',
  'user-agent',
  'x-forwarded-for',
];
const FORWARDED_RESPONSE_HEADERS = [
  'cache-control',
  'content-disposition',
  'content-type',
];

const errorResponse = (status: number, code: string, message: string) =>
  NextResponse.json({code, message}, {status});

/** 다른 요청이 먼저 토큰을 회전시킨 경우: 쿠키는 그 요청의 응답이 갱신하므로 건드리지 않고 재시도만 요청한다. */
const retryLaterResponse = () => {
  const response = errorResponse(
    401,
    'A006',
    '세션이 갱신되었습니다. 다시 시도해주세요.'
  );
  response.headers.set(AUTH_RETRY_HEADER, '1');
  return response;
};

const unavailableResponse = () =>
  errorResponse(503, 'BFF503', '인증 서버에 연결할 수 없습니다.');

export const proxyToBackend = async (request: NextRequest) => {
  if (!isAllowedRequestOrigin(request)) {
    return errorResponse(403, 'C005', '접근이 거부되었습니다.');
  }

  const {pathname, search} = request.nextUrl;
  const body = ['GET', 'HEAD'].includes(request.method)
    ? undefined
    : await request.arrayBuffer();

  const send = (accessToken?: string) => {
    const headers = new Headers();
    FORWARDED_REQUEST_HEADERS.forEach((name) => {
      const value = request.headers.get(name);
      if (value) headers.set(name, value);
    });
    if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`);

    return backendFetch(`${pathname}${search}`, {
      method: request.method,
      headers,
      body,
    });
  };

  const {refreshToken} = getSessionTokens(request);
  let {accessToken} = getSessionTokens(request);
  let update: SessionUpdate = null;
  let hasRotated = false;

  /** @returns 회전 실패로 지금 응답해야 하면 그 응답, 아니면 null */
  const rotate = async (token: string) => {
    const result = await rotateSession(token);
    if (result.ok) {
      accessToken = result.tokens.accessToken;
      update = {type: 'set', tokens: result.tokens};
      hasRotated = true;
      return null;
    }
    if (result.reason === 'rotated') return retryLaterResponse();
    if (result.reason === 'unavailable') return unavailableResponse();

    // 세션 종료: 쿠키를 지우고 토큰 없이 진행한다 (공개 API는 그대로 성공한다).
    accessToken = undefined;
    update = {type: 'clear'};
    return null;
  };

  try {
    // access 쿠키는 토큰 exp보다 일찍 만료되므로, 없으면 백엔드에 보내기 전에 미리 갱신한다.
    if (!accessToken && refreshToken) {
      const earlyResponse = await rotate(refreshToken);
      if (earlyResponse) return earlyResponse;
    }

    let backendResponse = await send(accessToken);

    // 백엔드는 만료/무효 토큰에 공개 API까지 401(A002)로 응답하므로, 토큰을 보낸 401이면 갱신 후 재시도한다.
    if (backendResponse.status === 401 && accessToken && !hasRotated) {
      if (refreshToken) {
        const earlyResponse = await rotate(refreshToken);
        if (earlyResponse) return earlyResponse;
      } else {
        accessToken = undefined;
        update = {type: 'clear'};
      }
      backendResponse = await send(accessToken);
    }

    const headers = new Headers();
    FORWARDED_RESPONSE_HEADERS.forEach((name) => {
      const value = backendResponse.headers.get(name);
      if (value) headers.set(name, value);
    });

    const response = new NextResponse(backendResponse.body, {
      status: backendResponse.status,
      headers,
    });
    applySessionUpdate(response.cookies, update);
    return response;
  } catch (error) {
    console.error('[BFF proxy failed]', request.method, pathname, error);
    return errorResponse(502, 'BFF502', '서버와 통신하지 못했습니다.');
  }
};
