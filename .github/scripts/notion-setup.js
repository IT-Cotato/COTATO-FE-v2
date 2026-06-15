'use strict';

/**
 * Notion DB 초기 설정 스크립트
 * GitHub Actions workflow_dispatch로 실행 — 두 DB를 생성하고 ID를 이슈에 출력합니다.
 */
module.exports = async ({ github, context, core, parentPageId }) => {
  const notionToken = process.env.NOTION_TOKEN;
  if (!notionToken) {
    core.setFailed('NOTION_TOKEN 시크릿이 설정되지 않았습니다. README를 참고하세요.');
    return;
  }

  // Notion URL 또는 UUID 형식 모두 지원
  const extractPageId = (input) => {
    const cleaned = (input || '').trim().replace(/-/g, '');
    const matches = [...cleaned.matchAll(/[a-f0-9]{32}/gi)];
    return matches.length > 0 ? matches[matches.length - 1][0] : null;
  };

  const pageId = extractPageId(parentPageId);
  if (!pageId) {
    core.setFailed(
      `유효하지 않은 부모 페이지 ID: "${parentPageId}"\n` +
        'Notion 페이지 URL 전체 또는 32자리 UUID를 입력하세요.'
    );
    return;
  }

  const notionPost = async (path, body) => {
    const res = await fetch(`https://api.notion.com/v1${path}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${notionToken}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Notion API ${res.status}: ${text}`);
    }
    return res.json();
  };

  // ──────────────────────────────────────────────
  // 1. 이슈 칸반 DB 생성
  // ──────────────────────────────────────────────
  core.info('이슈 칸반 DB 생성 중...');
  const issuesDb = await notionPost('/databases', {
    parent: {type: 'page_id', page_id: pageId},
    is_inline: false,
    title: [{text: {content: '📋 GitHub 이슈 칸반'}}],
    properties: {
      이름: {title: {}},
      상태: {
        select: {
          options: [
            {name: '할 일', color: 'gray'},
            {name: '진행 중', color: 'blue'},
            {name: '완료', color: 'green'},
          ],
        },
      },
      'GitHub 링크': {url: {}},
      '이슈 번호': {number: {format: 'number'}},
      레이블: {multi_select: {options: []}},
      생성일: {date: {}},
      완료일: {date: {}},
      저장소: {rich_text: {}},
    },
  });

  // ──────────────────────────────────────────────
  // 2. 주간 리포트 DB 생성
  // ──────────────────────────────────────────────
  core.info('주간 리포트 DB 생성 중...');
  const reportsDb = await notionPost('/databases', {
    parent: {type: 'page_id', page_id: pageId},
    is_inline: false,
    title: [{text: {content: '📊 주간 협업 리포트'}}],
    properties: {
      이름: {title: {}},
      'PR 오픈': {number: {format: 'number'}},
      'PR 머지': {number: {format: 'number'}},
      '새 이슈': {number: {format: 'number'}},
      '해결 이슈': {number: {format: 'number'}},
      '평균 머지 시간': {rich_text: {}},
      'GitHub 링크': {url: {}},
      '기간 시작': {date: {}},
      '기간 종료': {date: {}},
    },
  });

  const issuesDbId = issuesDb.id;
  const reportsDbId = reportsDb.id;

  core.info(`이슈 칸반 DB ID: ${issuesDbId}`);
  core.info(`주간 리포트 DB ID: ${reportsDbId}`);

  // ──────────────────────────────────────────────
  // 3. GitHub Step Summary 출력
  // ──────────────────────────────────────────────
  const summaryBody = `## ✅ Notion DB 생성 완료

두 데이터베이스가 지정한 Notion 페이지에 생성되었습니다.

### 추가해야 할 GitHub 시크릿

레포 **Settings → Secrets and variables → Actions → New repository secret**

| 시크릿 이름 | 값 |
|------------|-----|
| \`NOTION_DATABASE_ID\` | \`${issuesDbId}\` |
| \`NOTION_REPORTS_DATABASE_ID\` | \`${reportsDbId}\` |

### 칸반 보드 뷰 활성화 방법

1. Notion에서 **📋 GitHub 이슈 칸반** DB 열기
2. 상단 **+ Add a view** 클릭
3. **Board** 선택 → Group by **상태**

> 시크릿 등록이 완료되면 이 이슈를 닫아주세요.`;

  await core.summary.addRaw(summaryBody).write();

  // ──────────────────────────────────────────────
  // 4. GitHub 이슈로 ID 전달 (로그에만 남기지 않기 위해)
  // ──────────────────────────────────────────────
  const {owner, repo} = context.repo;
  const {data: setupIssue} = await github.rest.issues.create({
    owner,
    repo,
    title: '🛠️ [Setup] Notion DB 생성 완료 — 시크릿 등록 필요',
    body: summaryBody,
    labels: [],
  });

  core.info(`설정 이슈 생성 완료: ${setupIssue.html_url}`);
};
