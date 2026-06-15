import type {Meta, StoryObj} from '@storybook/react';
import {useState} from 'react';
import {Pagination} from './Pagination';

const meta = {
  title: 'Components/Navigation/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    totalPages: {control: 'number'},
    variant: {control: 'select', options: ['default', 'admin']},
    disabled: {control: 'boolean'},
  },
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: () => {},
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

const DefaultTemplate = () => {
  const [page, setPage] = useState(1);
  return (
    <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
  );
};

const AdminTemplate = () => {
  const [page, setPage] = useState(1);
  return (
    <Pagination
      currentPage={page}
      totalPages={10}
      onPageChange={setPage}
      variant='admin'
    />
  );
};

const FewPagesTemplate = () => {
  const [page, setPage] = useState(1);
  return (
    <Pagination currentPage={page} totalPages={3} onPageChange={setPage} />
  );
};

export const Default: Story = {
  render: DefaultTemplate,
};

export const Admin: Story = {
  render: AdminTemplate,
};

export const FewPages: Story = {
  render: FewPagesTemplate,
};
