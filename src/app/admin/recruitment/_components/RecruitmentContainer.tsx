'use client';

import {useRecruitmentStore} from '@/store/useRecruitmentStore';
import {AddGeneration} from './add-generation/AddGeneration';
import {ActiveRecruitment} from './active-recruitment/ActiveRecruitment';
import {ManageMail} from './manage-mail/ManageMail';

export const RecruitmentContainer = () => {
  const {generation} = useRecruitmentStore();
  const generationId = Number(generation);
  const isValidGeneration = Number.isFinite(generationId) && generationId > 0;
  return (
    <div className='flex flex-col gap-6'>
      <AddGeneration />
      <ActiveRecruitment />
      {isValidGeneration && <ManageMail generationId={generationId} />}
    </div>
  );
};
