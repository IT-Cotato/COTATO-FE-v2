/**
 * Date 객체를 YYYY-MM-DD 형식의 문자열로 변환합니다.
 * (한국 시간대 기준)
 */
export const formatDate = (date: Date | null) => {
  if (!date) return null;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};
