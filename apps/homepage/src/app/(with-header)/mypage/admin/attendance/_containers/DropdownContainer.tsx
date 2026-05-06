'use client';

import {Dropdown} from '@/components/dropdown/Dropdown';
import {useAttendanceIdByGenerationQuery} from '@/hooks/queries/useAdminAttendance.query';
import {useGenerationQuery} from '@/hooks/queries/useGeneration.query';
import {useAdminAttendanceStore} from '@/store/useAdminAttendanceStore';
import {useEffect, useMemo} from 'react';

export const DropdownContainer = () => {
  const {
    selectedGeneration,
    selectedGenerationNumber,
    selectedSession,
    setSelectedGeneration,
    setSelectedSession,
    setAttendanceId,
    setSelectedSessionType,
  } = useAdminAttendanceStore();

  const {data: generationList} = useGenerationQuery();

  const {data: sessionList} = useAttendanceIdByGenerationQuery(
    selectedGenerationNumber ?? 0
  );

  const generations = useMemo(() => {
    if (!generationList) return [];
    return [...generationList]
      .sort((a, b) => b.generationId - a.generationId)
      .map((item) => `${item.generationId}기`);
  }, [generationList]);

  const sessions = useMemo(() => {
    if (!sessionList) return [];
    return [...sessionList]
      .sort((a, b) => a.sessionId - b.sessionId)
      .map((item, idx) => ({
        sessionOption: `${sessionList.length - idx}회차 세션`,
        attendanceId: item.attendanceId,
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
      setAttendanceId(null);
      setSelectedSessionType('FULL');
      return;
    }
    const sessionListIndex =
      parseInt(selectedSession.split('회차 세션')[0]) - 1;
    if (
      Number.isNaN(sessionListIndex) ||
      sessionListIndex < 0 ||
      sessionListIndex >= sessions.length
    ) {
      setAttendanceId(null);
      setSelectedSessionType('FULL');
      return;
    }
    setAttendanceId(sessions[sessionListIndex].attendanceId);
    setSelectedSessionType('SPECIFIC');
  }, [selectedSession, sessions, setAttendanceId, setSelectedSessionType]);

  return (
    <div className='flex gap-5 px-6 lg:px-11.25'>
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
