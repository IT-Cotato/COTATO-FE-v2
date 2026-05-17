import type {Meta, StoryObj} from '@storybook/react';
import {FormTextarea} from './FormTextarea';

const meta = {
  title: 'Components/Form/FormTextarea',
  component: FormTextarea,
  tags: ['autodocs'],
  argTypes: {
    label: {control: 'text'},
    placeholder: {control: 'text'},
    error: {control: 'text'},
    maxLength: {control: 'number'},
    currentLength: {control: 'number'},
  },
  args: {
    label: '자기소개',
    placeholder: '자유롭게 작성해주세요',
  },
} satisfies Meta<typeof FormTextarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithCounter: Story = {
  args: {label: '지원 동기', maxLength: 300, currentLength: 45},
};
export const WithError: Story = {
  args: {label: '지원 동기', error: '최소 50자 이상 입력해주세요.'},
};
