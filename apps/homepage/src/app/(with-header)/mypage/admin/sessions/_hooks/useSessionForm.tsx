import {AdminSession, SessionData} from '@/schemas/admin/admin-sessions.schema';
import {useEffect, useMemo, useState} from 'react';
import {formatDate} from '@repo/ui/utils/date';
import {useSessionDetailQuery} from '@/hooks/queries/useSession.query';

export const useSessionForm = (session: AdminSession, isExpanded: boolean) => {
  const [isEditing, setIsEditing] = useState(false);

  const {data: sessionDetail} = useSessionDetailQuery(
    session.sessionId,
    isExpanded || isEditing
  );

  const fallbackSessionData: SessionData = useMemo(
    () => ({
      sessionId: session.sessionId,
      title: session.title,
      description: session.description,
      content: session.content,
      placeName: session.placeName,
      date: session.sessionDateTime
        ? session.sessionDateTime.split('T')[0]
        : (formatDate(new Date()) ?? ''),
      generation: session.generationId
        ? `코테이토 ${session.generationId}기`
        : '',
      attendanceStartTime: session.sessionDateTime
        ? session.sessionDateTime.split('T')[1]?.slice(0, 5)
        : '',
      images: session.imageInfos || [],
      detailAddress: '',
      location: {latitude: 0, longitude: 0},
      attendTime: {
        attendanceEndTime: '',
        lateEndTime: '',
      },
      isOffline: true,
      isOnline: false,
    }),
    [session]
  );

  const activeSessionData = sessionDetail ?? fallbackSessionData;
  const [form, setForm] = useState<SessionData>(activeSessionData);

  useEffect(() => {
    if (sessionDetail && !isEditing) {
      setForm(sessionDetail);
    }
  }, [sessionDetail, isEditing]);

  useEffect(() => {
    if (session.sessionId === -1) {
      setIsEditing(true);
    } else if (!isExpanded && !isEditing) {
      setForm(activeSessionData);
    } else if (!isExpanded && isEditing) {
      setIsEditing(false);
      setForm(activeSessionData);
    }
    // isEditing은 의도적으로 제외 - 수정 중에 isExpanded 변화로 form이 리셋되는 것을 방지
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded, session.sessionId, activeSessionData]);

  return {isEditing, setIsEditing, form, setForm, activeSessionData};
};
