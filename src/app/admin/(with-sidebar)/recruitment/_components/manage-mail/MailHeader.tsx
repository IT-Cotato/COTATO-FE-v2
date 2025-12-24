import {Button} from '@/components/button/Button';

interface MailHeaderProps {
  isEditing: boolean;
  isChanged: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
}

export const MailHeader = ({
  isEditing,
  isChanged,
  onEdit,
  onCancel,
  onSave,
}: MailHeaderProps) => {
  return (
    <div className='flex h-12 w-full items-center justify-between'>
      <div className='text-h4 text-neutral-800'>메일 관리</div>
      <div className='flex gap-4'>
        {isEditing ? (
          <>
            <Button
              variant='outline'
              label='취소'
              labelTypo='body_l'
              backgroundColor='white'
              textColor='neutral-400'
              width={80}
              height={36}
              onClick={onCancel}
            />
            <Button
              label='저장'
              labelTypo='body_l'
              backgroundColor={isChanged ? 'alert' : 'neutral-400'}
              width={80}
              height={36}
              onClick={onSave}
              disabled={!isChanged}
            />
          </>
        ) : (
          <Button
            label='수정'
            labelTypo='body_l'
            backgroundColor='secondary'
            width={112}
            height={36}
            onClick={onEdit}
          />
        )}
      </div>
    </div>
  );
};
