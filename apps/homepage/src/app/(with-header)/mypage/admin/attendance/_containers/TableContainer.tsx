'use client';

import {FullSessionTable} from '@/app/(with-header)/mypage/admin/attendance/_components/table/FullSessionTable';
import {MOCK_SPECIFIC_SESSION_TABLE} from '@/mocks/admin/mock-admin-attendance';
import {SpecificSessionTable} from '@/app/(with-header)/mypage/admin/attendance/_components/table/SpecificSessionTable';
import {useAdminAttendanceStore} from '@/store/useAdminAttendanceStore';
import {useAttendanceFullRecordQuery} from '@/hooks/queries/useAttendance.queries';
import {Spinner} from '@repo/ui/components/spinner/Spinner';

export const TableContainer = () => {
  const {selectedGenerationNumber, selectedSessionType} =
    useAdminAttendanceStore();

  const {data: fullAttendanceList, isLoading: isFullAttendanceLoading} =
    useAttendanceFullRecordQuery(selectedGenerationNumber ?? 0);

  const half = Math.ceil(MOCK_SPECIFIC_SESSION_TABLE.length / 2);

  if (!fullAttendanceList || isFullAttendanceLoading) {
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

  return (
    <>
      {selectedSessionType === 'FULL' ? (
        <FullSessionTable items={fullAttendanceList} />
      ) : (
        <div className='flex gap-5'>
          <SpecificSessionTable
            items={MOCK_SPECIFIC_SESSION_TABLE.slice(0, half)}
          />
          <SpecificSessionTable
            items={MOCK_SPECIFIC_SESSION_TABLE.slice(half)}
          />
        </div>
      )}
    </>
  );
};
