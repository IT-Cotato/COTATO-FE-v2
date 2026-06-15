import type {Meta, StoryObj} from '@storybook/react';
import {FormLink} from './FormLink';

const meta = {
  title: 'Components/Form/FormLink',
  component: FormLink,
  tags: ['autodocs'],
  argTypes: {
    label: {control: 'text'},
    placeholder: {control: 'text'},
    error: {control: 'text'},
  },
  args: {
    label: '깃허브 링크',
    placeholder: 'https://github.com/username',
  },
} satisfies Meta<typeof FormLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithValue: Story = {
  args: {value: ['https://github.com/cotato', 'https://cotato.kr']},
};
export const WithError: Story = {args: {error: '올바른 URL 형식이 아닙니다.'}};
