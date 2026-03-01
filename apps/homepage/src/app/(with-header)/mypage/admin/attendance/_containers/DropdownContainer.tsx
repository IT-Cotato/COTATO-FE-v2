'use client';

import {Dropdown} from '@/components/dropdown/Dropdown';
import {useGenerationQuery} from '@/hooks/queries/useGeneration.query';
import {useAdminSessionsQuery} from '@/hooks/queries/useSession.query';
import {useRouter, useSearchParams} from 'next/navigation';
import {useEffect, useMemo, useRef, useState} from 'react';

export const DropdownContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParamsRef = useRef(searchParams);

  const [selectedGeneration, setSelectedGeneration] = useState<string>('');
  const [selectedSession, setSelectedSession] = useState<string>('전체 세션');

  const {data: generationList} = useGenerationQuery();

  const {data: sessionList} = useAdminSessionsQuery(
    Number(selectedGeneration.split('기')[0])
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
    if (sessions.length <= 0) return;
    if (selectedSession === '전체 세션') {
      const params = new URLSearchParams(searchParamsRef.current.toString());
      params.delete('attendanceId');
      router.push(`?${params.toString()}`, {scroll: false});
      // todo : /v1/api/admin/attendances/records - 전체 출석 통계 조회 << 호출하기
    } else {
      const sessionListIndex =
        Number(selectedSession.split('회차 세션')[0]) - 1;
      if (sessionListIndex < 0 || sessionListIndex >= sessions.length) return;
      const selectedSessionAttendanceId = sessions[sessionListIndex].sessionId;
      const params = new URLSearchParams(searchParamsRef.current.toString());
      params.set('attendanceId', String(selectedSessionAttendanceId));
      router.push(`?${params.toString()}`, {scroll: false});
      // todo : /v1/api/admin/attendances/{attendanceId}/records - 세션별 출석 관리 조회 << 호출하기 // attendanceId: selectedSessionAttendanceId
    }
  }, [router, selectedSession, sessions]);

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
