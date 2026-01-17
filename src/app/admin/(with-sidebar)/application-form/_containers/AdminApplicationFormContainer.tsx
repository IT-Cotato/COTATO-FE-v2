'use client';

import {AdminApplicationForm} from '@/app/admin/(with-sidebar)/application-form/_components/form/AdminApplicationForm';
import {Button} from '@/components/button/Button';
import {useAdminApplicationFormStore} from '@/store/useAdminApplicationFormStore';
import {useState} from 'react';

export const AdminApplicationFormContainer = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const isFormValid = useAdminApplicationFormStore((s) => s.isFormValid);

  const handleSave = () => {
    console.log('TODO: 지원서 수정 API 호출');
  };
  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <>
      <div className='flex items-center justify-end'>
        {isEditing ? (
          <div className='flex flex-row items-end gap-2.25'>
            {!isFormValid && (
              <span className='mr-1.5 text-body-m text-alert'>
                모든 필드를 작성해 주세요.
              </span>
            )}

            <Button
              label='저장'
              labelTypo='body_l'
              borderRadius={5}
              backgroundColor='alert'
              textColor='neutral-50'
              width={112}
              height={36}
              disabled={!isFormValid}
              onClick={handleSave}
            />

            <Button
              variant='outline'
              onClick={handleCancel}
              label='취소'
              labelTypo='body_l'
              borderRadius={5}
              backgroundColor='white'
              textColor='neutral-400'
              width={112}
              height={36}
            />
          </div>
        ) : (
          <Button
            label='수정'
            labelTypo='body_l'
            borderRadius={5}
            backgroundColor='secondary'
            textColor='neutral-50'
            width={112}
            height={36}
            onClick={() => setIsEditing(true)}
          />
        )}
      </div>
      <AdminApplicationForm isEditing={isEditing} />
    </>
  );
};
