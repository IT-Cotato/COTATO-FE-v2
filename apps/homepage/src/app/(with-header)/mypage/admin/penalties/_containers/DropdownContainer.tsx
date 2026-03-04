'use client';

import {Dropdown} from '@/components/dropdown/Dropdown';
import {useAttendanceIdByGenerationQuery} from '@/hooks/queries/useAttendance.queries';
import {useGenerationQuery} from '@/hooks/queries/useGeneration.query';
import {useAdminPenaltiesStore} from '@/store/useAdminPenaltiesStore';
import {useEffect, useMemo, useState} from 'react';
import {SearchBar} from '@/app/(with-header)/mypage/admin/_components/SearchBar';
import {useRouter, useSearchParams} from 'next/navigation';

export const DropdownContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [keyword, setKeyword] = useState<string>(
    searchParams.get('keyword') ?? ''
  );

  const {
    selectedGeneration,
    selectedGenerationNumber,
    selectedSession,
    setSelectedGeneration,
    setSelectedSession,
    setSesssionId,
    setSelectedSessionType,
  } = useAdminPenaltiesStore();

  const {data: generationList} = useGenerationQuery();

  const {data: sessionList} = useAttendanceIdByGenerationQuery(
    selectedGenerationNumber ?? 0
  );

  const generations = useMemo(() => {
    if (!generationList) return [];
    return [...generationList]
      .sort((a, b) => a.generationId - b.generationId)
      .map((item) => `${item.generationId}기`);
  }, [generationList]);

  const sessions = useMemo(() => {
    if (!sessionList) return [];
    return [...sessionList]
      .sort((a, b) => a.sessionId - b.sessionId)
      .map((item, idx) => ({
        sessionOption: `${idx + 1}회차 세션`,
        sessionId: item.sessionId,
      }));
  }, [sessionList]);

  useEffect(() => {
    if (
      generations.length > 0 &&
      (selectedGeneration === '기수' ||
        !generations.includes(selectedGeneration))
    ) {
      setSelectedGeneration(generations[0]);
    }
  }, [generations, selectedGeneration, setSelectedGeneration]);

  useEffect(() => {
    if (
      selectedSession === '세션' ||
      (selectedSession !== '전체 세션' &&
        !['전체 세션', ...sessions.map((s) => s.sessionOption)].includes(
          selectedSession
        ))
    ) {
      setSelectedSession('전체 세션');
    }
  }, [sessions, selectedSession, setSelectedSession]);

  useEffect(() => {
    if (sessions.length <= 0 || selectedSession === '전체 세션') {
      setSesssionId(null);
      setSelectedSessionType('FULL');
      return;
    }
    const sessionListIndex =
      parseInt(selectedSession.split('회차 세션')[0]) - 1;
    if (sessionListIndex < 0 || sessionListIndex >= sessions.length) {
      setSesssionId(null);
      setSelectedSessionType('FULL');
      return;
    }
    setSesssionId(sessions[sessionListIndex].sessionId);
    setSelectedSessionType('SPECIFIC');
  }, [selectedSession, sessions, setSesssionId, setSelectedSessionType]);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (keyword.trim()) {
      params.set('keyword', keyword);
    } else {
      params.delete('keyword');
    }
    router.push(`?${params.toString()}`, {scroll: false});
  };

  return (
    <div className='flex justify-between'>
      <div className='flex gap-5'>
        <Dropdown
          placeholder='기수'
          value={selectedGeneration}
          options={generations}
          onSelect={(value) => setSelectedGeneration(value)}
          isShadow={true}
          className='w-fit'
        />
        <Dropdown
          placeholder='세션'
          value={selectedSession}
          options={['전체 세션', ...sessions.map((item) => item.sessionOption)]}
          onSelect={(value) => setSelectedSession(value)}
          isShadow={true}
          className='w-fit'
        />
      </div>

      <SearchBar
        onSearch={handleSearch}
        keyword={keyword}
        onKeywordChange={setKeyword}
      />
    </div>
  );
};
