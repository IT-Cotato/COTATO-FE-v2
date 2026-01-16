'use client';

import {useAdminPassStatusQuery} from '@/hooks/queries/useAdminResult.query';
import {useRecruitmentStore} from '@/store/useRecruitmentStore';
import {GenerationDropdown} from '@/components/dropdown/GenerationDropdown';
import {Spinner} from '@/components/ui/Spinner';
import {ResultTable} from '@/app/admin/(with-sidebar)/results/_components/result-manage/ResultTable';
import {STATUS_LABEL_MAP} from '@/constants/admin/admin-result';

export const ManageResult = () => {
  const generation = useRecruitmentStore((s) => s.generation);
  const setGeneration = useRecruitmentStore((s) => s.setGeneration);

  const {data, isLoading} = useAdminPassStatusQuery(generation);

  const tableData =
    data?.map((item) => ({
      status: STATUS_LABEL_MAP[item.passStatus],
      ...item.counts,
    })) || [];

  if (isLoading)
    return (
      <div className='flex justify-center'>
        <Spinner />
      </div>
    );

  return (
    <div className='flex w-full flex-col gap-6'>
      <h2 className='text-h4 text-neutral-800'>합격자 관리</h2>
      <GenerationDropdown
        generation={generation}
        generations={['13', '12']}
        onSelect={setGeneration}
      />
      <ResultTable data={tableData} />
    </div>
  );
};
