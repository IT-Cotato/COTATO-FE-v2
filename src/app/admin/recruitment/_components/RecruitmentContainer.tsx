'use client';

import {useRecruitmentStore} from '@/store/useRecruitmentStore';
import {AddGeneration} from './add-generation/AddGeneration';
import {ActiveRecruitment} from './active-recruitment/ActiveRecruitment';
import {ManageMail} from './manage-mail/ManageMail';

export const RecruitmentContainer = () => {
  const {generation} = useRecruitmentStore();

  return (
    <div className='flex flex-col gap-6'>
      <AddGeneration />
      <ActiveRecruitment />
      <ManageMail generationId={Number(generation)} />
    </div>
  );
};
