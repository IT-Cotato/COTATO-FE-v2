'use client';

import {useAdminPassStatusQuery} from '@/hooks/queries/useAdminResult.query';
import {ResultTable} from '@/app/admin/results/_components/result-manage/ResultTable';
import {GenerationDropdown} from '@/components/dropdown/GenerationDropdown';
import {Spinner} from '@/components/ui/Spinner';
import {STATUS_LABEL_MAP} from '@/constants/admin/admin-result';
import {useState} from 'react';

export const ManageResult = () => {
  const [generation, setGeneration] = useState('13');
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
