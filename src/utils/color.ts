/**
 * ColorKey를 CSS 변수 형식으로 변환합니다.
 * @param key - CSS 변수 키 (예: 'primary', 'neutral-50')
 * @returns CSS 변수 문자열 (예: 'var(--color-primary)') 또는 undefined
 **/

export function toColorVar(key?: string): string | undefined {
  return key ? `var(--color-${key})` : undefined;
}
