'use strict';

const fs = require('fs');
const path = require('path');

const formatKb = (bytes) => {
  if (bytes === 0) return '0 B';
  const kb = bytes / 1024;
  if (kb >= 1024) return `${(kb / 1024).toFixed(2)} MB`;
  return `${kb.toFixed(2)} kB`;
};

const walkJsFiles = (dir, staticDir) => {
  const result = {};
  if (!fs.existsSync(dir)) return result;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      Object.assign(result, walkJsFiles(full, staticDir));
    } else if (entry.name.endsWith('.js')) {
      const rel = path.relative(staticDir, full);
      result[rel] = fs.statSync(full).size;
    }
  }
  return result;
};

const collectSizes = (appDir) => {
  const nextDir = path.join(appDir, '.next');
  const staticDir = path.join(nextDir, 'static');

  if (!fs.existsSync(nextDir)) {
    console.log(`[debug] ${appDir}: .next 디렉터리 없음`);
    return { routes: [], sharedSize: null };
  }

  const allChunks = walkJsFiles(staticDir, staticDir);
  console.log(`[debug] ${appDir}: JS 청크 ${Object.keys(allChunks).length}개`);

  // 공유 청크 = app/ 라우트 전용 청크를 제외한 프레임워크 + 공유 번들
  const sharedBytes = Object.entries(allChunks)
    .filter(([k]) => !k.startsWith('chunks/app/'))
    .reduce((sum, [, v]) => sum + v, 0);

  // server/app-paths-manifest.json: 모든 App Router 라우트 (서버+클라이언트)
  const appPathsManifestPath = path.join(nextDir, 'server', 'app-paths-manifest.json');
  // app-build-manifest.json: 클라이언트 JS가 있는 라우트만 포함
  const appBuildManifestPath = path.join(nextDir, 'app-build-manifest.json');

  console.log(`[debug] app-paths-manifest: ${fs.existsSync(appPathsManifestPath)}`);
  console.log(`[debug] app-build-manifest: ${fs.existsSync(appBuildManifestPath)}`);

  // app-build-manifest에서 라우트별 클라이언트 청크 크기 수집
  const clientChunks = {};
  if (fs.existsSync(appBuildManifestPath)) {
    const buildManifest = JSON.parse(fs.readFileSync(appBuildManifestPath, 'utf8'));
    const pages = buildManifest.pages || {};
    console.log(`[debug] app-build-manifest 라우트 수: ${Object.keys(pages).length}`);
    for (const [route, chunks] of Object.entries(pages)) {
      clientChunks[route] = (chunks || []).reduce((sum, chunk) => {
        const rel = chunk.replace(/^static\//, '');
        return sum + (allChunks[rel] || 0);
      }, 0);
    }
  }

  // app-paths-manifest에서 전체 라우트 목록 가져오기
  let allRouteKeys = [];
  if (fs.existsSync(appPathsManifestPath)) {
    const appPaths = JSON.parse(fs.readFileSync(appPathsManifestPath, 'utf8'));
    // API 라우트(/route로 끝나는 것) 제외
    allRouteKeys = Object.keys(appPaths).filter(
      (r) => !r.endsWith('/route') && !r.includes('/robots') && !r.includes('/sitemap')
    );
    console.log(`[debug] app-paths 라우트: ${JSON.stringify(allRouteKeys)}`);
  }

  // app-paths에 없으면 app-build-manifest 라우트를 사용
  const routeKeys =
    allRouteKeys.length > 0 ? allRouteKeys : Object.keys(clientChunks);

  const routes = routeKeys
    .map((route) => {
      const pageBytes = clientChunks[route] || 0;
      return {
        path: route,
        size: formatKb(pageBytes),
        firstLoad: formatKb(pageBytes + sharedBytes),
      };
    })
    .sort((a, b) => a.path.localeCompare(b.path));

  return { routes, sharedSize: formatKb(sharedBytes) };
};

const homepage = collectSizes('apps/homepage');
const recruit = collectSizes('apps/recruit');

fs.writeFileSync('/tmp/homepage-sizes.json', JSON.stringify(homepage));
fs.writeFileSync('/tmp/recruit-sizes.json', JSON.stringify(recruit));

console.log(`homepage: ${homepage.routes.length}개 라우트`);
console.log(`recruit: ${recruit.routes.length}개 라우트`);
