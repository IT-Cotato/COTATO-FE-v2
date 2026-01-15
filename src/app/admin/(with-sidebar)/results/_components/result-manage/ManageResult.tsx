'use client';

import {RESULT_DATA} from '@/mocks/mock-result';
import {ResultTable} from '@/app/admin/(with-sidebar)/results/_components/result-manage/ResultTable';
import {useRecruitmentStore} from '@/store/useRecruitmentStore';
import {ResultSummaryData} from '@/schemas/admin/admin-result-type';
import {GenerationDropdown} from '@/components/dropdown/GenerationDropdown';

export const ManageResult = () => {
  const generation = useRecruitmentStore((s) => s.generation);
  const setGeneration = useRecruitmentStore((s) => s.setGeneration);

  const currentData = (RESULT_DATA[generation as keyof typeof RESULT_DATA] ||
    []) as ResultSummaryData[];

  return (
    <div className='flex w-full flex-col gap-6'>
      <h2 className='text-h4 text-neutral-800'>합격자 관리</h2>
      <GenerationDropdown
        generation={generation}
        generations={['12', '13']}
        onSelect={setGeneration}
      />
      <ResultTable data={currentData} />
    </div>
  );
};
