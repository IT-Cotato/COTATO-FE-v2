import {EvaluatorType} from '@/schemas/admin/admin-application.schema';
import {
  ApplicationPartViewType,
  ApplicationSummaryType,
} from '@/schemas/admin/admin-applications.schema';

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
export const APPLICATIONS_PART_TABS: {
  label: string;
  value: ApplicationPartViewType;
}[] = [
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

export const EVALUATOR_TABS: {label: string; value: EvaluatorType}[] = [
  {label: '운영진1', value: 'STAFF1'},
  {label: '운영진2', value: 'STAFF2'},
  {label: '운영진3', value: 'STAFF3'},
  {label: '운영진4', value: 'STAFF4'},
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

/* ['합격', '불합격', '예비합격', '평가전']*/
export const RESULT_OPTIONS = Object.values(RESULT_LABEL_MAP);

/** 합격 드롭다운용 UI config  */
export const APPLICATION_RESULT_CONFIG = {
  PASS: {
    label: '합격',
    className: 'bg-[#68CA3A] text-white',
  },
  FAIL: {
    label: '불합격',
    className: 'bg-alert text-white',
  },
  WAITLISTED: {
    label: '예비합격',
    className: 'bg-hover text-white',
  },
  PENDING: {
    label: '평가전',
    className: 'bg-text-disabled text-white',
  },
} as const;

export type ApplicationResultStatus = keyof typeof APPLICATION_RESULT_CONFIG;

export const APPLICATION_RESULT_OPTIONS = Object.keys(
  APPLICATION_RESULT_CONFIG
) as ApplicationResultStatus[];

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
  enrollmentStatus: '재학',
  otherStatus: '휴학 · 졸업 · 유예',
  major: '학과',
  completedSemesters: '수료한 학기 수',
  isPrevActivity: '이전 기수 활동 여부',
} as const;

export const PART_QUESTION_LABELS = {
  fileAccept:
    ' 추가로 제출할 포트폴리오(깃허브, 블로그, 노션, 비핸스 등) 링크를 첨부해주세요. 업로드하실 포트폴리오 양식은 꼭 PDF로 변경 후 제출해주세요!',
};

export const ETC_QUESTION_LABELS = {
  discoveryPath: '동아리를 알게 된 경로를 선택해주세요.',
  parallelActivities:
    '코테이토 활동 외에 병행하는 활동(알바, 인턴, 타 동아리 등등)이 있다면 요일과 시간을 모두 작성해주세요.',
  sessionAttendance: '코테이토의 세션은 매주 금요일 19시에 진행됩니다.',
  sessionAttendance_answer: '성실히 참여하겠습니다!',
  mandatoryEvents_answer: '네, 참석 가능합니다.',
  privacyPolicy: '개인정보 수집 및 이용 동의',
  privacyPolicy_answer: '개인정보의 수집 및 이용동의·이용에 동의합니다.',
};

export const DISCOVERY_PATH_OPTIONS = [
  {value: 'INSTAGRAM', label: '인스타그램'},
  {value: 'EVERYTIME', label: '에브리타임'},
  {value: 'CAMPUSPICK', label: '캠퍼스픽'},
  {value: 'JIKHAENG', label: '직행'},
  {value: 'NAVER_CAFE', label: '네이버 카페'},
  {value: 'OTHER_SNS', label: '그 외 SNS'},
  {value: 'FRIEND_REFERRAL', label: '지인 소개'},
  {value: 'NONE', label: '해당 없음'},
] as const;

export const DISCOVERY_PATH_LABEL_MAP = Object.fromEntries(
  DISCOVERY_PATH_OPTIONS.map(({value, label}) => [value, label])
) as Record<string, string>;

export const PRIVACY_POLICY = `개인정보보호법에 따라 코테이토에 회원가입을 신청하시는 분께 수집하는 개인정보의 항목, 개인정보의 수집 및 이용 목적, 개인정보의 보유 및 이용 기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내해 드리니 확인 후 동의하여 주시기를 바랍니다. 회원 가입을 위해서는 아래와 같이 개인정보를 수집·이용합니다

1. 개인정보 수집 항목: 이름, 아이디(이메일), 비밀번호, 전화번호
2. 개인정보 수집 목적: 회원 관리
3. 보유 및 이용 기간: 회원 탈퇴 시까지

이용자는 개인정보의 수집 및 이용 동의를 거부할 권리가 있으나 동의 거부 시 서비스 이용이 제한됩니다.`;
