'use client';

import {useAdminPenaltiesStore} from '@/store/useAdminPenaltiesStore';
import {FullSessionTable} from '@/app/(with-header)/mypage/admin/penalties/_components/table/FullSessionTable';
import {SpecificSessionTable} from '@/app/(with-header)/mypage/admin/penalties/_components/table/SpecificSessionTable';

export const TableContainer = () => {
  const {selectedSessionType} = useAdminPenaltiesStore();

  const fullAttendanceList: {
    memberId: number;
    name: string;
    attendanceMinusPoint: number;
    sessionMinusPoint: number;
    beerNetworkingCount: number;
    beerNetworkingBonusPoint: number;
    totalMinusPoint: number;
  }[] = [];
  const specificAttendanceList: {
    memberId: number;
    name: string;
    attendanceResult:
      | 'PRESENT'
      | 'LATE'
      | 'ABSENT'
      | 'UNAUTHORIZED_ABSENT'
      | 'NOT_YET';
    beerNetworkingParticipated: boolean;
    extraMinusPoint: number;
  }[] = [];

  return (
    <>
      {selectedSessionType === 'FULL' ? (
        <FullSessionTable items={fullAttendanceList} />
      ) : (
        <div className='flex gap-5'>
          <SpecificSessionTable items={specificAttendanceList} />
        </div>
      )}
    </>
  );
};
