'use client';

import {useRecruitmentStore} from '@/store/useRecruitmentStore';
import {AddGeneration} from './add-generation/AddGeneration';
import {ActiveRecruitment} from './active-recruitment/ActiveRecruitment';
import {ManageMail} from './manage-mail/ManageMail';
import {useRecruitmentStatusQuery} from '@/hooks/queries/useRecruitmentStatus.query';
import {Spinner} from '@/components/ui/Spinner';

export const RecruitmentContainer = () => {
  const {isLoading} = useRecruitmentStatusQuery();
  const {generation} = useRecruitmentStore();

  if (isLoading)
    return (
      <div className='flex w-full justify-center'>
        <Spinner size='lg' />
      </div>
    );

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
