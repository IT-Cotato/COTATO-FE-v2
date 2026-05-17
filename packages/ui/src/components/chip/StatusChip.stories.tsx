import type {Meta, StoryObj} from '@storybook/react';
import {StatusChip} from './StatusChip';

type GenerationStatus = 'BEFORE' | 'ONGOING' | 'FINISH';

const generationConfig: Record<
  GenerationStatus,
  {label: string; className: string}
> = {
  BEFORE: {label: '준비중', className: 'bg-neutral-400'},
  ONGOING: {label: '진행중', className: 'bg-chip'},
  FINISH: {label: '종료', className: 'bg-neutral-600'},
};

const meta = {
  title: 'Components/Chip/StatusChip',
  component: StatusChip,
  tags: ['autodocs'],
  argTypes: {
    value: {control: 'select', options: ['BEFORE', 'ONGOING', 'FINISH']},
    isActive: {control: 'boolean'},
    disabled: {control: 'boolean'},
  },
  args: {
    value: 'ONGOING' as GenerationStatus,
    config: generationConfig,
    isActive: true,
    disabled: false,
  },
} satisfies Meta<typeof StatusChip<GenerationStatus>>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ongoing: Story = {args: {value: 'ONGOING', isActive: true}};
export const Before: Story = {args: {value: 'BEFORE', isActive: true}};
export const Finish: Story = {args: {value: 'FINISH', isActive: true}};
export const Inactive: Story = {args: {value: 'ONGOING', isActive: false}};
