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

export const PRIVACY_POLICY = `코테이토(이하 '동아리')는 지원자의 개인정보를 소중히 다루며, 「개인정보 보호법」 등 관련 법령을 준수하기 위하여 다음과 같이 통합 약관 및 개인정보 처리방침을 수립·공개합니다.

○ 이 이용약관은 2026년 2월 20일부터 적용됩니다.

제1부: 개인정보 처리방침

제1조 (개인정보의 처리 목적)

동아리는 다음의 목적을 위하여 개인정보를 처리합니다.

1. 회원가입 및 지원자 관리: 구글 소셜 로그인을 통한 본인 확인 및 식별, 지원 자격 확인, 서류 결과 안내.
2. 서비스 운영: 마이페이지를 통한 지원 상태 조회 및 제출 지원서 열람 기능 제공, 지원서 작성 중 저장 기능, 리크루팅 시스템의 안정적 운영.
3. 서비스 개선 및 통계 분석: GA4 및 뷰저블을 활용한 지원 페이지 이용 행태 분석, 사용자 경험(UX) 최적화 및 리크루팅 프로세스 개선.
4. 결과 통지: 전형별 합격, 불합격 및 예비 합격 여부에 대한 개별 이메일 발송.

제2조 (수집하는 개인정보의 항목)

1. 필수 수집 항목: 이름, 이메일 주소(구글), 연락처(휴대폰 번호), 성별, 생년월일, 소속 대학교 및 학과, 학년/학기 정보.
2. 지원 내용 항목: 지원 파트, 각 문항별 답변 내용, 포트폴리오(파일 또는 링크), 기타 외부 활동 링크(GitHub, 블로그 등).
3. 서비스 이용 정보: 접속 로그, 접속 IP 정보, 브라우저 정보, 로그인 세션 유지를 위한 토큰, 쿠키(Cookie), 서비스 내 활동 기록(클릭 로그, 마우스 움직임, 스크롤 등).

제3조 (개인정보의 처리 및 보유 기간)

1. 보유 기간: 지원서 접수일로부터 1년간 보관합니다.
2. 보유 사유: 선발 전형의 공정성 확보, 합격/불합격/예비 합격 관련 문의 대응, 재지원 시 과거 기록 확인 및 운영진 업무 인수인계. (단, 분석 도구를 통해 수집된 비식별 데이터는 해당 서비스의 보유 정책에 따릅니다.)
3. 파기: 보유 기간이 경과하거나 목적이 달성된 개인정보는 지체 없이 파기합니다.

제4조 (개인정보 처리 위탁)

동아리는 리크루팅 서비스의 품질 향상 및 지원자 행태 분석을 위해 다음과 같이 개인정보 처리 업무를 위탁하고 있습니다.

1. Google Analytics 4(GA4): 서비스 방문 기록 및 이용 통계 분석.
2. Beusable(뷰저블): 지원 페이지 내 사용자 행동 분석(히트맵 등) 및 UI/UX 개선.
- 위 업체들은 쿠키를 통해 비식별 정보를 수집하며, 지원자는 브라우저 설정을 통해 이를 거부할 수 있습니다.

제5조 (정보주체의 권리·의무 및 행사방법)

1. 지원자는 언제든지 자신의 개인정보에 대해 열람, 정정, 삭제를 요구할 수 있습니다.
2. 지원서 열람: 지원자는 서비스 내 '마이페이지'를 통해 본인이 제출한 지원서 내용을 상시 열람할 수 있습니다.
3. 회원탈퇴: 시스템상 직접 탈퇴 기능을 제공하지 않으므로, 데이터 파기를 원하는 경우 카카오톡 채널(https://pf.kakao.com/_LQLyG)로 연락 주시면 본인 확인 후 조치하겠습니다.

제2부: 서비스 이용약관

제1조 (서비스 이용 계약)

이용자가 구글(Google) 로그인을 통해 본 서비스(recruit.cotato.kr)에 접속함으로써 본 약관 및 개인정보 처리방침에 동의한 것으로 간주하며, 이때 서비스 이용 계약이 성립됩니다.

제2조 (결과 통보 및 공지)

1. 모든 전형의 합격 여부(합격, 불합격, 예비 합격 포함)는 가입 시 사용한 이메일을 통해 개별 통보됩니다.
2. 지원자는 마이페이지를 통해 자신의 지원서 제출여부를 확인할 수 있으며, 이메일 수신함의 문제로 통보를 받지 못한 경우에 합격자에 한해서 개설되는 카카오톡 오픈채팅방을 통해 확인할 수 있습니다.

제3조 (지원자의 의무)

1. 지원자는 반드시 본인의 실제 정보를 입력해야 하며, 허위 사실 기재 시 선발이 취소될 수 있습니다.
2. 작성 중인 지원서를 저장할 수 있으나, 최종 '제출하기' 버튼을 누르지 않은 지원서는 접수된 것으로 간주하지 않습니다.
3. 지원자는 서비스 개선을 위한 분석 도구(GA4, 뷰저블)의 활용에 동의하며, 이를 거부하고자 할 경우 브라우저 설정을 통해 쿠키 수집을 차단해야 합니다.

제4조 (책임의 제한)

1. 동아리는 지원 마감 직전 접속자 급증으로 인한 서버 지연, 제출 누락 등에 대해 책임을 지지 않습니다.
2. 지원자가 자신의 구글 계정이나 이메일 수신 설정을 관리하지 않아 발생하는 불이익의 책임은 지원자 본인에게 있습니다.`;
