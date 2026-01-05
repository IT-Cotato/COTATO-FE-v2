'use client';
import {useState} from 'react';
import {RESULT_DATA} from '@/mocks/mock-result';
import {ResultTable} from '@/app/admin/(with-sidebar)/results/_components/result-manage/ResultTable';
import {ResultSummaryData} from '@/schemas/admin/admin-result-type';
import {GenerationDropdown} from '@/components/dropdown/GenerationDropdown';

export const ManageResult = () => {
  const terms = Object.keys(RESULT_DATA).sort((a, b) => Number(b) - Number(a));
  const [selectedTerm, setSelectedTerm] = useState<string>(terms[0] || '13');

  const currentData = (RESULT_DATA[selectedTerm as keyof typeof RESULT_DATA] ||
    []) as ResultSummaryData[];

  return (
    <div className='flex w-full flex-col gap-6'>
      <h2 className='text-h4 text-neutral-800'>합격자 관리</h2>
      <GenerationDropdown
        generation={selectedTerm}
        onSelect={setSelectedTerm}
        generations={terms}
      />
      <ResultTable data={currentData} />
    </div>
  );
};
