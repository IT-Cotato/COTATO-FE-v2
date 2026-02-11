'use client';

import {useState, useMemo} from 'react';
import {Dropdown} from '@/components/dropdown/Dropdown';
import {
  MOCK_ATTENDANCE_DATA,
  MOCK_PENALTY_DATA,
} from '@/mocks/mypage-mem/activity-mock';

import {TabType} from '@/schemas/mypage-mem/mypage-mem-type';
import {AttendanceRows} from '@/app/(with-header)/mypage/activity/_components/AttendanceRow';
import {PenaltyRows} from '@/app/(with-header)/mypage/activity/_components/PenaltyRow';

export const AttendanceCheckContainer = ({activeTab}: {activeTab: TabType}) => {
  const [selectedMonth, setSelectedMonth] = useState('1월');
  const monthOptions = Array.from({length: 12}, (_, i) => `${i + 1}월`);

  const filterByMonth = (dateTime: string) => {
    const targetMonth = parseInt(selectedMonth.replace('월', ''), 10);
    return new Date(dateTime).getUTCMonth() + 1 === targetMonth;
  };

  const attendanceData = useMemo(
    () =>
      MOCK_ATTENDANCE_DATA.attendances.filter((item) =>
        filterByMonth(item.sessionDateTime)
      ),
    [selectedMonth]
  );

  const penaltyData = useMemo(
    () =>
      MOCK_PENALTY_DATA.records.filter((record) =>
        filterByMonth(record.sessionDateTime)
      ),
    [selectedMonth]
  );

  const isAttendance = activeTab === 'attendance';
  const currentDataLength = isAttendance
    ? attendanceData.length
    : penaltyData.length;

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
            {currentDataLength === 0 ? (
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
              <AttendanceRows data={attendanceData} />
            ) : (
              <PenaltyRows data={penaltyData} />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
