/**
 * Date 객체를 'YYYY-MM-DD' 형식의 문자열로 변환합니다.
 * @returns 날짜 문자열 또는 date가 null/undefined인 경우 빈 문자열
 */
export const formatDate = (date: Date | null | undefined): string => {
  if (!date) return '';
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};
