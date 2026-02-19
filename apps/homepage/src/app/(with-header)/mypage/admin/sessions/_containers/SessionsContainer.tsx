'use client';

import {useState} from 'react';
import {MOCK_SESSIONS} from '@/constants/admin/mock';
import {NewSessionData, SessionData} from '@/schemas/admin/session.schema';
import {AddSessionButton} from '../_components/AddSessionButton';
import {SessionCard} from '../_components/SessionCard';

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
  const [sessions, setSessions] = useState<SessionData[]>(MOCK_SESSIONS);
  const [expandedCardId, setExpandedCardId] = useState<number | null>(null);

  const handleToggle = (sessionId: number) => {
    setExpandedCardId((prev) => (prev === sessionId ? null : sessionId));
  };

  const handleAdd = () => {
    const newId = Date.now();
    setSessions((prev) => [
      {...NEW_SESSION_TEMPLATE, sessionId: newId},
      ...prev,
    ]);
    setExpandedCardId(newId);
  };

  const handleDelete = (sessionId: number) => {
    setSessions((prev) => prev.filter((s) => s.sessionId !== sessionId));
    setExpandedCardId((prev) => (prev === sessionId ? null : prev));
  };

  const handleUpdate = (updated: SessionData) => {
    setSessions((prev) =>
      prev.map((s) => (s.sessionId === updated.sessionId ? updated : s))
    );
  };

  return (
    <div className='flex flex-col gap-2.5'>
      <AddSessionButton onClick={handleAdd} />
      {sessions.map((session) => (
        <SessionCard
          key={session.sessionId}
          session={session}
          isExpanded={expandedCardId === session.sessionId}
          onToggle={() => handleToggle(session.sessionId)}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
};
