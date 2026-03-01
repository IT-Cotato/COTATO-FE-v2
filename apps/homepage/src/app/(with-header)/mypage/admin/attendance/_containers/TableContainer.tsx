'use client';

import {FullSessionTable} from '@/app/(with-header)/mypage/admin/attendance/_components/table/FullSessionTable';
import {
  MOCK_FULL_SESSION_TABLE,
  MOCK_SPECIFIC_SESSION_TABLE,
} from '@/mocks/admin/mock-admin-attendance';
import {SpecificSessionTable} from '@/app/(with-header)/mypage/admin/attendance/_components/table/SpecificSessionTable';
import {useAdminAttendanceStore} from '@/store/useAdminAttendanceStore';
import {useAttendanceFullRecordQuery} from '@/hooks/queries/useAttendance.queries';

export const TableContainer = () => {
  const {selectedSessionType} = useAdminAttendanceStore();

  // const {data: fullAttendanceList} = useAttendanceFullRecordQuery()

  const half = Math.ceil(MOCK_SPECIFIC_SESSION_TABLE.length / 2);

  return (
    <>
      {selectedSessionType === 'FULL' ? (
        <FullSessionTable items={MOCK_FULL_SESSION_TABLE} />
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
