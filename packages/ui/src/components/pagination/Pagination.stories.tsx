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
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
    );
  },
};

export const Admin: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <Pagination
        currentPage={page}
        totalPages={10}
        onPageChange={setPage}
        variant='admin'
      />
    );
  },
};

export const FewPages: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <Pagination currentPage={page} totalPages={3} onPageChange={setPage} />
    );
  },
};
