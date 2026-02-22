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

export const formatDateToDot = (dateString: string): string => {
  if (!dateString) return '';
  
  // "2026-02-20T18:00..." 형태라면 T 앞부분만 추출합니다.
  const datePart = dateString.split('T')[0];
  
  // "2026-02-20" -> "2026.02.20"
  return datePart ? datePart.replace(/-/g, '.') : '';
};

export const extractISODate = (dateString?: string | null): string => {
  if (!dateString) return '';
  return dateString.split('T')[0] || '';
};

export const extractISOTime = (dateString?: string | null): string => {
  if (!dateString) return '';
  return dateString.split('T')[1]?.slice(0, 5) || '';
};

export const formatDateTimeToIso = (dateStr: string, timeStr?: string): string => {
  try {
    if (!dateStr || !timeStr) return '';

    // 이미 ISO 포맷에 가까우면 그대로 쓰거나 Z, 밀리초 제거합니다.
    if (timeStr.includes('T')) {
      const timePart = timeStr.split('.')[0];
      return timePart ? timePart.replace('Z', '') : '';
    }

    const [hh = '00', mm = '00', ss = '00'] = timeStr.split(':');
    return `${dateStr}T${hh.padStart(2, '0')}:${mm.padStart(2, '0')}:${ss.padStart(2, '0')}`;
  } catch {
    return '';
  }
};
