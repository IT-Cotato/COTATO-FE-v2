import {useEffect, useMemo, useState} from 'react';
import {useGenerationQuery} from '@/hooks/queries/useGeneration.query';

export const useActiveMembersGeneration = () => {
  const {data: generationList} = useGenerationQuery();

  const generations = useMemo(
    () => generationList?.map((g) => g.generationId) ?? [],
    [generationList]
  );

  /**
   * 기본 선택 기수 & 수정 가능 기수 판별 기준:
   * 1. 오늘 날짜 기준 진행 중인 기수 (startDate <= today <= endDate)
   * 2. 없으면 generationId 가 가장 큰 기수 (백엔드 최신 기수 기준과 동일)
   *
   * ※ 세션 관리의 lastEnded 폴백과 달리, 백엔드는 날짜가 아닌
   *    generationId 최대값을 "최신 기수"로 간주하므로 이에 맞춤
   */
  const defaultGenerationId = useMemo(() => {
    if (!generationList || generationList.length === 0) return null;
    const today = new Date().toLocaleDateString('sv-SE'); // 'YYYY-MM-DD'

    const active = generationList.find(
      (g) => g.startDate <= today && today <= g.endDate
    );
    if (active) return active.generationId;

    // 활동 기수 없으면 generationId 최대값 (= 백엔드 최신 기수)
    return Math.max(...generationList.map((g) => g.generationId));
  }, [generationList]);

  const [selectedGeneration, setSelectedGeneration] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (defaultGenerationId !== null && selectedGeneration === null) {
      setSelectedGeneration(defaultGenerationId);
    }
  }, [defaultGenerationId, selectedGeneration]);

  const handleAddGeneration = (generationId: number) => {
    setSelectedGeneration(generationId);
  };

  return {
    generations,
    selectedGeneration,
    setSelectedGeneration,
    handleAddGeneration,
    defaultGenerationId,
  };
};
