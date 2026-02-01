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
      <div className='text-h4 text-neutral-800'>메일 관리</div>
      <div className='flex gap-4'>
        {isEditing ? (
          <>
            <Button
              variant='outline'
              label='취소'
              labelTypo='body_l'
              borderRadius={5}
              backgroundColor='white'
              textColor='neutral-400'
              width={64.5}
              height={36}
              onClick={onCancel}
            />
            <Button
              label='저장'
              labelTypo='body_l'
              borderRadius={5}
              backgroundColor='alert'
              width={64.5}
              height={36}
              onClick={onSave}
              disabled={!isChanged}
            />
          </>
        ) : (
          <Button
            label='수정'
            labelTypo='body_l'
            borderRadius={5}
            backgroundColor={canEdit ? 'secondary' : 'neutral-400'}
            width={145}
            height={36}
            onClick={onEdit}
            disabled={!canEdit}
          />
        )}
      </div>
    </div>
  );
};
