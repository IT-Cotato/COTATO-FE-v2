import type {Meta, StoryObj} from '@storybook/react';
import {useState} from 'react';
import {CheckboxFilter} from './CheckboxFilter';

type Part = 'FE' | 'BE' | 'DESIGN' | 'PM';

const meta = {
  title: 'Components/Selection/CheckboxFilter',
  component: CheckboxFilter,
  tags: ['autodocs'],
  args: {
    options: [] as Part[],
    selected: [] as Part[],
    onChange: () => {},
    onClose: () => {},
  },
} satisfies Meta<typeof CheckboxFilter<Part>>;

export default meta;
type Story = StoryObj<typeof meta>;

const options: Part[] = ['FE', 'BE', 'DESIGN', 'PM'];
const labelMap: Record<Part, string> = {
  FE: '프론트엔드',
  BE: '백엔드',
  DESIGN: '디자인',
  PM: 'PM',
};

const DefaultTemplate = () => {
  const [selected, setSelected] = useState<Part[]>([]);
  return (
    <CheckboxFilter
      options={options}
      selected={selected}
      getLabel={(opt) => labelMap[opt]}
      onChange={setSelected}
      onClose={() => {}}
    />
  );
};

export const Default: Story = {
  render: DefaultTemplate,
};
