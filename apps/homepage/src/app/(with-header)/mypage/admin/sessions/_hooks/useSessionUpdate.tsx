import {
  CreateSessionRequest,
  SessionData,
  UpdateSessionRequest,
} from '@/schemas/admin/admin-sessions.schema';
import {
  useCreateSession,
  useUpdateSession,
} from '@/hooks/mutations/useSession.mutation';
import {formatDateTimeToIso} from '@repo/ui/utils/date';

interface UseSessionUpdateParams {
  activeGenerationId: number | undefined;
  setIsAddingMode: (v: boolean) => void;
  setExpandedCardId: (v: number | null) => void;
}

export const useSessionUpdate = ({
  activeGenerationId,
  setIsAddingMode,
  setExpandedCardId,
}: UseSessionUpdateParams) => {
  const {mutateAsync: createSession} = useCreateSession();
  const {mutateAsync: updateSession} = useUpdateSession();

  const handleUpdate = async (updated: SessionData): Promise<boolean> => {
    const {
      title,
      attendanceStartTime: startTime,
      attendTime,
      isOffline,
      placeName,
    } = updated;
    const {attendanceEndTime: endTime, lateEndTime: lateTime} = attendTime;

    if (!title.trim()) {
      alert('세션 제목을 입력해주세요.');
      return false;
    }
    if (!startTime.trim()) {
      alert('출석 인정 시작 시간을 입력해주세요. (예: 18:00)');
      return false;
    }
    if (!endTime?.trim()) {
      alert('출석 인정 종료 시간을 입력해주세요. (예: 19:00)');
      return false;
    }
    if (!lateTime?.trim()) {
      alert('지각 인정 종료 시간을 입력해주세요. (예: 19:20)');
      return false;
    }
    if (isOffline && !placeName?.trim()) {
      alert('대면 세션은 세션 장소를 입력해주세요.');
      return false;
    }
    const TIME_REGEX = /^\d{2}:\d{2}$/;
    if (
      !TIME_REGEX.test(startTime) ||
      !TIME_REGEX.test(endTime) ||
      !TIME_REGEX.test(lateTime)
    ) {
      alert('시간은 HH:MM 형식으로 입력해주세요. (예: 18:00)');
      return false;
    }

    const toMinutes = (t: string) => {
      const [h = '0', m = '0'] = t.split(':');
      return parseInt(h, 10) * 60 + parseInt(m, 10);
    };

    if (toMinutes(startTime) >= toMinutes(endTime)) {
      alert('출석 인정 시작 시간은 종료 시간보다 이전이어야 합니다.');
      return false;
    }
    if (toMinutes(endTime) >= toMinutes(lateTime)) {
      alert('지각 인정 종료 시간은 출석 인정 종료 시간보다 이후여야 합니다.');
      return false;
    }

    if (updated.sessionId === -1) {
      // 새로운 세션 생성
      if (!activeGenerationId) return false;
      const requestPayload: CreateSessionRequest = {
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
        requestPayload.imageInfos = updated.images
          .filter((img) => img.s3Key && !img.s3Key.startsWith('blob:'))
          .map((img) => ({
            s3Key: img.s3Key!,
            order: img.order,
          }));
      }

      try {
        await createSession(requestPayload);
        setIsAddingMode(false);
        setExpandedCardId(null);
        return true;
      } catch {
        return false;
      }
    } else {
      // 기존 세션 수정
      const updatePayload: UpdateSessionRequest = {
        sessionId: updated.sessionId,
        title: updated.title,
        description: updated.description,
        attendanceStartTime: formatDateTimeToIso(
          updated.date,
          updated.attendanceStartTime
        ),
        attendTime: {
          attendanceEndTime: formatDateTimeToIso(
            updated.date,
            updated.attendTime.attendanceEndTime
          ),
          lateEndTime: formatDateTimeToIso(
            updated.date,
            updated.attendTime.lateEndTime
          ),
        },
        isOffline: updated.isOffline,
        isOnline: updated.isOnline,
        content: updated.content,
      };

      if (
        updated.location &&
        updated.location.latitude !== 0 &&
        updated.location.longitude !== 0
      ) {
        updatePayload.location = {
          latitude: updated.location.latitude,
          longitude: updated.location.longitude,
        };
      }
      if (updated.placeName) updatePayload.placeName = updated.placeName;
      if (updated.detailAddress)
        updatePayload.roadNameAddress = updated.detailAddress;

      try {
        await updateSession(updatePayload);
        setExpandedCardId(null);
        return true;
      } catch {
        return false;
      }
    }
  };

  return {handleUpdate};
};
