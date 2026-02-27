import {useEffect, useMemo, useState} from 'react';
import {useGenerationQuery} from '@/hooks/queries/useGeneration.query';

export const useActiveMembersGeneration = () => {
  const {data: generationList} = useGenerationQuery();

  const generations = useMemo(
    () => generationList?.map((g) => g.generationId) ?? [],
    [generationList]
  );

  const [selectedGeneration, setSelectedGeneration] = useState<number | null>(null);

  useEffect(() => {
    if (generations.length > 0 && selectedGeneration === null) {
      setSelectedGeneration(generations[0]);
    }
  }, [generations, selectedGeneration]);

  const handleAddGeneration = (generationId: number) => {
    setSelectedGeneration(generationId);
  };

  return {
    generations,
    selectedGeneration,
    setSelectedGeneration,
    handleAddGeneration,
  };
};
