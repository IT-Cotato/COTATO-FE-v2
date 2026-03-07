/** 출석 관련 에러 메시지 */
export const ATTENDANCE_ERROR_MESSAGES: Record<
  string,
  {title: string; content: string}
> = {
  'AT-104': {
    title: '위치 정보가 일치하지 않습니다.',
    content: '다시 시도해 주세요.',
  },
  PERMISSION_DENIED: {
    title: '위치 권한이 필요합니다.',
    content: '브라우저 설정에서 위치 권한을 허용해 주세요.',
  },
  'AT-401': {
    title: '출석 실패',
    content: '출석 가능 시간이 지났습니다.',
  },
  BROWSER_NOT_SUPPORT: {
    title: '출석 실패',
    content: '브라우저가 위치 정보를 지원하지 않습니다.',
  },
  DEFAULT: {
    title: '출석 실패',
    content: '오류가 발생했습니다. 다시 시도해 주세요.',
  },
};
