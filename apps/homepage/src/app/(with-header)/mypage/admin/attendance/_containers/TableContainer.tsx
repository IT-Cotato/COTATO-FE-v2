'use client';

import {useAdminAttendanceStore} from '@/store/useAdminAttendanceStore';
import {Spinner} from '@repo/ui/components/spinner/Spinner';
import {useSearchParams} from 'next/navigation';
import {AttendancePartType} from '@/schemas/admin/admin-attendance.schema';
import {AdminAttendanceEntireTable} from '@/app/(with-header)/mypage/admin/attendance/_components/table/AdminAttendanceEntireTable';
import {AdminAttendanceSpecificTable} from '@/app/(with-header)/mypage/admin/attendance/_components/table/AdminAttendanceSpecificTable';
import {AttendanceStatusKey} from '@/constants/admin/admin-attendance';
import {
  useAttendanceFullRecordQuery,
  useAttendanceSpecificRecordQuery,
} from '@/hooks/queries/useAdminAttendance.query';
import {useManageAttendanceStatusMutation} from '@/hooks/mutations/useAdminAttendance.mutation';

export const TableContainer = () => {
  const searchParams = useSearchParams();
  const activePart = (searchParams.get('part') as AttendancePartType) ?? 'ALL';
  const search = searchParams.get('keyword') ?? undefined;
  const attendanceResults = searchParams.getAll(
    'status'
  ) as AttendanceStatusKey[];

  const {selectedGenerationNumber, selectedSessionType, attendanceId} =
    useAdminAttendanceStore();

  const shouldFetchFull =
    selectedSessionType === 'FULL' && !!selectedGenerationNumber;
  const shouldFetchSpecific =
    selectedSessionType === 'SPECIFIC' && !!attendanceId;

  const {data: fullAttendanceList = [], isLoading: isFullAttendanceLoading} =
    useAttendanceFullRecordQuery(
      shouldFetchFull ? (selectedGenerationNumber ?? 0) : 0,
      activePart === 'ALL' ? undefined : activePart,
      search
    );

  const {
    data: specificAttendanceList = [],
    isLoading: isSpecificAttendanceLoading,
  } = useAttendanceSpecificRecordQuery(
    shouldFetchSpecific ? (attendanceId ?? 0) : 0,
    activePart === 'ALL' ? undefined : activePart,
    attendanceResults,
    search
  );

  const {
    mutate: updateAttendanceStatus,
    isPending: isUpdatingAttendanceStatus,
  } = useManageAttendanceStatusMutation();

  const handleChangeAttendanceStatus = (
    memberId: number,
    result: AttendanceStatusKey
  ) => {
    if (!attendanceId) return;
    updateAttendanceStatus({
      attendanceId,
      memberId,
      result,
    });
  };

  const isLoading =
    (selectedSessionType === 'FULL' && isFullAttendanceLoading) ||
    (selectedSessionType === 'SPECIFIC' && isSpecificAttendanceLoading);

  if (isLoading) {
    return (
      <div
        className='flex min-h-100 items-center justify-center'
        role='status'
        aria-live='polite'
        aria-busy='true'>
        <Spinner />
        <span className='sr-only'>데이터를 불러오는 중입니다.</span>
      </div>
    );
  }

  const half = Math.ceil(specificAttendanceList.length / 2);

  return (
    <>
      {selectedSessionType === 'FULL' ? (
        <AdminAttendanceEntireTable items={fullAttendanceList} />
      ) : (
        <div className='flex gap-5'>
          <AdminAttendanceSpecificTable
            items={specificAttendanceList.slice(0, half)}
            onChangeAttendanceStatus={handleChangeAttendanceStatus}
            isUpdating={isUpdatingAttendanceStatus}
          />
          <AdminAttendanceSpecificTable
            items={specificAttendanceList.slice(half)}
            onChangeAttendanceStatus={handleChangeAttendanceStatus}
            isUpdating={isUpdatingAttendanceStatus}
          />
        </div>
      )}
    </>
  );
};
