'use client';

import {useState} from 'react';
import {AddSessionButton} from '../_components/AddSessionButton';
import {SessionCard} from '../_components/SessionCard';
import {useAdminSessionsQuery} from '@/hooks/queries/useSession.query';
import {useGenerationQuery} from '@/hooks/queries/useGeneration.query';
import {AdminSession} from '@/schemas/admin/session.schema';
import {useSessionUpdate} from '@/app/(with-header)/mypage/admin/sessions/_hooks/useSessionUpdate';
import {useDeleteSession} from '@/hooks/mutations/useSession.mutation';

const NEW_SESSION_TEMPLATE: AdminSession = {
  sessionId: -1, // 임시 ID
  sessionNumber: 0,
  title: '',
  description: '',
  generationId: 0,
  placeName: '',
  sessionDateTime: '',
  content: '',
  imageInfos: [],
};

export const SessionsContainer = () => {
  const [isAddingMode, setIsAddingMode] = useState(false);
  const [expandedCardId, setExpandedCardId] = useState<number | null>(null);

  const {data: generations} = useGenerationQuery();
  const currentGeneration = generations?.[0];
  const activeGenerationId = currentGeneration?.generationId ?? 12; // 기수 관리 api 연동 pr 머지 전까지는 12기 고정

  const {data: adminSessions = [], isLoading} =
    useAdminSessionsQuery(activeGenerationId);

  const {handleUpdate} = useSessionUpdate({
    activeGenerationId,
    setIsAddingMode,
    setExpandedCardId,
  });

  const handleToggle = (sessionId: number) => {
    setExpandedCardId((prev) => (prev === sessionId ? null : sessionId));
  };

  const handleAdd = () => {
    if (isAddingMode) return;
    setIsAddingMode(true);
    setExpandedCardId(-1); // 새로운 세션 카드 열기
  };

  const {mutate: deleteSession} = useDeleteSession();

  const handleDelete = (sessionId: number) => {
    if (sessionId === -1) {
      setIsAddingMode(false);
    } else {
      deleteSession(sessionId);
    }
    setExpandedCardId((prev) => (prev === sessionId ? null : prev));
  };

  if (isLoading) return <div className='py-20 text-center'>로딩 중...</div>;

  const sortedSessions = [...adminSessions].reverse();

  const displaySessions = isAddingMode
    ? [NEW_SESSION_TEMPLATE, ...sortedSessions]
    : sortedSessions;

  return (
    <div className='flex min-h-125 flex-col gap-2.5'>
      {!isAddingMode && <AddSessionButton onClick={handleAdd} />}
      {displaySessions.length > 0 ? (
        displaySessions.map((adminSession) => (
          <SessionCard
            key={adminSession.sessionId === -1 ? 'new' : adminSession.sessionId}
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
