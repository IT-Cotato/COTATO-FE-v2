import type {NextRequest} from 'next/server';

const PRODUCTION_ORIGIN = 'https://recruit.cotato.kr';
const LOCAL_ORIGIN = 'http://localhost:3000';

/**
 * OAuth redirect_uri로 쓸 수 있는 origin 화이트리스트
 * - 운영 도메인, Vercel이 주입하는 현재 배포·브랜치·운영 URL
 * - Vercel 밖(로컬)에서는 localhost:3000
 * - 그 외 도메인은 AUTH_ALLOWED_ORIGINS(콤마 구분)로 추가
 * 구글 콘솔에도 같은 origin의 /oauth2/callback이 등록되어 있어야 한다.
 */
const getTrustedOrigins = () => {
  const origins = new Set([PRODUCTION_ORIGIN]);

  const vercelHosts = [
    process.env.VERCEL_URL,
    process.env.VERCEL_BRANCH_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
  ];
  vercelHosts.forEach((host) => host && origins.add(`https://${host}`));

  if (!process.env.VERCEL) origins.add(LOCAL_ORIGIN);

  process.env.AUTH_ALLOWED_ORIGINS?.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
    .forEach((origin) => origins.add(origin));

  return origins;
};

export const isTrustedOrigin = (origin: string) =>
  getTrustedOrigins().has(origin);

const UNSAFE_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

/**
 * 상태 변경 요청의 CSRF 방어
 * SameSite=Lax는 cotato.kr의 다른 하위 도메인(same-site)에서 오는 요청까지는 막지 못하므로,
 * 쿠키로 인증되는 상태 변경 요청은 Origin이 자기 자신과 같을 때만 허용한다.
 */
export const isAllowedRequestOrigin = (request: NextRequest) => {
  if (!UNSAFE_METHODS.has(request.method)) return true;
  return request.headers.get('origin') === request.nextUrl.origin;
};
