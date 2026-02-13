export type TermTabType = 'serviceTerms' | 'privacyPolicy' | 'clubRules';

interface TermMenu {
  id: TermTabType;
  label: string;
}

export const TERMS_MENU: TermMenu[] = [
  {
    id: 'serviceTerms',
    label: '이용약관',
  },
  {
    id: 'privacyPolicy',
    label: '개인정보처리방침',
  },
  {
    id: 'clubRules',
    label: '동아리 규정',
  },
];
