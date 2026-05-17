import {create} from '@storybook/theming/create';

export const cotatoTheme = create({
  base: 'dark',

  brandTitle: 'Cotato Design System',
  brandUrl: 'https://cotato.kr',
  brandTarget: '_blank',

  // 배경
  colorPrimary: '#f87d02',
  colorSecondary: '#ffb800',

  // UI
  appBg: '#1f1f1f',
  appContentBg: '#2a2a2a',
  appPreviewBg: '#2a2a2a',
  appBorderColor: '#343434',
  appBorderRadius: 10,

  // 텍스트
  textColor: '#f5f5f5',
  textMutedColor: '#9e9e9e',
  textInverseColor: '#1f1f1f',

  // 툴바
  barTextColor: '#9e9e9e',
  barHoverColor: '#f87d02',
  barSelectedColor: '#f87d02',
  barBg: '#1f1f1f',

  // 인풋
  inputBg: '#2a2a2a',
  inputBorder: '#343434',
  inputTextColor: '#f5f5f5',
  inputBorderRadius: 6,

  // 버튼
  buttonBg: '#343434',
  buttonBorder: '#525252',
});
