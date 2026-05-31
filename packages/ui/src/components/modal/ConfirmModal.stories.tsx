import type {Meta} from '@storybook/react';
import {ConfirmModal} from './ConfirmModal';

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
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: false,
        height: '400px',
      },
    },
  },
} satisfies Meta<typeof ConfirmModal>;

export default meta;

export const Default = {
  render: () => {
    return (
      <>
        <ConfirmModal
          isOpen={true}
          onClose={() => {}}
          onConfirm={() => {}}
          title='정말 삭제하시겠습니까?'
          description='삭제된 데이터는 복구할 수 없습니다.'
          confirmLabel='삭제'
          cancelLabel='취소'
        />
      </>
    );
  },
};
