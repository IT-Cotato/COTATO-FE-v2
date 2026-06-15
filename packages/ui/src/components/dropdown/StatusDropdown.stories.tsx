import type {Meta, StoryObj} from '@storybook/react';
import {useState} from 'react';
import {StatusDropdown} from './StatusDropdown';

type ApplyStatus = 'WAITING' | 'PASS' | 'FAIL';

const applyConfig: Record<ApplyStatus, {label: string; className: string}> = {
  WAITING: {label: '검토중', className: 'bg-neutral-400 text-white'},
  PASS: {label: '합격', className: 'bg-chip text-white'},
  FAIL: {label: '불합격', className: 'bg-alert text-white'},
};

const meta = {
  title: 'Components/Selection/StatusDropdown',
  component: StatusDropdown,
  tags: ['autodocs'],
  argTypes: {
    disabled: {control: 'boolean'},
  },
  args: {
    value: 'WAITING' as ApplyStatus,
    options: ['WAITING', 'PASS', 'FAIL'] as ApplyStatus[],
    config: applyConfig,
    onChange: () => {},
  },
} satisfies Meta<typeof StatusDropdown<ApplyStatus>>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultTemplate = () => {
  const [value, setValue] = useState<ApplyStatus>('WAITING');
  return (
    <StatusDropdown
      value={value}
      options={['WAITING', 'PASS', 'FAIL']}
      config={applyConfig}
      onChange={setValue}
    />
  );
};

export const Default: Story = {
  render: DefaultTemplate,
};

export const Disabled: Story = {
  render: () => (
    <StatusDropdown
      value='PASS'
      options={['WAITING', 'PASS', 'FAIL']}
      config={applyConfig}
      onChange={() => {}}
      disabled
    />
  ),
};
