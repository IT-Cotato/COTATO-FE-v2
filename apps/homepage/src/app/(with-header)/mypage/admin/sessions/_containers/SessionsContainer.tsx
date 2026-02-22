'use client';

import {useState} from 'react';
import {SessionData} from '@/schemas/admin/session.schema';
import {AddSessionButton} from '../_components/AddSessionButton';
import {SessionCard} from '../_components/SessionCard';
import {useAdminSessionsQuery} from '@/hooks/queries/useSession.query';
import {useGenerationQuery} from '@/hooks/queries/useGeneration.query';
import {
  useCreateSession,
  useUpdateSession,
} from '@/hooks/mutations/useSession.mutation';
import {AdminSession} from '@/schemas/admin/session.schema';
import {formatDateTimeToIso} from '@repo/ui/utils/date';

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
  const currentGeneration = generations?.[0]; // 기본으로 가장 최신/첫번째 기수 사용
  const [selectedGenerationId, setSelectedGenerationId] = useState<
    number | undefined
  >(undefined);

  const {data: adminSessions = [], isLoading} =
    useAdminSessionsQuery(selectedGenerationId);

  // 현재 보여지는 세션들이 소속된 기수(generationId)를 최우선으로 추론, 없으면 전체 기수 목록 중 첫번째 기수 사용
  const fallbackGenerationId =
    adminSessions.length > 0 ? adminSessions[0].generationId : undefined;
  const activeGenerationId =
    selectedGenerationId ??
    fallbackGenerationId ??
    currentGeneration?.generationId ??
    12;

  const {mutate: createSession} = useCreateSession();
  const {mutate: updateSession} = useUpdateSession();

  const handleToggle = (sessionId: number) => {
    setExpandedCardId((prev) => (prev === sessionId ? null : sessionId));
  };

  const handleAdd = () => {
    if (isAddingMode) return;
    setIsAddingMode(true);
    setExpandedCardId(-1); // 새로운 세션 카드 열기
  };

  const handleDelete = (sessionId: number) => {
    if (sessionId === -1) {
      setIsAddingMode(false);
    }
    setExpandedCardId((prev) => (prev === sessionId ? null : prev));
  };

  const handleUpdate = (updated: SessionData): boolean => {
    if (!updated.title.trim()) {
      alert('세션 제목을 입력해주세요.');
      return false;
    }
    if (!updated.attendanceStartTime.trim()) {
      alert('출석 인정 시작 시간을 입력해주세요. (예: 18:00)');
      return false;
    }
    if (!updated.attendTime?.attendanceEndTime?.trim()) {
      alert('출석 인정 종료 시간을 입력해주세요. (예: 19:00)');
      return false;
    }
    if (!updated.attendTime?.lateEndTime?.trim()) {
      alert('지각 인정 종료 시간을 입력해주세요. (예: 19:20)');
      return false;
    }
    if (updated.isOffline && !updated.placeName?.trim()) {
      alert('대면 세션은 세션 장소를 입력해주세요.');
      return false;
    }

    if (updated.sessionId === -1) {
      // 새로운 세션 생성

      const requestPayload: any = {
        generationId: activeGenerationId,
        title: updated.title,
        description: updated.description,
        attendanceStartTime: formatDateTimeToIso(
          updated.date,
          updated.attendanceStartTime
        ),
        attendanceEndTime: formatDateTimeToIso(
          updated.date,
          updated.attendTime.attendanceEndTime
        ),
        lateEndTime: formatDateTimeToIso(
          updated.date,
          updated.attendTime.lateEndTime
        ),
        isOffline: updated.isOffline,
        isOnline: updated.isOnline,
        content: updated.content,
      };

      if (updated.placeName) requestPayload.placeName = updated.placeName;
      if (updated.detailAddress)
        requestPayload.roadNameAddress = updated.detailAddress;
      if (updated.location?.latitude != null)
        requestPayload.latitude = updated.location.latitude;
      if (updated.location?.longitude != null)
        requestPayload.longitude = updated.location.longitude;
      if (updated.images && updated.images.length > 0) {
        requestPayload.imageInfos = updated.images.map((img) => ({
          s3Key: img.imageUrl,
          order: img.order,
        }));
      }

      createSession(requestPayload, {
        onSuccess: () => {
          setIsAddingMode(false);
          setExpandedCardId(null);
        },
        onError: () => {
          setIsAddingMode(false);
          setExpandedCardId(null);
        },
      });
      return true;
    } else {
      // 기존 세션 수정
      const updatePayload: any = {
        sessionId: updated.sessionId,
        title: updated.title,
        description: updated.description,
        attendanceStartTime: formatDateTimeToIso(
          updated.date,
          updated.attendanceStartTime
        ),
        isOffline: updated.isOffline,
        isOnline: updated.isOnline,
        content: updated.content,
      };

      if (
        updated.attendTime?.attendanceEndTime ||
        updated.attendTime?.lateEndTime
      ) {
        updatePayload.attendTime = {};
        if (updated.attendTime.attendanceEndTime)
          updatePayload.attendTime.attendanceEndTime = formatDateTimeToIso(
            updated.date,
            updated.attendTime.attendanceEndTime
          );
        if (updated.attendTime.lateEndTime)
          updatePayload.attendTime.lateEndTime = formatDateTimeToIso(
            updated.date,
            updated.attendTime.lateEndTime
          );
      }

      if (
        updated.location &&
        (updated.location.latitude != null ||
          updated.location.longitude != null)
      ) {
        updatePayload.location = {
          latitude: updated.location?.latitude ?? 0,
          longitude: updated.location?.longitude ?? 0,
        };
      }
      if (updated.placeName) updatePayload.placeName = updated.placeName;
      if (updated.detailAddress)
        updatePayload.roadNameAddress = updated.detailAddress;

      updateSession(updatePayload, {
        onSuccess: () => {
          setExpandedCardId(null);
        },
      });
      return true;
    }
  };

  if (isLoading) return <div className='py-20 text-center'>로딩 중...</div>;

  const sortedSessions = [...adminSessions].reverse();

  const displaySessions = isAddingMode
    ? [NEW_SESSION_TEMPLATE, ...sortedSessions]
    : sortedSessions;

  return (
    <div className='flex min-h-[500px] flex-col gap-2.5'>
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
