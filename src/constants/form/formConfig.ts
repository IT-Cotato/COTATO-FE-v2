import {EtcFormItem, BasicInfoFormItem} from '@/schemas/apply/apply-type';
import {PART_TABS} from '@/constants/admin/admin-application-questions';

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
          {value: 'male', label: '남'},
          {value: 'female', label: '여'},
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
        placeholder: '학교를 작성해주세요',
      },
      {
        name: 'isCollegeStudent',
        label: '재학 여부',
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
    placeholder: '학과를 작성해주세요',
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

export const getEtcFields = (dates?: EtcFieldDates): EtcFormItem[] => {
  const interviewStart = dates?.interviewStartDate ?? '';
  const interviewEnd = dates?.interviewEndDate ?? '';
  const otDateLabel = dates?.otDate ?? '';

  return [
    {
      name: 'discovery',
      label: '동아리를 알게 된 경로를 선택해주세요.',
      type: 'dropdown',
      placeholder: '알게 된 경로를 선택해주세요',
      options: [
        {value: 'SNS', label: '인스타그램'},
        {value: '학교 홍보', label: '에브리타임'},
        {value: '학교 홍보', label: '캠퍼스픽'},
        {value: '기타', label: '직행'},
        {value: 'SNS', label: '네이버 카페'},
        {value: 'SNS', label: '그 외 SNS'},
        {value: '지인 추천', label: '지인 소개'},
        {value: '기타', label: '해당 없음'},
      ],
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
      label: `${interviewStart}부터 ${interviewEnd}까지 면접이 진행됩니다. 참여가 불가능한 시간이 있다면 모두 작성해주세요.`,
    },
    {
      type: 'row',
      row: [
        {
          name: 'interview1',
          label: interviewStart,
          type: 'input',
          placeholder: 'ex) 14:00~16:00, 18:00~19:30',
        },
        {
          name: 'interview2',
          label: interviewEnd,
          type: 'input',
          placeholder: 'ex) 14:00~16:00, 18:00~19:30',
        },
      ],
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
      defaultValue: '개인정보 약관 내용',
    },
    {
      name: 'privacyAgree',
      type: 'radio',
      options: [{label: '개인정보의 수집 및 이용에 동의합니다.', value: 'agree'}],
      className: 'justify-end',
    },
  ];
};
