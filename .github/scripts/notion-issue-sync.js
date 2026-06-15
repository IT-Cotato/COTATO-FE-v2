'use strict';

/**
 * GitHub Issues ↔ Notion 칸반 동기화 스크립트
 *
 * 필요한 Notion DB 속성:
 *   - 이름       (title)
 *   - 상태       (select: "할 일" | "진행 중" | "완료")
 *   - GitHub 링크 (url)
 *   - 이슈 번호   (number)
 *   - 레이블     (multi_select)
 *   - 생성일     (date)
 *   - 완료일     (date)
 *   - 저장소     (rich_text)
 */
module.exports = async ({ github, context, core }) => {
  const notionToken = process.env.NOTION_TOKEN;
  const dbId = process.env.NOTION_DATABASE_ID;

  if (!notionToken || !dbId) {
    core.warning('NOTION_TOKEN 또는 NOTION_DATABASE_ID 시크릿이 설정되지 않았습니다.');
    return;
  }

  const { owner, repo } = context.repo;
  const issue = context.payload.issue;
  const action = context.payload.action;

  const notionFetch = async (path, method, body) => {
    const res = await fetch(`https://api.notion.com/v1${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${notionToken}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Notion API ${res.status}: ${text}`);
    }
    return res.json();
  };

  const findPageByIssueUrl = async (url) => {
    const result = await notionFetch(`/databases/${dbId}/query`, 'POST', {
      filter: { property: 'GitHub 링크', url: { equals: url } },
    });
    return result.results?.[0] ?? null;
  };

  if (action === 'opened') {
    const labels = (issue.labels ?? []).map((l) => ({ name: l.name }));

    await notionFetch('/pages', 'POST', {
      parent: { database_id: dbId },
      properties: {
        이름: { title: [{ text: { content: `#${issue.number} ${issue.title}` } }] },
        상태: { select: { name: '할 일' } },
        'GitHub 링크': { url: issue.html_url },
        '이슈 번호': { number: issue.number },
        레이블: { multi_select: labels },
        생성일: { date: { start: issue.created_at } },
        저장소: { rich_text: [{ text: { content: `${owner}/${repo}` } }] },
      },
    });
    core.info(`Notion 페이지 생성: #${issue.number} — ${issue.title}`);
    return;
  }

  const statusMap = { closed: '완료', reopened: '진행 중' };
  const newStatus = statusMap[action];
  if (!newStatus) {
    core.info(`처리하지 않는 action: ${action}`);
    return;
  }

  const page = await findPageByIssueUrl(issue.html_url);
  if (!page) {
    core.warning(`Notion에서 이슈 #${issue.number}를 찾을 수 없습니다. 먼저 이슈가 동기화되어야 합니다.`);
    return;
  }

  const updateProps = { 상태: { select: { name: newStatus } } };
  if (action === 'closed') {
    updateProps['완료일'] = { date: { start: new Date().toISOString() } };
  }

  await notionFetch(`/pages/${page.id}`, 'PATCH', { properties: updateProps });
  core.info(`Notion 페이지 업데이트: #${issue.number} → ${newStatus}`);
};
