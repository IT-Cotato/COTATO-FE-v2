import type {Meta, StoryObj} from '@storybook/react';
import {useState} from 'react';
import {Modal} from './Modal';
import {Button} from '../buttons/Button';

const meta = {
  title: 'Components/Overlay/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    isOpen: {control: 'boolean'},
    actionsAlign: {control: 'select', options: ['center', 'stretch']},
    noContent: {control: 'boolean'},
    fullHeight: {control: 'boolean'},
  },
  args: {
    isOpen: false,
    title: '',
    onClose: () => {},
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button label='모달 열기' onClick={() => setIsOpen(true)} />
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title='알림'
          content='정말로 진행하시겠습니까?'
          actions={
            <>
              <Button
                label='취소'
                variant='outline'
                textColor='neutral-400'
                onClick={() => setIsOpen(false)}
              />
              <Button label='확인' onClick={() => setIsOpen(false)} />
            </>
          }
        />
      </>
    );
  },
};

export const NoContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button label='모달 열기' onClick={() => setIsOpen(true)} />
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title='저장되었습니다'
          noContent
          actions={<Button label='확인' onClick={() => setIsOpen(false)} />}
        />
      </>
    );
  },
};
