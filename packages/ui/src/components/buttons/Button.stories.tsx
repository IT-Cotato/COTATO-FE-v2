import type {Meta, StoryObj} from '@storybook/react';
import {Button} from './Button';

const meta = {
  title: 'Components/Buttons/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'outline'],
      description: '버튼 스타일 타입',
    },
    labelTypo: {
      control: 'select',
      options: ['h3', 'h4', 'h5', 'body_l', 'body_m', 'body_l_sb', 'body_m_sb'],
      description: '라벨 타이포그래피',
    },
    disabled: {control: 'boolean'},
    enableHover: {control: 'boolean'},
    label: {control: 'text'},
    subLabel: {control: 'text'},
    width: {control: 'number'},
    height: {control: 'number'},
  },
  args: {
    label: '버튼',
    variant: 'primary',
    labelTypo: 'h5',
    disabled: false,
    enableHover: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {label: '확인', variant: 'primary'},
};

export const Outline: Story = {
  args: {label: '취소', variant: 'outline', textColor: 'neutral-400'},
};

export const OutlineWithSubLabel: Story = {
  name: 'Outline (subLabel)',
  args: {
    label: '로그아웃',
    variant: 'outline',
    subLabel: '계정에서 나갑니다',
    textColor: 'neutral-400',
  },
};

export const Disabled: Story = {
  args: {label: '비활성', disabled: true},
};

export const Alert: Story = {
  args: {
    label: '삭제',
    backgroundColor: 'alert',
    textColor: 'white',
  },
};

export const CustomSize: Story = {
  args: {label: '커스텀 크기', width: 200, height: 44},
};
