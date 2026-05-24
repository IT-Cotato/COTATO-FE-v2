import type {Meta, StoryObj} from '@storybook/react';
import {FormInput} from './FormInput';

const meta = {
  title: 'Components/Form/FormInput',
  component: FormInput,
  tags: ['autodocs'],
  argTypes: {
    label: {control: 'text'},
    placeholder: {control: 'text'},
    error: {control: 'text'},
    required: {control: 'boolean'},
    disabled: {control: 'boolean'},
    readOnly: {control: 'boolean'},
  },
  args: {
    label: '이름',
    placeholder: '이름을 입력하세요',
    required: false,
    disabled: false,
  },
} satisfies Meta<typeof FormInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Required: Story = {
  args: {label: '이메일', placeholder: 'example@cotato.kr', required: true},
};
export const WithError: Story = {
  args: {label: '비밀번호', error: '비밀번호가 올바르지 않습니다.'},
};
export const Disabled: Story = {
  args: {label: '학번', value: '2024001', disabled: true},
};
export const ReadOnly: Story = {
  args: {label: '아이디', value: 'cotato_user', readOnly: true},
};
