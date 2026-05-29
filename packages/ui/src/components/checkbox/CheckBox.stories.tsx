import type {Meta, StoryObj} from '@storybook/react';
import {useState} from 'react';
import {Checkbox} from './CheckBox';

const meta = {
  title: 'Components/Selection/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    checked: {control: 'boolean'},
    disabled: {control: 'boolean'},
    isRecruitment: {control: 'boolean'},
  },
  args: {
    checked: false,
    onChange: () => {},
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const UncheckedTemplate = () => {
  const [checked, setChecked] = useState(false);
  return <Checkbox checked={checked} onChange={setChecked} />;
};

const CheckedTemplate = () => {
  const [checked, setChecked] = useState(true);
  return <Checkbox checked={checked} onChange={setChecked} />;
};

export const Unchecked: Story = {
  render: UncheckedTemplate,
};

export const Checked: Story = {
  render: CheckedTemplate,
};

export const Disabled: Story = {
  args: {checked: false, disabled: true, onChange: () => {}},
};

export const DisabledChecked: Story = {
  args: {checked: true, disabled: true, onChange: () => {}},
};
