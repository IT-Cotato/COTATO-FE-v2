'use client';

import {Dropdown} from '@/components/dropdown/Dropdown';
import {useAttendanceIdByGenerationQuery} from '@/hooks/queries/useAttendance.queries';
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
      .sort((a, b) => a.generationId - b.generationId)
      .map((item) => `${item.generationId}기`);
  }, [generationList]);

  const sessions = useMemo(() => {
    if (!sessionList) return [];
    return [...sessionList]
      .sort((a, b) => a.sessionId - b.sessionId)
      .map((item, idx) => ({
        sessionOption: `${idx + 1}회차 세션`,
        attendanceId: item.attendanceId,
      }));
  }, [sessionList]);

  useEffect(() => {
    if (generations.length > 0) {
      setSelectedGeneration(generations[0]);
    }
  }, [generations, setSelectedGeneration]);

  useEffect(() => {
    setSelectedSession('전체 세션');
  }, [sessions, setSelectedSession]);

  useEffect(() => {
    if (sessions.length <= 0 || selectedSession === '전체 세션') {
      setAttendanceId(null);
      setSelectedSessionType('FULL');
      // todo : /v1/api/admin/attendances/records - 전체 출석 통계 조회 << 호출하기
      return;
    }
    const sessionListIndex =
      parseInt(selectedSession.split('회차 세션')[0]) - 1;
    if (sessionListIndex < 0 || sessionListIndex >= sessions.length) {
      setAttendanceId(null);
      setSelectedSessionType('FULL');
      // todo : /v1/api/admin/attendances/records - 전체 출석 통계 조회 << 호출하기
      return;
    }
    setAttendanceId(sessions[sessionListIndex].attendanceId);
    setSelectedSessionType('SPECIFIC');
    // todo : /v1/api/admin/attendances/{attendanceId}/records - 세션별 출석 관리 조회 << 호출하기 // attendanceId: selectedSessionAttendanceId
  }, [selectedSession, sessions, setAttendanceId, setSelectedSessionType]);

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
