/**
 * 현재 시간을 기준으로 초기 시간 정보를 반환하는 함수
 *
 * @returns{
  hour: '08',       // 2자리 문자열, padStart로 '0' 보정
  minute: '25',     // 2자리 문자열
  period: '오후'     // 오전/오후
}
 **/

export const getInitialTime = () => {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();

  const period: '오전' | '오후' = h < 12 ? '오전' : '오후';
  const hour12 = h % 12 === 0 ? 12 : h % 12;

  return {
    hour: String(hour12).padStart(2, '0'),
    minute: String(m).padStart(2, '0'),
    period,
  };
};
