'use client';

import {useAdminPassStatusQuery} from '@/hooks/queries/useAdminResult.query';
import {ResultTable} from '@/app/admin/results/_components/result-manage/ResultTable';
import {GenerationDropdown} from '@/components/dropdown/GenerationDropdown';
import {Spinner} from '@/components/ui/Spinner';
import {STATUS_LABEL_MAP} from '@/constants/admin/admin-result';
import {useGenerationStore} from '@/store/useGenerationStore';

interface ManageResultProps {
  generation: string;
  onGenerationChange: (gen: string) => void;
}

export const ManageResult = ({
  generation,
  onGenerationChange,
}: ManageResultProps) => {
  const {data, isLoading} = useAdminPassStatusQuery(generation);
  const {generations} = useGenerationStore();
  const generationList = generations.map((g) => String(g.generationId));

  const tableData =
    data?.map((item) => ({
      status: STATUS_LABEL_MAP[item.passStatus],
      ...item.counts,
    })) || [];

  if (isLoading)
    return (
      <div className='flex justify-center py-10'>
        <Spinner />
      </div>
    );

  return (
    <div className='flex w-full flex-col gap-6'>
      <h2 className='text-h4 text-neutral-800'>합격자 관리</h2>
      <GenerationDropdown
        generation={generation}
        generations={generationList}
        onSelect={onGenerationChange}
      />
      <ResultTable data={tableData} />
    </div>
  );
};
