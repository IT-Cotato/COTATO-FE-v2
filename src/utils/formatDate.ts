export const formatDate = (date: Date | null) => {
  if (!date) return null;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const formatKoreanDate = (submittedAt: string) => {
  const date = new Date(submittedAt);

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${month}월 ${day}일 ${hours}:${minutes}`;
};

/** 모집 공고 전용 날짜 한글 포맷 함수  */
export const formatRecruitmentDate = (value?: string | null) => {
  if (!value) return '';

  const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

  // datetime: 2026-01-14T00:00:00
  if (value.includes('T')) {
    const date = new Date(value);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const weekday = DAYS[date.getDay()];
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');

    return ` ${month}월 ${day}일 (${weekday}) ${hour}:${minute}`;
  }

  // date only: 2026-03-06 → 월/일만
  const date = new Date(value);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekday = DAYS[date.getDay()];

  return `${month}월 ${day}일 (${weekday})`;
};
