import {Button} from '@repo/ui/components/buttons/Button';

interface MailHeaderProps {
  canEdit: boolean;
  isEditing: boolean;
  isChanged: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
}

export const MailHeader = ({
  canEdit,
  isEditing,
  isChanged,
  onEdit,
  onCancel,
  onSave,
}: MailHeaderProps) => {
  return (
    <div className='flex w-full items-center justify-between'>
      <div className='lg:text-h4 text-h5 px-2.5 font-bold text-neutral-800 lg:px-0'>
        메일 관리
      </div>
      <div className='flex gap-2 lg:gap-4'>
        {isEditing ? (
          <>
            <Button
              variant='outline'
              label='취소'
              labelTypo='body_l_sb'
              borderRadius={5}
              backgroundColor='white'
              textColor='neutral-400'
              width='100%'
              wrapperClassName='lg:w-[64.5px] lg:h-9 w-[56px] h-7.5'
              onClick={onCancel}
            />
            <Button
              label='저장'
              labelTypo='body_l_sb'
              borderRadius={5}
              backgroundColor='alert'
              width='100%'
              wrapperClassName='lg:w-[64.5px] lg:h-9 w-[56px] h-7.5'
              onClick={onSave}
              disabled={!isChanged}
            />
          </>
        ) : (
          <Button
            label='수정'
            labelTypo='body_l_sb'
            borderRadius={5}
            backgroundColor={canEdit ? 'secondary' : 'neutral-400'}
            width='100%'
            wrapperClassName='lg:w-36.25 w-30 lg:h-9 h-7.5'
            onClick={onEdit}
            disabled={!canEdit}
          />
        )}
      </div>
    </div>
  );
};
