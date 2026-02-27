'use client';

import {Dropdown} from '@/components/dropdown/Dropdown';
import {useGenerationQuery} from '@/hooks/queries/useGeneration.query';
import {useAdminSessionsQuery} from '@/hooks/queries/useSession.query';
import {Spinner} from '@repo/ui/components/spinner/Spinner';
import {useEffect, useMemo, useState} from 'react';

export const DropdownContainer = () => {
  const [selectedGeneration, setSelectedGeneration] = useState<string>('');
  const [selectedSession, setSelectedSession] = useState<string>('전체 세션');

  const {
    data: generationList,
    isLoading: isGenLoading,
    isError: isGenError,
  } = useGenerationQuery();

  const {
    data: sessionList,
    isLoading: isSessionLoading,
    isError: isSessionError,
  } = useAdminSessionsQuery(Number(selectedGeneration.split('기')[0]));

  const generations = useMemo(() => {
    if (!generationList) return [];
    return [...generationList]
      .sort((a, b) => a.generationId - b.generationId)
      .map((item) => `${item.generationId}기`);
  }, [generationList]);

  const sessions = useMemo(() => {
    if (!sessionList) return [];
    return [...sessionList]
      .sort((a, b) => a.sessionNumber - b.sessionNumber)
      .map((item, idx) => ({
        sessionOption: `${idx + 1}회차 세션`,
        sessionId: item.sessionId,
      }));
  }, [sessionList]);

  useEffect(() => {
    if (generations.length > 0) {
      setSelectedGeneration(generations[0]);
    }
  }, [generations]);

  useEffect(() => {
    setSelectedSession('전체 세션');
  }, [sessions]);

  useEffect(() => {
    if (selectedSession === '전체 세션') {
      console.log(
        '/v1/api/admin/attendances/records - 전체 출석 통계 조회 << 호출하기'
      );
    } else if (sessions.length > 0) {
      const sessionListIndex =
        Number(selectedSession.split('회차 세션')[0]) - 1;
      if (sessionListIndex < 0 || sessionListIndex >= sessions.length) return;
      const selectedSessionId = sessions[sessionListIndex].sessionId;
      console.log(
        '/v1/api/admin/attendances/{attendanceId}/records - 세션별 출석 관리 조회 << 호출하기 // 세션 id:',
        selectedSessionId
      );
    }
  }, [selectedSession, sessions]);

  if (isGenLoading || isSessionLoading) {
    return (
      <div
        className='flex min-h-100 items-center justify-center'
        role='status'
        aria-live='polite'
        aria-busy='true'>
        <Spinner />
        <span className='sr-only'>데이터를 불러오는 중입니다.</span>
      </div>
    );
  }

  if (isGenError || isSessionError) {
    return (
      <div
        className='flex min-h-100 items-center justify-center text-neutral-400'
        role='alert'>
        데이터를 불러오는 중 문제가 발생했습니다.
      </div>
    );
  }

  return (
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
  );
};
