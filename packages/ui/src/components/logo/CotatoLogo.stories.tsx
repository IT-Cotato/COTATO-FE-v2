import type {Meta, StoryObj} from '@storybook/react';
import {CotatoLogo} from './CotatoLogo';

const meta = {
  title: 'Components/Brand/CotatoLogo',
  component: CotatoLogo,
  tags: ['autodocs'],
  parameters: {layout: 'centered'},
} satisfies Meta<typeof CotatoLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
