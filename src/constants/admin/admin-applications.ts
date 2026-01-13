import {ReviewerType} from '@/schemas/admin/admin-application-type';
import {
  ApplicationPartViewType,
  ApplicationSummaryType,
} from '@/schemas/admin/admin-applications-schema';

/** 지원서 테이블 컬럼 상수 */
export const APPLICATION_COLUMNS = [
  {key: 'name', label: '이름'},
  {key: 'part', label: '직군'},
  {key: 'school', label: '학교'},
  {key: 'phone', label: '전화번호'},
  {key: 'submitDate', label: '최종 제출일자'},
  {key: 'result', label: '합격 여부'},
] as const;

/** 지원서 파트 탭 상수 */
export const PART_TABS: {label: string; value: ApplicationPartViewType}[] = [
  {label: '전체 회원', value: 'ALL'},
  {label: '기획', value: 'PM'},
  {label: '디자인', value: 'DE'},
  {label: '프론트엔드', value: 'FE'},
  {label: '백엔드', value: 'BE'},
];

export const PART_COUNT_MAP: Record<
  ApplicationPartViewType,
  keyof ApplicationSummaryType
> = {
  ALL: 'totalCount',
  PM: 'pmCount',
  DE: 'designCount',
  FE: 'frontendCount',
  BE: 'backendCount',
};

export const REVIEWER_TABS: {label: string; value: ReviewerType}[] = [
  {label: '운영진1', value: 'staff1'},
  {label: '운영진2', value: 'staff2'},
  {label: '운영진3', value: 'staff3'},
  {label: '운영진4', value: 'staff4'},
];

/** 쿼리 영문 라벨 -> 한글 UI 표시용 */
export const RESULT_LABEL_MAP = {
  PASS: '합격',
  FAIL: '불합격',
  WAITLISTED: '예비합격',
  PENDING: '평가전',
} as const;

/** 한글 UI -> 쿼리 영문 라벨 */
export const RESULT_VALUE_MAP = {
  합격: 'PASS',
  불합격: 'FAIL',
  예비합격: 'WAITLISTED',
  평가전: 'PENDING',
} as const;

/** '합격'|'불합격'|'예비합격'|'평가전' */
export type ApplicationResultLabel =
  (typeof RESULT_LABEL_MAP)[keyof typeof RESULT_LABEL_MAP];

// ['합격', '불합격', '예비합격', '평가전']
export const RESULT_OPTIONS = Object.values(RESULT_LABEL_MAP);

/**
 * 지원서 상세 페이지 관련 상수
 * 스탭 별 질문 레이블
 */
export const BASIC_INFO_LABELS = {
  name: '이름',
  gender: '성별',
  birthDate: '생년월일',
  phoneNumber: '연락처',
  school: '학교',
  enrollmentStatus: '재학 여부',
  otherStatus: '휴학 · 졸업 · 유예',
  major: '학과',
  completedSemesters: '수료한 학기 수',
  isPrevActivity: '이전 기수 활동 여부',
} as const;

export const PART_QUESTION_LABELS = {
  fileAccept:
    ' 추가로 제출할 포트폴리오(깃허브, 블로그, 노션, 비핸스 등) 링크를 첨부해주세요. 업로드하실 포트폴리오 양식은 꼭 PDF로 변경 후 제출해주세요!',
  // TODO: 파트 질문
};

export const ETC_QUESTION_LABELS = {
  discoveryPath: '동아리를 알게 된 경로를 선택해주세요.',
  parallelActivity:
    '코테이토 활동 외에 병행하는 활동(알바, 인턴, 타 동아리 등등)이 있다면 요일과 시간을 모두 작성해주세요.',
  interviewUnavailable:
    '3월 3일부터 4일까지 면접이 진행됩니다. 참여가 불가능한 시간이 있다면 모두 작성해주세요.',
  interviewUnavailableTimeFirst: '3월 3일',
  interviewUnavailableTimeSecond: '3월 4일',
  sessionDate: '코테이토의 세션은 매주 금요일 19시에 진행됩니다.',
  sessionDate_answer: '성실히 참여하겠습니다!',
  notice:
    '최종 합격 시 대면 OT(3월 6일), 코커톤(0월 0일), 데모데이(0월 0일)는 필수 참여입니다.',
  notice_answer: '네, 가능합니다.',
  termsAgree: ' 개인정보 활용 동의',
  termsAgree_answer: '확인',
};
