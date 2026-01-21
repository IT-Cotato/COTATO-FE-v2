'use client';

import {useState} from 'react';
import {ManageResult} from './result-manage/ManageResult';
import {ManageResultMail} from './mail-manage/ManageResultMail';
import {useGenerationStore} from '@/store/useGenerationStore';
import {Spinner} from '@/components/ui/Spinner';

export const ResultsContainer = () => {
  const {generations} = useGenerationStore();
  const [selectedGen, setSelectedGen] = useState<string | null>(null);

  const currentGeneration =
    selectedGen ||
    (generations.length > 0 ? String(generations[0].generationId) : '');

  if (generations.length === 0) {
    return (
      <div className='flex h-100 w-full items-center justify-center'>
        <Spinner size='lg' />
      </div>
    );
  }
  return (
    <div className='flex flex-col gap-13.5'>
      <ManageResult
        generation={currentGeneration}
        onGenerationChange={setSelectedGen}
      />
      <ManageResultMail generationId={Number(currentGeneration)} />
    </div>
  );
};
