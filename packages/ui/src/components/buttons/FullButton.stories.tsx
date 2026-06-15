import type {Meta, StoryObj} from '@storybook/react';
import {FullButton} from './FullButton';

const meta = {
  title: 'Components/Buttons/FullButton',
  component: FullButton,
  tags: ['autodocs'],
  parameters: {layout: 'padded'},
  argTypes: {
    variant: {control: 'select', options: ['primary', 'outline']},
    disabled: {control: 'boolean'},
    label: {control: 'text'},
  },
  args: {
    label: '전체 너비 버튼',
    variant: 'primary',
    disabled: false,
  },
} satisfies Meta<typeof FullButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {label: '로그인'},
};

export const Outline: Story = {
  args: {label: '회원가입', variant: 'outline', textColor: 'neutral-400'},
};

export const Disabled: Story = {
  args: {label: '제출', disabled: true},
};
