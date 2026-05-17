import type {Meta, StoryObj} from '@storybook/react';
import {FormFile} from './FormFile';

const meta = {
  title: 'Components/Form/FormFile',
  component: FormFile,
  tags: ['autodocs'],
  argTypes: {
    label: {control: 'text'},
    error: {control: 'text'},
  },
  args: {label: '파일 첨부'},
} satisfies Meta<typeof FormFile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithError: Story = {args: {error: '파일을 선택해주세요.'}};
