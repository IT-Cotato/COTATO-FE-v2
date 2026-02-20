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
    if (!timeStr) return '';
    
    const baseDate = new Date();
    if (isNaN(baseDate.getTime())) return ''; 
    
    // 이미 ISO 포맷에 가까우면 그대로 쓰거나 Z, 밀리초 제거합니다.
    if (timeStr.includes('T')) {
      const timePart = timeStr.split('.')[0];
      return timePart ? timePart.replace('Z', '') : ''; 
    }

    const [hours = 0, minutes = 0] = timeStr.split(':').map(Number);
    
    const pad = (n: number) => String(n).padStart(2, '0');
    const year = baseDate.getFullYear();
    const month = pad(baseDate.getMonth() + 1);
    const date = pad(baseDate.getDate());
    const hh = pad(hours);
    const mm = pad(minutes);
    
    return `${year}-${month}-${date}T${hh}:${mm}:00`;
  } catch {
    return '';
  }
};
