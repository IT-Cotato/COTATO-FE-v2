/**
 * 한글 단어의 받침 유무에 따라 적절한 조사를 반환
 * @param word - 대상 단어 (예: "프로젝트", "코테이토")
 * @param type - 조사 종류 (예: "을/를", "이/가", "은/는")
 */
export const getJosa = (
  word: string,
  type: '을/를' | '이/가' | '은/는'
): string => {
  const trimmedWord = word.trim();
  if (trimmedWord.length === 0) return '';

  const lastChar = trimmedWord.charCodeAt(trimmedWord.length - 1);

  // 한글 유니코드 범위를 벗어난 경우 (영어, 숫자 등) 처리
  if (lastChar < 0xac00 || lastChar > 0xd7a3) {
    // 보통 영어/숫자는 받침이 없는 것으로 간주하여 뒤의 조사를 반환.
    return type.split('/')[1];
  }

  // 받침 유무 판별 공식: (유니코드 - 가) % 28
  // 0이면 받침 없음, 그 외에는 받침 있음
  const hasBatchim = (lastChar - 0xac00) % 28 !== 0;
  const [withBatchim, withoutBatchim] = type.split('/');

  return hasBatchim ? withBatchim : withoutBatchim;
};
