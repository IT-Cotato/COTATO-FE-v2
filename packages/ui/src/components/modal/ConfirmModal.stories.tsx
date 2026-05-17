import type {Meta, StoryObj} from '@storybook/react';
import {useState} from 'react';
import {ConfirmModal} from './ConfirmModal';
import {Button} from '../buttons/Button';

const meta = {
  title: 'Components/Overlay/ConfirmModal',
  component: ConfirmModal,
  tags: ['autodocs'],
  argTypes: {
    isOpen: {control: 'boolean'},
    confirmLabel: {control: 'text'},
    cancelLabel: {control: 'text'},
    isLoading: {control: 'boolean'},
  },
} satisfies Meta<typeof ConfirmModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button label='삭제 모달 열기' onClick={() => setIsOpen(true)} />
        <ConfirmModal
          isOpen={isOpen}
          title='정말 삭제하시겠습니까?'
          description='삭제된 데이터는 복구할 수 없습니다.'
          onClose={() => setIsOpen(false)}
          onConfirm={() => setIsOpen(false)}
          confirmLabel='삭제'
          cancelLabel='취소'
        />
      </>
    );
  },
};

export const Loading: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button label='모달 열기' onClick={() => setIsOpen(true)} />
        <ConfirmModal
          isOpen={isOpen}
          title='제출 중입니다'
          onClose={() => setIsOpen(false)}
          onConfirm={() => {}}
          isLoading
        />
      </>
    );
  },
};
