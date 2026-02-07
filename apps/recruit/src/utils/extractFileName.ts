/** S3 Presigned URL 또는 경로에서 파일명만 추출하는 유틸리티 */
export const extractFileName = (url: string) => {
  try {
    if (!url) return '';
    // 1. 쿼리 파라미터(?...) 제거
    const urlWithoutQuery = url.split('?')[0];
    // 2. 경로의 마지막 세그먼트 추출
    const encodedName = urlWithoutQuery.split('/').pop() || '';
    // 3. URL 인코딩(한글 등) 복원
    return decodeURIComponent(encodedName);
  } catch (error) {
    return url; // 실패 시 원본 반환
  }
};
