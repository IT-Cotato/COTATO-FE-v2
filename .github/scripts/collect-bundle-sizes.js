'use strict';

const fs = require('fs');
const path = require('path');

const formatKb = (bytes) => {
  if (bytes === 0) return '0 B';
  const kb = bytes / 1024;
  if (kb >= 1024) return `${(kb / 1024).toFixed(2)} MB`;
  return `${kb.toFixed(2)} kB`;
};

/**
 * .next/static 디렉터리의 모든 JS 파일 크기를 재귀적으로 수집합니다.
 */
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

/**
 * app-build-manifest.json을 읽어 라우트별 번들 크기를 계산합니다.
 */
const collectSizes = (appDir) => {
  const nextDir = path.join(appDir, '.next');
  const staticDir = path.join(nextDir, 'static');

  if (!fs.existsSync(nextDir)) {
    return { routes: [], sharedSize: null };
  }

  // .next/static 하위 모든 JS 파일 크기 수집
  const allChunks = walkJsFiles(staticDir, staticDir);

  // 공유 청크 크기 (app/ 디렉터리 제외한 chunks)
  const sharedBytes = Object.entries(allChunks)
    .filter(([k]) => !k.startsWith('chunks/app/'))
    .reduce((sum, [, v]) => sum + v, 0);

  // app-build-manifest.json: 라우트 → 청크 매핑
  const manifestPath = path.join(nextDir, 'app-build-manifest.json');
  if (!fs.existsSync(manifestPath)) {
    return { routes: [], sharedSize: formatKb(sharedBytes) };
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  const routes = Object.entries(manifest.pages || {})
    .map(([route, chunks]) => {
      const pageBytes = (chunks || []).reduce((sum, chunk) => {
        // 청크 경로가 "static/..."로 시작하면 접두사 제거
        const rel = chunk.replace(/^static\//, '');
        return sum + (allChunks[rel] || 0);
      }, 0);
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
