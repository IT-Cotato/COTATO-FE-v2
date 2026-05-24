'use strict';

/**
 * 주간 협업 리포트 생성 스크립트
 * actions/github-script 에서 실행: require('./.github/scripts/weekly-analytics.js')
 *
 * 수집 데이터:
 *   - PR 오픈/머지 현황, 평균 머지 시간 (GraphQL Search API)
 *   - 기여자별 커밋·PR·리뷰 활동 (GraphQL + REST)
 *   - 레포지토리 트래픽 — 뷰, 클론, 인기 경로, 유입 출처 (REST)
 *   - 이슈 오픈/클로즈 현황 (REST)
 */
module.exports = async ({github, context, core}) => {
  const {owner, repo} = context.repo;

  // ──────────────────────────────────────────────
  // 날짜 계산
  // ──────────────────────────────────────────────
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const weekAgoISO = weekAgo.toISOString();
  const weekAgoDate = weekAgoISO.split('T')[0];

  // ──────────────────────────────────────────────
  // 유틸
  // ──────────────────────────────────────────────
  const formatMs = (ms) => {
    const h = Math.floor(ms / 3_600_000);
    if (h < 24) return `${h}시간`;
    const d = Math.floor(h / 24);
    const rem = h % 24;
    return rem > 0 ? `${d}일 ${rem}시간` : `${d}일`;
  };

  const kst = (d) =>
    d.toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  // API 실패 시 경고만 남기고 fallback 반환
  const safe = async (label, fn, fallback = null) => {
    try {
      return await fn();
    } catch (e) {
      core.warning(`[${label}] ${e.status ?? ''} ${e.message}`);
      return fallback;
    }
  };

  const rows = (...lines) => lines.filter(Boolean).join('\n');

  // ──────────────────────────────────────────────
  // 1. PR 데이터 — GraphQL Search API
  //    ref: https://docs.github.com/ko/graphql/reference/objects#pullrequest
  // ──────────────────────────────────────────────
  const PR_FIELDS = `
    number title state createdAt mergedAt
    author { login }
    reviews(first: 30) {
      nodes { author { login } state submittedAt }
    }
  `;

  const searchPRs = (q) =>
    safe(
      `GraphQL search: ${q.slice(0, 50)}`,
      async () => {
        const res = await github.graphql(
          `query($q: String!) {
            search(query: $q, type: ISSUE, first: 50) {
              nodes { ... on PullRequest { ${PR_FIELDS} } }
            }
          }`,
          {q}
        );
        return res.search.nodes;
      },
      []
    );

  const [openedPRs, mergedPRs] = await Promise.all([
    searchPRs(`repo:${owner}/${repo} is:pr created:>=${weekAgoDate}`),
    searchPRs(`repo:${owner}/${repo} is:pr is:merged merged:>=${weekAgoDate}`),
  ]);

  // PR 통계
  const mergeTimes = mergedPRs
    .filter((p) => p.mergedAt)
    .map((p) => new Date(p.mergedAt) - new Date(p.createdAt));
  const avgMergeMs =
    mergeTimes.length
      ? mergeTimes.reduce((a, b) => a + b, 0) / mergeTimes.length
      : 0;

  // 리뷰어 집계
  const reviewByUser = {};
  [...openedPRs, ...mergedPRs].forEach((pr) => {
    pr.reviews?.nodes?.forEach((r) => {
      const login = r.author?.login;
      if (login) reviewByUser[login] = (reviewByUser[login] ?? 0) + 1;
    });
  });

  // ──────────────────────────────────────────────
  // 2. 커밋 / 기여자 — REST
  //    ref: https://docs.github.com/ko/rest/commits/commits
  // ──────────────────────────────────────────────
  const commits = await safe(
    'commits',
    async () => {
      const {data} = await github.rest.repos.listCommits({
        owner,
        repo,
        since: weekAgoISO,
        per_page: 100,
      });
      return data;
    },
    []
  );

  const commitByUser = {};
  commits.forEach((c) => {
    const login = c.author?.login ?? c.commit?.author?.name ?? 'ghost';
    commitByUser[login] = (commitByUser[login] ?? 0) + 1;
  });

  const prByUser = {};
  openedPRs.forEach((p) => {
    const login = p.author?.login;
    if (login) prByUser[login] = (prByUser[login] ?? 0) + 1;
  });

  // ──────────────────────────────────────────────
  // 3. 이슈 현황 — REST
  //    ref: https://docs.github.com/ko/rest/issues/issues
  // ──────────────────────────────────────────────
  const issuesRaw = await safe(
    'issues',
    async () => {
      const {data} = await github.rest.issues.listForRepo({
        owner,
        repo,
        state: 'all',
        since: weekAgoISO,
        per_page: 100,
      });
      return data.filter((i) => !i.pull_request);
    },
    []
  );

  const newIssues = issuesRaw.filter((i) => new Date(i.created_at) >= weekAgo);
  const closedIssues = issuesRaw.filter(
    (i) => i.state === 'closed' && i.closed_at && new Date(i.closed_at) >= weekAgo
  );

  const openTotal = await safe(
    'openIssuesTotal',
    async () => {
      const {data} = await github.rest.search.issuesAndPullRequests({
        q: `repo:${owner}/${repo} is:issue is:open`,
        per_page: 1,
      });
      return data.total_count;
    },
    '?'
  );

  // ──────────────────────────────────────────────
  // 4. 트래픽 — REST (push 접근 필요)
  //    ref: https://docs.github.com/ko/rest/metrics/traffic
  //    GITHUB_TOKEN 으로 403 발생 시 ANALYTICS_TOKEN (repo 스코프 PAT) 시크릿 등록 필요
  // ──────────────────────────────────────────────
  const [viewsData, clonesData, pathsData, referrersData] = await Promise.all([
    safe('traffic/views', async () => {
      const {data} = await github.rest.repos.getViews({owner, repo, per: 'week'});
      return data;
    }),
    safe('traffic/clones', async () => {
      const {data} = await github.rest.repos.getClones({owner, repo, per: 'week'});
      return data;
    }),
    safe('traffic/paths', async () => {
      const {data} = await github.rest.repos.getTopPaths({owner, repo});
      return data;
    }),
    safe('traffic/referrers', async () => {
      const {data} = await github.rest.repos.getTopReferrers({owner, repo});
      return data;
    }),
  ]);

  // 지난 7일 데이터만 집계 (API는 최대 14일치 반환)
  const sumTraffic = (items) =>
    (items ?? [])
      .filter((v) => new Date(v.timestamp) >= weekAgo)
      .reduce(
        (acc, v) => ({count: acc.count + v.count, uniques: acc.uniques + v.uniques}),
        {count: 0, uniques: 0}
      );

  const weekViews = viewsData ? sumTraffic(viewsData.views) : null;
  const weekClones = clonesData ? sumTraffic(clonesData.clones) : null;

  // ──────────────────────────────────────────────
  // 5. 마크다운 리포트 조립
  // ──────────────────────────────────────────────

  // PR 테이블 (머지된 것 최대 10개)
  const prTableRows = mergedPRs.slice(0, 10).map((pr) => {
    const dur = pr.mergedAt
      ? formatMs(new Date(pr.mergedAt) - new Date(pr.createdAt))
      : '-';
    const title = pr.title.length > 45 ? `${pr.title.slice(0, 45)}…` : pr.title;
    return `| [#${pr.number}](https://github.com/${owner}/${repo}/pull/${pr.number}) | ${title} | @${pr.author?.login ?? '-'} | ${dur} |`;
  });

  // 기여자 테이블 (커밋+PR+리뷰 가중 합산 → 상위 10명)
  const allLogins = new Set([
    ...Object.keys(commitByUser),
    ...Object.keys(prByUser),
    ...Object.keys(reviewByUser),
  ]);
  const contributorRows = [...allLogins]
    .map((l) => ({
      l,
      commits: commitByUser[l] ?? 0,
      prs: prByUser[l] ?? 0,
      reviews: reviewByUser[l] ?? 0,
    }))
    .sort((a, b) => b.commits + b.prs * 2 + b.reviews - (a.commits + a.prs * 2 + a.reviews))
    .slice(0, 10)
    .map((c) => `| @${c.l} | ${c.commits} | ${c.prs} | ${c.reviews} |`);

  // 트래픽 섹션 (데이터 없으면 가이드 안내)
  const trafficSection = weekViews
    ? `### 📈 레포지토리 트래픽 (지난 7일)

| 구분 | 조회 수 | 순 방문자 |
|------|---------|---------|
| 페이지 뷰 | **${weekViews.count}** | ${weekViews.uniques} |
| 클론 수 | **${weekClones?.count ?? '-'}** | ${weekClones?.uniques ?? '-'} |

${
  (pathsData ?? []).length
    ? `**인기 경로 TOP ${Math.min(pathsData.length, 5)}**

| 경로 | 조회 수 | 순 방문자 |
|------|---------|-------|
${rows(...(pathsData ?? []).slice(0, 5).map((p) => `| \`${p.path}\` | ${p.count} | ${p.uniques} |`))}`
    : ''
}

${
  (referrersData ?? []).length
    ? `**유입 출처 TOP ${Math.min(referrersData.length, 5)}**

| 출처 | 조회 수 | 순 방문자 |
|------|---------|-------|
${rows(...(referrersData ?? []).slice(0, 5).map((r) => `| ${r.referrer} | ${r.count} | ${r.uniques} |`))}`
    : ''
}`
    : `### 📈 레포지토리 트래픽

> ⚠️ 트래픽 데이터를 불러오지 못했습니다.
> push 권한이 있는 PAT를 \`ANALYTICS_TOKEN\` 시크릿으로 등록하고,
> 워크플로우의 \`github-token\` 값을 \`\${{ secrets.ANALYTICS_TOKEN }}\` 으로 교체하세요.`;

  const report = `## 📊 주간 협업 리포트

> **기간**: ${kst(weekAgo)} ~ ${kst(now)}
> **생성**: ${now.toLocaleString('ko-KR', {timeZone: 'Asia/Seoul'})} KST

---

### 🔄 PR 현황

| 구분 | 수 |
|------|---|
| 새로 열린 PR | **${openedPRs.length}**개 |
| 머지된 PR | **${mergedPRs.length}**개 |
| 평균 머지 시간 | ${avgMergeMs > 0 ? formatMs(avgMergeMs) : '-'} |

${
  mergedPRs.length > 0
    ? `**이번 주 머지된 PR**

| PR | 제목 | 작성자 | 소요 시간 |
|----|------|--------|---------|
${rows(...prTableRows)}`
    : '_이번 주 머지된 PR이 없습니다._'
}

---

### 👥 기여자 활동 (지난 7일)

| 기여자 | 커밋 | PR 오픈 | 리뷰 |
|--------|------|---------|------|
${contributorRows.length ? rows(...contributorRows) : '_이번 주 활동이 없습니다._'}

---

${trafficSection}

---

### 🐛 이슈 현황

| 구분 | 수 |
|------|---|
| 새로 열린 이슈 | **${newIssues.length}**개 |
| 해결된 이슈 | **${closedIssues.length}**개 |
| 미해결 이슈 (전체) | **${openTotal}**개 |

---

*🤖 매주 월요일 오전 9시(KST) 자동 생성 · [워크플로우 보기](https://github.com/${owner}/${repo}/actions/workflows/weekly-analytics.yml)*`;

  // ──────────────────────────────────────────────
  // 6. analytics 라벨 생성 (없으면)
  // ──────────────────────────────────────────────
  await safe('createLabel', () =>
    github.rest.issues.createLabel({
      owner,
      repo,
      name: 'analytics',
      color: '0075ca',
      description: '자동 생성된 주간 협업 리포트',
    })
  );

  // ──────────────────────────────────────────────
  // 7. 이슈 등록
  // ──────────────────────────────────────────────
  const {data: issue} = await github.rest.issues.create({
    owner,
    repo,
    title: `📊 주간 협업 리포트 — ${kst(now)}`,
    body: report,
    labels: ['analytics'],
  });

  core.info(`리포트 이슈 생성 완료: ${issue.html_url}`);
};
