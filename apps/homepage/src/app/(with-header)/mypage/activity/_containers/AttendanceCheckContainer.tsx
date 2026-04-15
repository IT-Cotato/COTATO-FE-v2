'use client';

import {useState, useMemo, useEffect} from 'react';
import {Dropdown} from '@/components/dropdown/Dropdown';
import {TabType} from '@/schemas/mypage-mem/activity/mypage-mem-type';
import {
  useAttendanceRecordsQuery,
  usePenaltyRecordsQuery,
  useAttendanceDashboardQuery,
} from '@/hooks/queries/useActivity.queries';
import {Spinner} from '@repo/ui/components/spinner/Spinner';
import {AttendanceRows} from '@/app/(with-header)/mypage/activity/_components/AttendanceRow';
import {PenaltyRows} from '@/app/(with-header)/mypage/activity/_components/PenaltyRow';
import {MemberAttendResponse} from '@/schemas/mypage-mem/activity/attendance.schema';
import {PenaltyRecord} from '@/schemas/mypage-mem/activity/penalty.schema';

export const AttendanceCheckContainer = ({activeTab}: {activeTab: TabType}) => {
  const {data: dashboardData, isLoading: isDashboardLoading} =
    useAttendanceDashboardQuery();
  const generationId = dashboardData?.generationId;

  // generationId에 따라 월 옵션
  const monthOptions = useMemo(() => {
    if (!generationId) return [];
    const isOdd = generationId % 2 !== 0;
    const months = isOdd ? [3, 4, 5, 6, 7, 8] : [9, 10, 11, 12, 1, 2];
    return months.map((m) => `${m}월`);
  }, [generationId]);

  const [selectedMonth, setSelectedMonth] = useState<string>('');

  useEffect(() => {
    if (monthOptions.length > 0 && !selectedMonth) {
      const currentMonth = new Date().getMonth() + 1;
      const currentMonthText = `${currentMonth}월`;
      if (monthOptions.includes(currentMonthText)) {
        setSelectedMonth(currentMonthText);
      } else {
        setSelectedMonth(monthOptions[0] as string);
      }
    }
  }, [monthOptions, selectedMonth]);

  const monthNumber = parseInt(selectedMonth.replace('월', ''));
  const isAttendance = activeTab === 'attendance';

  const {data: attendRecords, isLoading: isAttendLoading} =
    useAttendanceRecordsQuery(monthNumber, {
      enabled: isAttendance && !!selectedMonth,
    });

  const {data: penaltyRecords, isLoading: isPenaltyLoading} =
    usePenaltyRecordsQuery(monthNumber, {
      enabled: !isAttendance && !!selectedMonth,
    });

  const isDataLoading =
    isDashboardLoading ||
    !selectedMonth ||
    (isAttendance ? isAttendLoading : isPenaltyLoading);

  const currentRecords = isAttendance
    ? attendRecords?.attendances || []
    : penaltyRecords?.records || [];

  return (
    <div className='flex w-full flex-col gap-4.5 lg:gap-4'>
      <div className='flex justify-start'>
        <Dropdown
          width={85}
          value={selectedMonth}
          options={monthOptions}
          onSelect={setSelectedMonth}
          isBorder
        />
      </div>
      <div className='flex min-h-55.75 flex-col justify-center rounded-[10px] bg-neutral-50 px-2.5 py-2.5 text-center lg:min-h-75 lg:px-15.75 lg:py-7'>
        {isDataLoading ? (
          <div className='flex h-full items-center justify-center'>
            <Spinner />
          </div>
        ) : (
          <table className='w-full table-fixed border-separate border-spacing-y-2.5'>
            <thead>
              <tr className='text-body-l-b lg:text-h5 h-8 bg-white text-neutral-800 lg:h-12.25'>
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
            <tbody className='lg:text-body-l text-[14px] text-neutral-800'>
              {currentRecords.length === 0 ? (
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
                <AttendanceRows
                  data={currentRecords as MemberAttendResponse[]}
                />
              ) : (
                <PenaltyRows data={currentRecords as PenaltyRecord[]} />
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
