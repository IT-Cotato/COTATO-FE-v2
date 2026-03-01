'use client';

import {FullSessionTable} from '@/app/(with-header)/mypage/admin/attendance/_components/table/FullSessionTable';
import {SpecificSessionTable} from '@/app/(with-header)/mypage/admin/attendance/_components/table/SpecificSessionTable';
import {useAdminAttendanceStore} from '@/store/useAdminAttendanceStore';
import {
  useAttendanceFullRecordQuery,
  useAttendanceSpecificRecordQuery,
} from '@/hooks/queries/useAttendance.queries';
import {Spinner} from '@repo/ui/components/spinner/Spinner';
import {useManageAttendanceStatusMutation} from '@/hooks/mutations/useAttendance.mutation';

export const TableContainer = () => {
  const {selectedGenerationNumber, selectedSessionType, attendanceId} =
    useAdminAttendanceStore();

  const {data: fullAttendanceList = [], isLoading: isFullAttendanceLoading} =
    useAttendanceFullRecordQuery(selectedGenerationNumber ?? 0);

  const {
    data: specificAttendanceList = [],
    isLoading: isSpecificAttendanceLoading,
  } = useAttendanceSpecificRecordQuery(attendanceId ?? 0);

  const {
    mutate: updateAttendanceStatus,
    isPending: isUpdatingAttendanceStatus,
  } = useManageAttendanceStatusMutation();

  if (isFullAttendanceLoading || isSpecificAttendanceLoading) {
    console.log('isFullAttendanceLoading:', isFullAttendanceLoading);
    console.log('isSpecificAttendanceLoading:', isSpecificAttendanceLoading);
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
        <FullSessionTable items={fullAttendanceList} />
      ) : (
        <div className='flex gap-5'>
          <SpecificSessionTable
            items={specificAttendanceList.slice(0, half)}
            onChangeAttendanceStatus={(memberId, result) =>
              updateAttendanceStatus({
                attendanceId: attendanceId!,
                memberId,
                result,
              })
            }
            isUpdating={isUpdatingAttendanceStatus}
          />
          <SpecificSessionTable
            items={specificAttendanceList.slice(half)}
            onChangeAttendanceStatus={(memberId, result) =>
              updateAttendanceStatus({
                attendanceId: attendanceId!,
                memberId,
                result,
              })
            }
            isUpdating={isUpdatingAttendanceStatus}
          />
        </div>
      )}
    </>
  );
};
