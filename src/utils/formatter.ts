/**
 * 숫자 문자열을 YYYY-MM-DD 형식으로 변환합니다. (실시간 포맷팅)
 * @param digits 숫자 문자열 (e.g., '19990101', '1999', '199901')
 * @returns YYYY-MM-DD 형식의 문자열
 */
export const formatDigitsToYYYYMMDD = (digits: string): string => {
  if (!digits) return '';

  // 숫자만 추출 (혹시 모를 하이픈 제거)
  const numbersOnly = digits.replace(/\D/g, '');

  // 실시간 포맷팅 - 4자리 입력 시 즉시 하이픈 표시
  if (numbersOnly.length < 4) {
    return numbersOnly;
  } else if (numbersOnly.length === 4) {
    return `${numbersOnly}-`;
  } else if (numbersOnly.length < 6) {
    return `${numbersOnly.slice(0, 4)}-${numbersOnly.slice(4)}`;
  } else if (numbersOnly.length === 6) {
    return `${numbersOnly.slice(0, 4)}-${numbersOnly.slice(4, 6)}-`;
  } else {
    return `${numbersOnly.slice(0, 4)}-${numbersOnly.slice(4, 6)}-${numbersOnly.slice(6, 8)}`;
  }
};

/**
 * 숫자 문자열을 010-XXXX-XXXX 형식으로 변환합니다. (실시간 포맷팅)
 * @param digits 숫자 문자열 (e.g., '01012345678', '010', '0101234')
 * @returns 010-XXXX-XXXX 형식의 문자열
 */
export const formatDigitsToPhoneNumber = (digits: string): string => {
  if (!digits) return '';

  // 숫자만 추출
  const numbersOnly = digits.replace(/\D/g, '');

  // 실시간 포맷팅 - 3자리, 7자리 입력 시 즉시 하이픈 표시
  if (numbersOnly.length < 3) {
    return numbersOnly;
  } else if (numbersOnly.length === 3) {
    return `${numbersOnly}-`;
  } else if (numbersOnly.length < 7) {
    return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3)}`;
  } else if (numbersOnly.length === 7) {
    return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3, 7)}-`;
  } else {
    return `${numbersOnly.slice(0, 3)}-${numbersOnly.slice(3, 7)}-${numbersOnly.slice(7, 11)}`;
  }
};
