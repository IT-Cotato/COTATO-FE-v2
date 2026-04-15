'use client';

import {useRecruitmentStore} from '@/store/useRecruitmentStore';
import {AddGeneration} from './add-generation/AddGeneration';
import {ActiveRecruitment} from './active-recruitment/ActiveRecruitment';
import {ManageMail} from './manage-mail/ManageMail';
import {useRecruitmentStatusQuery} from '@/hooks/queries/useRecruitmentStatus.query';
import {Spinner} from '@repo/ui/components/spinner/Spinner';
import {useAdminGenerationsQuery} from '@/hooks/queries/useAdminGeneration.query';

export const RecruitmentContainer = () => {
  const {isLoading: isStatusLoading} = useRecruitmentStatusQuery();
  const {isLoading: isGenerationsLoading} = useAdminGenerationsQuery();
  const {generation} = useRecruitmentStore();

  if (isStatusLoading || isGenerationsLoading)
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <Spinner size='lg' />
      </div>
    );

  const generationId = Number(generation);
  const isValidGeneration = Number.isFinite(generationId) && generationId > 0;

  return (
    <div className='flex w-full flex-col items-center justify-center gap-5 pt-5 lg:gap-3.5 lg:p-12.5'>
      <AddGeneration />
      <ActiveRecruitment />
      {isValidGeneration && <ManageMail generationId={generationId} />}
    </div>
  );
};
