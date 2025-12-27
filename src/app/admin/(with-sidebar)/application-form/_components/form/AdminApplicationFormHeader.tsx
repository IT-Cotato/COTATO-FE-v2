'use client';

import {GenerationDropdown} from '@/components/dropdown/GenerationDropdown';
import {Button} from '@/components/button/Button';
import {useAdminApplicationFormStore} from '@/stores/useAdminApplicationFormStore';

export const AdminApplicationFormHeader = () => {
  const generation = useAdminApplicationFormStore((s) => s.generation);
  const setGeneration = useAdminApplicationFormStore((s) => s.setGeneration);
  const startEdit = useAdminApplicationFormStore((s) => s.startRecruitEdit);
  const endEdit = useAdminApplicationFormStore((s) => s.endRecruitEdit);
  const isEditingRecruitmentInfo = useAdminApplicationFormStore(
    (s) => s.isEditingRecruitmentInfo
  );

  const handleSave = () => {
    console.log('TODO: 저장 API');
  };

  return (
    <>
      <h1 className='text-h4'>모집 기간</h1>
      <div className='flex flex-row justify-between'>
        <GenerationDropdown
          generation={generation}
          generations={['13', '14', '15']}
          onSelect={setGeneration}
        />
        {isEditingRecruitmentInfo ? (
          <div className='flex flex-row gap-2.25'>
            <Button
              label='저장'
              labelTypo='body_l'
              borderRadius={5}
              backgroundColor='secondary'
              textColor='neutral-50'
              width={112}
              height={36}
              onClick={handleSave}></Button>
            <Button
              variant='outline'
              onClick={endEdit}
              label='취소'
              labelTypo='body_l'
              borderRadius={5}
              backgroundColor='white'
              textColor='neutral-400'
              width={112}
              height={36}></Button>
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
            onClick={startEdit}
          />
        )}
      </div>
    </>
  );
};
