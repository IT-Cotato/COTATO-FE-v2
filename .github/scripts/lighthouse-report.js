'use strict';

const fs = require('fs');
const path = require('path');

const LHCI_DIR = path.join(process.cwd(), '.lighthouseci');

const score = (val) => (val == null ? null : Math.round(val * 100));

const scoreIcon = (s) => {
  if (s == null) return '⚪';
  if (s >= 90) return '🟢';
  if (s >= 70) return '🟡';
  return '🔴';
};

const ms = (val) => (val == null ? '-' : `${Math.round(val)} ms`);
const cls = (val) => (val == null ? '-' : val.toFixed(3));

const readAllLhrs = (core) => {
  try {
    const manifestPath = path.join(LHCI_DIR, 'manifest.json');
    core.info(`Reading manifest: ${manifestPath}`);
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    core.info(`Manifest entries: ${manifest.length}`);
    return manifest.map((entry) => {
      const jsonPath = path.isAbsolute(entry.jsonPath)
        ? entry.jsonPath
        : path.join(LHCI_DIR, entry.jsonPath);
      const lhr = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      return { url: entry.url, lhr };
    });
  } catch (e) {
    core.warning(`Failed to read LHRs: ${e.message}`);
    return [];
  }
};

const formatUrlPath = (url) => {
  try {
    return new URL(url).pathname || '/';
  } catch {
    return url;
  }
};

const formatAppTable = (appLabel, runs) => {
  if (!runs.length) {
    return `<details>\n<summary>${appLabel} — ⚠️ Lighthouse 결과를 불러오지 못했습니다.</summary>\n\n결과 없음\n\n</details>`;
  }

  const rows = runs.map(({ url, lhr }) => {
    const perf = score(lhr.categories?.performance?.score);
    const a11y = score(lhr.categories?.accessibility?.score);
    const lcp = lhr.audits?.['largest-contentful-paint']?.numericValue;
    const clsVal = lhr.audits?.['cumulative-layout-shift']?.numericValue;
    const tbt = lhr.audits?.['total-blocking-time']?.numericValue;

    return `| \`${formatUrlPath(url)}\` | ${scoreIcon(perf)} ${perf ?? '-'} | ${scoreIcon(a11y)} ${a11y ?? '-'} | ${ms(lcp)} | ${cls(clsVal)} | ${ms(tbt)} |`;
  });

  const perfScores = runs
    .map(({ lhr }) => score(lhr.categories?.performance?.score))
    .filter((s) => s != null);
  const minPerf = perfScores.length ? Math.min(...perfScores) : null;
  const overallIcon = scoreIcon(minPerf);
  const summary = `${overallIcon} ${appLabel} — Performance 최저 ${minPerf ?? '-'}점`;

  return `<details open>
<summary>${summary}</summary>

| URL | Perf | A11y | LCP | CLS | TBT |
|-----|:----:|:----:|----:|----:|----:|
${rows.join('\n')}

</details>`;
};

module.exports = async ({ github, context, core }) => {
  const prNumber = context.payload.pull_request?.number;
  if (!prNumber) {
    core.warning('PR 컨텍스트를 찾을 수 없습니다.');
    return;
  }

  const { owner, repo } = context.repo;

  // 포트로 앱 구분: 3001 = homepage, 3000 = recruit
  const allRuns = readAllLhrs(core);
  const homepageRuns = allRuns.filter((r) => r.url.includes(':3001'));
  const recruitRuns = allRuns.filter((r) => r.url.includes(':3000'));

  core.info(`Homepage runs: ${homepageRuns.length}, Recruit runs: ${recruitRuns.length}`);

  const body = `## ⚡ Lighthouse CI 리포트

${formatAppTable('Homepage', homepageRuns)}

${formatAppTable('Recruit', recruitRuns)}

> 🟢 ≥ 90 · 🟡 ≥ 70 · 🔴 < 70 &nbsp;|&nbsp; Performance 70 미만은 경고이며 CI를 실패시키지 않습니다.

*빌드 커밋: \`${context.sha.slice(0, 7)}\`*`;

  // 기존 댓글 삭제 후 재게시
  const comments = await github.paginate(github.rest.issues.listComments, {
    owner,
    repo,
    issue_number: prNumber,
  });

  for (const comment of comments) {
    if (
      comment.user?.login === 'github-actions[bot]' &&
      comment.body?.includes('⚡ Lighthouse CI 리포트')
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

  core.info('Lighthouse CI 리포트 PR 코멘트 게시 완료');
};
