'use client';

import {useState} from 'react';
import {Dropdown} from '@/components/dropdown/Dropdown';
import {TabType} from '@/schemas/mypage-mem/activity/mypage-mem-type';
import {
  useAttendanceRecordsQuery,
  usePenaltyRecordsQuery,
} from '@/hooks/queries/useActivity.queries';
import {Spinner} from '@repo/ui/components/spinner/Spinner';
import {AttendanceRows} from '@/app/(with-header)/mypage/activity/_components/AttendanceRow';
import {PenaltyRows} from '@/app/(with-header)/mypage/activity/_components/PenaltyRow';
import {MemberAttendResponse} from '@/schemas/mypage-mem/activity/attendance.schema';
import {PenaltyRecord} from '@/schemas/mypage-mem/activity/penalty.schema';

export const AttendanceCheckContainer = ({activeTab}: {activeTab: TabType}) => {
  const [selectedMonth, setSelectedMonth] = useState('1월');
  const monthOptions = Array.from({length: 12}, (_, i) => `${i + 1}월`);
  const monthNumber = parseInt(selectedMonth.replace('월', ''));

  const isAttendance = activeTab === 'attendance';

  const {data: attendRecords, isLoading: isAttendLoading} =
    useAttendanceRecordsQuery(monthNumber, {
      enabled: isAttendance,
    });

  const {data: penaltyRecords, isLoading: isPenaltyLoading} =
    usePenaltyRecordsQuery(monthNumber, {
      enabled: !isAttendance,
    });

  const isLoading = isAttendance ? isAttendLoading : isPenaltyLoading;

  const currentRecords = isAttendance
    ? attendRecords?.attendances || []
    : penaltyRecords?.records || [];

  return (
    <div className='flex w-full flex-col gap-4'>
      <div className='flex justify-start'>
        <Dropdown
          width={85}
          value={selectedMonth}
          options={monthOptions}
          onSelect={setSelectedMonth}
        />
      </div>
      <div className='rounded-[10px] bg-neutral-50 px-15.75 py-7 text-center'>
        <table className='w-full table-fixed border-separate border-spacing-y-2.5'>
          <thead>
            <tr className='text-h5 h-12.25 bg-white text-neutral-800'>
              <th>회차</th>
              {isAttendance ? (
                <>
                  <th className='w-1/4'>장소</th>
                  <th className='w-1/4'>대면여부</th>
                  <th className='w-1/4'>출석여부</th>
                </>
              ) : (
                <>
                  <th className='w-1/5'>내용</th>
                  <th className='w-1/5'>상·벌점</th>
                  <th className='w-1/5'>점수</th>
                  <th className='w-1/5'>누계</th>
                </>
              )}
            </tr>
          </thead>
          <tbody className='text-body-l text-neutral-800'>
            {isLoading ? (
              <tr>
                <td colSpan={isAttendance ? 4 : 5} className='py-10'>
                  <Spinner />
                </td>
              </tr>
            ) : currentRecords.length === 0 ? (
              <tr>
                <td
                  colSpan={isAttendance ? 4 : 5}
                  className='py-15 text-neutral-400'>
                  {isAttendance
                    ? '출석 내역이 없습니다.'
                    : '상·벌점 내역이 없습니다.'}
                </td>
              </tr>
            ) : isAttendance ? (
              <AttendanceRows data={currentRecords as MemberAttendResponse[]} />
            ) : (
              <PenaltyRows data={currentRecords as PenaltyRecord[]} />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
