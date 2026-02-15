export const formatKoreanDate = (submittedAt: string) => {
  const date = new Date(submittedAt);

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${month}월 ${day}일 ${hours}:${minutes}`;
};

/** 모집 공고 전용 날짜 한글 포맷 함수  */
export const formatRecruitmentDate = (
  value?: string | null,
  includeDay = true
) => {
  if (!value) return '';

  const date = new Date(value);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if (!includeDay) {
    return `${month}월 ${day}일`;
  }

  const DAYS = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = DAYS[date.getDay()];

  // datetime: 2026-01-14T00:00:00
  if (value.includes('T')) {
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    return ` ${month}월 ${day}일 (${weekday}) ${hour}:${minute}`;
  }

  // date only: 2026-03-06 → 월/일만
  return `${month}월 ${day}일 (${weekday})`;
};

/** 현재 시간을 "YYYY-MM-DDTHH:mm:ss" 형식으로 생성하는 함수**/
export const getNowISOString = () => {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  const localISOTime = new Date(now.getTime() - offset)
    .toISOString()
    .split('.')[0];

  return localISOTime;
};
