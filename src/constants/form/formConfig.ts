import {PART_TABS} from '@/constants/common/part';
import {EtcFormItem, BasicInfoFormItem} from '@/schemas/apply/apply-type';
import {
  DISCOVERY_PATH_LABEL_MAP,
  DISCOVERY_PATH_OPTIONS,
} from '@/constants/admin/admin-applications';
import {PRIVACY_POLICY} from '@/constants/admin/admin-applications';

export const SEMESTER_OPTIONS = [
  {value: '4', label: '4학기'},
  {value: '5', label: '5학기'},
  {value: '6', label: '6학기'},
  {value: '7', label: '7학기'},
  {value: '8', label: '8학기 이상'},
];

export const BASIC_INFO_FIELDS: BasicInfoFormItem[] = [
  {
    name: 'name',
    label: '이름',
    type: 'input',
    placeholder: '이름을 작성해주세요',
    autocomplete: 'name',
  },
  {
    row: [
      {
        name: 'gender',
        label: '성별',
        type: 'dropdown',
        placeholder: '성별을 선택해주세요',
        options: [
          {value: 'MALE', label: '남'},
          {value: 'FEMALE', label: '여'},
        ],
      },
      {
        name: 'birthDate',
        label: '생년월일',
        type: 'input',
        placeholder: 'ex) 2000-01-01',
      },
    ],
  },
  {
    name: 'contact',
    label: '연락처',
    type: 'input',
    placeholder: 'ex) 010-1234-5678',
  },
  {
    row: [
      {
        name: 'school',
        label: '학교',
        type: 'input',
        placeholder: 'ex) 감자대학교',
      },
      {
        name: 'isCollegeStudent',
        label: '',
        type: 'radio',
        options: [
          {label: '재학', value: 'enrolled'},
          {label: '휴학 · 졸업 · 유예', value: 'other'},
        ],
      },
    ],
  },
  {
    name: 'department',
    label: '학과',
    type: 'input',
    placeholder: 'ex) 주전공: 컴퓨터공학과, 복수전공: 경영학과',
  },
  {
    row: [
      {
        name: 'completedSemesters',
        label: '수료한 학기 수',
        type: 'dropdown',
        placeholder: '3학년 1학기일 경우 4학기 수료입니다.',
        options: SEMESTER_OPTIONS,
      },
      {
        name: 'isPrevActivity',
        label: '이전 기수 활동 여부',
        type: 'dropdown',
        placeholder: '이전 기수 활동 여부를 선택해주세요',
        options: [
          {value: 'yes', label: '예'},
          {value: 'no', label: '아니오'},
        ],
      },
    ],
  },
  {
    name: 'part',
    label: '지원하실 파트를 선택해주세요',
    type: 'dropdown',
    placeholder: '파트를 선택해주세요',
    options: PART_TABS,
  },
];

export interface EtcFieldDates {
  interviewStartDate: string;
  interviewEndDate: string;
  otDate: string;
}

export const getEtcFields = (
  dates?: EtcFieldDates,
  discoveryOptions?: {value: string; label?: string | null}[]
): EtcFormItem[] => {
  const interviewStart = dates?.interviewStartDate ?? '';
  const interviewEnd = dates?.interviewEndDate ?? '';
  const otDateLabel = dates?.otDate ?? '';

  const normalizedDiscoveryOptions = (
    discoveryOptions && discoveryOptions.length > 0
      ? discoveryOptions
      : DISCOVERY_PATH_OPTIONS
  ).map(({value, label}) => ({
    value,
    label: label ?? DISCOVERY_PATH_LABEL_MAP[value] ?? value,
  }));

  return [
    {
      name: 'discovery',
      label: '동아리를 알게 된 경로를 선택해주세요.',
      type: 'dropdown',
      placeholder: '알게 된 경로를 선택해주세요',
      options: normalizedDiscoveryOptions,
    },
    {
      name: 'otherActivity',
      label:
        '코테이토 활동 외에 병행하는 활동이 있다면 요일과 시간을 모두 작성해주세요.',
      type: 'textarea',
      placeholder:
        '코테이토 활동 외에 병행하는 활동(알바, 인턴, 타 동아리 등등)이 있다면 요일과 시간을 모두 작성해주세요.',
      maxLength: 500,
    },
    {
      type: 'group_label',
      label:
        interviewStart && interviewEnd
          ? `${interviewStart}부터 ${interviewEnd}까지 면접이 진행됩니다. 참여가 불가능한 시간이 있다면 모두 작성해주세요.`
          : '면접이 진행됩니다. 참여가 불가능한 시간이 있다면 모두 작성해주세요.',
    },
    {
      name: 'unavailableInterviewTimes',
      type: 'textarea',
      placeholder: 'ex) 3월 3일 14:00~16:00, 3월 4일 18:00~19:30',
      className: 'min-h-[165px]',
    },
    {
      name: 'sessionAgree',
      label: '코테이토의 세션은 매주 금요일 19시에 진행됩니다. ',
      type: 'radio',
      options: [{label: '성실히 참여하겠습니다!', value: 'agree'}],
    },
    {
      name: 'otAgree',
      label: `최종 합격 시 대면 OT(${otDateLabel})는 필수 참여입니다. `,
      type: 'radio',
      options: [{label: '네, 참석 가능합니다.', value: 'agree'}],
    },
    {
      name: 'privacyPolicy',
      label: '개인정보 수집 및 이용 동의',
      type: 'textarea',
      readOnly: true,
      defaultValue: PRIVACY_POLICY,
    },
    {
      name: 'privacyAgree',
      type: 'radio',
      options: [
        {label: '개인정보의 수집 및 이용에 동의합니다.', value: 'agree'},
      ],
      className: 'justify-end',
    },
  ];
};
