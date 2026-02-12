import {SessionCard} from './SessionCard';
import {SessionAttendance} from '@/schemas/mypage-mem/attendance/attendance.schema';

interface SessionListProps {
  sessions: SessionAttendance[];
  generationId: number;
  expandedSessionId: number | null;
  onToggle: (sessionId: number) => void;
  onAttendance: (session: SessionAttendance) => void;
}

export const SessionList = ({
  sessions,
  generationId,
  expandedSessionId,
  onToggle,
  onAttendance,
}: SessionListProps) => {
  if (sessions.length === 0) {
    return (
      <div className='text-body-m py-30 text-center text-neutral-400'>
        세션 정보가 없습니다.
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-2.5'>
      {sessions.map((session) => (
        <SessionCard
          key={session.sessionId}
          session={session}
          generationId={generationId}
          isExpanded={expandedSessionId === session.sessionId}
          onToggle={() => onToggle(session.sessionId)}
          onAttendance={() => onAttendance(session)}
        />
      ))}
    </div>
  );
};
