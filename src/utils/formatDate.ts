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
