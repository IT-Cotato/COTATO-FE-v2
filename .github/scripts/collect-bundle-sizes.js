'use strict';

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const gzipSize = (filePath) => {
  if (!fs.existsSync(filePath)) return 0;
  try {
    return zlib.gzipSync(fs.readFileSync(filePath)).length;
  } catch {
    return 0;
  }
};

const formatKb = (bytes) => {
  if (bytes === 0) return '0 B';
  const kb = bytes / 1024;
  if (kb >= 1024) return `${(kb / 1024).toFixed(2)} MB`;
  return `${kb.toFixed(2)} kB`;
};

// Next.js 내부 경로 → URL 경로 변환
// "/(with-header)/(with-footer)/(home)/page" → "/"
const toUrlPath = (internalPath) => {
  let p = internalPath;
  p = p.replace(/\/page$/, '');
  p = p.replace(/\/\([^)]+\)/g, '');
  p = p.replace(/\/+/g, '/') || '/';
  if (!p.startsWith('/')) p = '/' + p;
  return p || '/';
};

const collectSizes = (appDir) => {
  const nextDir = path.join(appDir, '.next');
  const staticDir = path.join(nextDir, 'static');

  if (!fs.existsSync(nextDir)) {
    console.log(`[debug] ${appDir}: .next 없음`);
    return { routes: [], sharedSize: null };
  }

  // build-manifest.json에서 rootMainFiles(항상 로드되는 공유 프레임워크 청크) 추출
  const buildManifestPath = path.join(nextDir, 'build-manifest.json');
  let rootMainBytes = 0;
  if (fs.existsSync(buildManifestPath)) {
    const buildManifest = JSON.parse(fs.readFileSync(buildManifestPath, 'utf8'));
    const rootFiles = buildManifest.rootMainFiles || [];
    console.log(`[debug] ${appDir} rootMainFiles(${rootFiles.length}): ${JSON.stringify(rootFiles)}`);
    for (const chunk of rootFiles) {
      const filePath = path.join(nextDir, chunk);
      rootMainBytes += gzipSize(filePath);
    }
  } else {
    console.log(`[debug] ${appDir}: build-manifest.json 없음`);
  }
  console.log(`[debug] ${appDir} 공유 번들(gzip): ${formatKb(rootMainBytes)}`);

  // app-build-manifest.json에서 라우트별 클라이언트 청크 크기 (URL 경로 기준)
  const appBuildManifestPath = path.join(nextDir, 'app-build-manifest.json');
  const clientChunks = {};
  if (fs.existsSync(appBuildManifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(appBuildManifestPath, 'utf8'));
    const pages = manifest.pages || {};
    console.log(`[debug] ${appDir} app-build-manifest 라우트: ${JSON.stringify(Object.keys(pages))}`);
    for (const [route, chunks] of Object.entries(pages)) {
      clientChunks[route] = (chunks || []).reduce((sum, chunk) => {
        const filePath = path.join(nextDir, chunk);
        return sum + gzipSize(filePath);
      }, 0);
    }
  } else {
    console.log(`[debug] ${appDir}: app-build-manifest.json 없음`);
  }

  // app-paths-manifest에서 전체 라우트 목록 (내부 경로 → URL 경로 변환)
  const appPathsManifestPath = path.join(nextDir, 'server', 'app-paths-manifest.json');
  let routes = [];
  if (fs.existsSync(appPathsManifestPath)) {
    const appPaths = JSON.parse(fs.readFileSync(appPathsManifestPath, 'utf8'));
    const seen = new Set();
    const routeEntries = [];

    for (const internalPath of Object.keys(appPaths)) {
      if (internalPath.endsWith('/route')) continue;
      if (/\/(robots|sitemap|manifest)/.test(internalPath)) continue;
      const urlPath = toUrlPath(internalPath);
      if (seen.has(urlPath)) continue;
      seen.add(urlPath);
      const pageBytes = clientChunks[urlPath] || 0;
      routeEntries.push({
        path: urlPath,
        size: formatKb(pageBytes),
        firstLoad: formatKb(pageBytes + rootMainBytes),
      });
    }

    console.log(`[debug] ${appDir} URL 라우트: ${JSON.stringify(routeEntries.map((r) => r.path))}`);
    routes = routeEntries.sort((a, b) => a.path.localeCompare(b.path));
  } else {
    console.log(`[debug] ${appDir}: app-paths-manifest.json 없음`);
  }

  return { routes, sharedSize: formatKb(rootMainBytes) };
};

const homepage = collectSizes('apps/homepage');
const recruit = collectSizes('apps/recruit');

fs.writeFileSync('/tmp/homepage-sizes.json', JSON.stringify(homepage));
fs.writeFileSync('/tmp/recruit-sizes.json', JSON.stringify(recruit));

console.log(`homepage: ${homepage.routes.length}개 라우트`);
console.log(`recruit: ${recruit.routes.length}개 라우트`);
