import {create} from '@storybook/theming';

export const cotatoTheme = create({
  base: 'light',

  brandTitle: 'COTATO DESIGN SYSTEM',
  brandUrl: 'https://cotato.kr',
  brandTarget: '_blank',

  // 배경
  colorPrimary: '#f87d02',
  colorSecondary: '#ffb800',

  // UI
  appBg: '#f5f5f5',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#e5e5e5',
  appBorderRadius: 10,

  // 텍스트
  textColor: '#1f1f1f',
  textMutedColor: '#757575',
  textInverseColor: '#ffffff',

  // 툴바
  barTextColor: '#525252',
  barHoverColor: '#f87d02',
  barSelectedColor: '#f87d02',
  barBg: '#ffffff',

  // 인풋
  inputBg: '#ffffff',
  inputBorder: '#e5e5e5',
  inputTextColor: '#1f1f1f',
  inputBorderRadius: 6,

  // 버튼
  buttonBg: '#f5f5f5',
  buttonBorder: '#e5e5e5',
});
