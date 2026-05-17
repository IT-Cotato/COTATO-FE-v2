import type {Meta, StoryObj} from '@storybook/react';
import HeroMainBanner from './HeroMainBanner';

const meta = {
  title: 'Components/Brand/HeroMainBanner',
  component: HeroMainBanner,
  tags: ['autodocs'],
  parameters: {layout: 'fullscreen'},
  args: {
    heading: 'Cotato 디자인 시스템',
    subheading: 'COde Together, Arrive TOgether',
    bannerImage: null,
  },
} satisfies Meta<typeof HeroMainBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    heading: 'Cotato 디자인 시스템',
    subheading: '2024 코테이토',
    bannerImage: (
      <div className='absolute inset-0 bg-gradient-to-r from-neutral-800 to-neutral-700' />
    ),
  },
};
