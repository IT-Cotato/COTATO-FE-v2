'use strict';

const fs = require('fs');

/**
 * collect-bundle-sizes.js가 생성한 JSON 파일을 읽습니다.
 */
const readBundleSizes = (filePath) => {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch {
    return { routes: [], sharedSize: null };
  }
};

/**
 * First Load JS 크기 문자열을 kB 단위 숫자로 변환합니다.
 */
const toKb = (sizeStr) => {
  const match = sizeStr.match(/([\d.]+)\s*([kMG]?B)/);
  if (!match) return 0;
  const value = parseFloat(match[1]);
  const unit = match[2];
  if (unit === 'MB') return value * 1024;
  if (unit === 'kB') return value;
  return value / 1024;
};

const WARN_THRESHOLD_KB = 200;
const ERROR_THRESHOLD_KB = 350;

const sizeIcon = (firstLoadStr) => {
  const kb = toKb(firstLoadStr);
  if (kb >= ERROR_THRESHOLD_KB) return '🔴';
  if (kb >= WARN_THRESHOLD_KB) return '🟡';
  return '🟢';
};

const formatRouteTable = (appLabel, { routes, sharedSize }) => {
  if (!routes.length) {
    return `### ${appLabel}\n\n> ⚠️ 빌드 출력을 파싱하지 못했습니다.\n`;
  }

  const rows = routes
    .map(
      (r) =>
        `| \`${r.path}\` | ${r.size} | ${r.firstLoad} | ${sizeIcon(r.firstLoad)} |`
    )
    .join('\n');

  const sharedLine = sharedSize ? `\n> 공유 번들: **${sharedSize}**\n` : '';

  return `### ${appLabel}

| 라우트 | 크기 | First Load JS | 상태 |
|--------|------|---------------|------|
${rows}
${sharedLine}`;
};

module.exports = async ({ github, context, core }) => {
  const prNumber = context.payload.pull_request?.number;
  if (!prNumber) {
    core.warning('PR 컨텍스트를 찾을 수 없습니다.');
    return;
  }

  const { owner, repo } = context.repo;

  const homepageBuild = readBundleSizes('/tmp/homepage-sizes.json');
  const recruitBuild = readBundleSizes('/tmp/recruit-sizes.json');

  const hasAnyRoute =
    homepageBuild.routes.length > 0 || recruitBuild.routes.length > 0;
  if (!hasAnyRoute) {
    core.warning('번들 크기 데이터를 파싱하지 못했습니다. 빌드 출력을 확인하세요.');
    return;
  }

  const legend = `> 🟢 정상 (<${WARN_THRESHOLD_KB}kB)  🟡 주의 (<${ERROR_THRESHOLD_KB}kB)  🔴 초과 (≥${ERROR_THRESHOLD_KB}kB) — First Load JS 기준`;

  const body = `## 📦 번들 사이즈 리포트

${formatRouteTable('🏠 Homepage (cotato.kr)', homepageBuild)}

${formatRouteTable('📝 Recruit (recruit.cotato.kr)', recruitBuild)}

---

${legend}

*빌드 커밋: \`${context.sha.slice(0, 7)}\`*`;

  // 기존 봇 코멘트 삭제 후 재게시
  const { data: comments } = await github.rest.issues.listComments({
    owner,
    repo,
    issue_number: prNumber,
  });

  for (const comment of comments) {
    if (
      comment.user?.type === 'Bot' &&
      comment.body?.includes('번들 사이즈 리포트')
    ) {
      await github.rest.issues.deleteComment({
        owner,
        repo,
        comment_id: comment.id,
      });
    }
  }

  await github.rest.issues.createComment({
    owner,
    repo,
    issue_number: prNumber,
    body,
  });

  core.info('번들 사이즈 리포트 PR 코멘트 게시 완료');
};
