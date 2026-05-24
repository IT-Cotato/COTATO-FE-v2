import type {Meta} from '@storybook/react';
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
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: {
        inline: false,
        height: '520px',
      },
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;

export const Default = {
  render: () => {
    return (
      <div className='w-full'>
        <Modal
          isOpen={true}
          onClose={() => {}}
          title='알림'
          content='정말로 진행하시겠습니까?'
          actions={
            <>
              <Button
                label='취소'
                variant='outline'
                textColor='neutral-400'
                wrapperClassName='flex-1'
                width='100%'
                onClick={() => {}}
              />
              <Button
                label='확인'
                wrapperClassName='flex-1'
                width='100%'
                onClick={() => {}}
              />
            </>
          }
        />
      </div>
    );
  },
};
