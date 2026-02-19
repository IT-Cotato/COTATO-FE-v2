'use client';

import {useState} from 'react';
import {NewSessionData, SessionData} from '@/schemas/admin/session.schema';
import {AddSessionButton} from '../_components/AddSessionButton';
import {SessionCard} from '../_components/SessionCard';
import {useAdminSessionsQuery} from '@/hooks/queries/useSession.query';

const NEW_SESSION_TEMPLATE: NewSessionData = {
  date: '',
  title: '',
  generation: '코테이토 13기',
  description: '',
  attendanceStartTime: '',
  placeName: '',
  detailAddress: '',
  location: {latitude: 0, longitude: 0},
  attendTime: {
    attendanceEndTime: '',
    lateEndTime: '',
  },
  isOffline: true,
  isOnline: false,
  content: '',
  images: [],
};

export const SessionsContainer = () => {
  const [expandedCardId, setExpandedCardId] = useState<number | null>(null);
  const [selectedGenerationId] = useState<number | undefined>(undefined);

  const {data: adminSessions = [], isLoading} =
    useAdminSessionsQuery(selectedGenerationId);

  const handleToggle = (sessionId: number) => {
    setExpandedCardId((prev) => (prev === sessionId ? null : sessionId));
  };

  const handleAdd = () => {
    // TODO: POST /v1/api/admin/sessions 연동
    const newId = Date.now();
    setExpandedCardId(newId);
  };

  const handleDelete = (sessionId: number) => {
    // TODO: DELETE /v1/api/admin/sessions/{id} 연동
    setExpandedCardId((prev) => (prev === sessionId ? null : prev));
  };

  const handleUpdate = (updated: SessionData) => {
    // TODO: PATCH /v1/api/admin/sessions/{id} 연동
  };

  if (isLoading) return <div className='py-20 text-center'>로딩 중...</div>;

  return (
    <div className='flex min-h-[500px] flex-col gap-2.5'>
      <AddSessionButton onClick={handleAdd} />
      {adminSessions.length > 0 ? (
        adminSessions.map((adminSession) => (
          <SessionCard
            key={adminSession.sessionId}
            session={adminSession}
            isExpanded={expandedCardId === adminSession.sessionId}
            onToggle={() => handleToggle(adminSession.sessionId)}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))
      ) : (
        <div className='flex flex-1 items-center justify-center text-center text-neutral-400'>
          아직 등록된 세션이 없습니다.
        </div>
      )}
    </div>
  );
};
