/**
 * 8자리 숫자 문자열을 YYYY-MM-DD 형식으로 변환합니다.
 * @param digits 8자리 숫자 문자열 (e.g., '19990101')
 * @returns YYYY-MM-DD 형식의 문자열
 */
export const formatDigitsToYYYYMMDD = (digits: string): string => {
  if (digits && digits.length === 8) {
    return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}`;
  }
  return digits;
};

/**
 * 11자리 숫자 문자열을 010-XXXX-XXXX 형식으로 변환합니다.
 * @param digits 11자리 숫자 문자열 (e.g., '01012345678')
 * @returns 010-XXXX-XXXX 형식의 문자열
 */
export const formatDigitsToPhoneNumber = (digits: string): string => {
  if (digits && digits.length === 11) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
  }
  return digits;
};
