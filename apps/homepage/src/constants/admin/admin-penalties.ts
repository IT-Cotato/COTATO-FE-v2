/** 상벌점 테이블 헤더 상수 */
export const PENALTY_FULL_TABLE_HEADER = [
  {key: 'name', label: '이름'},
  {key: 'attendance-minus-point', label: '출석 벌점'},
  {key: 'session-minus-point', label: '기타 벌점'},
  {key: 'beer-networking-count', label: '뒷풀이 참여 수'},
  {key: 'beer-networking-bonus-point', label: '뒷풀이 참여 상점'},
  {key: 'total-minus-point', label: '누계'},
];

export const PENALTY_SPECIFIC_TABLE_HEADER = [
  {key: 'name', label: '이름'},
  {key: 'attendance-result', label: '출석'},
  {key: 'beer-networking-participated', label: '비어 네트워킹'},
  {key: 'extra-minus-point', label: '기타 벌점'},
];

/** 상벌점 비어 네트워킹 참여 여부 상수 */
export const BEER_NETWORKING_ATTENDANCE_CONFIG = {
  PRESENT: {label: '참여', className: 'bg-chip'},
  ABSENT: {label: '미참여', className: 'bg-neutral-400'},
};
