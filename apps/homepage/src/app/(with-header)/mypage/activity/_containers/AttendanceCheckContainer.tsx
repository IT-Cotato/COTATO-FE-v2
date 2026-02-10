'use client';

import {useState, useMemo} from 'react';
import {Dropdown} from '@/components/dropdown/Dropdown';
import {
  MOCK_ATTENDANCE_DATA,
  MOCK_PENALTY_DATA,
} from '@/mocks/mypage-mem/activity-mock';
import clsx from 'clsx';
import {
  ATTENDANCE_STATUS,
  POINT_STATUS,
} from '@/constants/mypage-mem/mypage-activity';

export const AttendanceCheckContainer = ({
  activeTab,
}: {
  activeTab: 'attendance' | 'penalty';
}) => {
  const [selectedMonth, setSelectedMonth] = useState('1월');
  const monthOptions = Array.from({length: 12}, (_, i) => `${i + 1}월`);

  const filteredData = useMemo(() => {
    const targetMonth = parseInt(selectedMonth.replace('월', ''), 10);

    if (activeTab === 'attendance') {
      return MOCK_ATTENDANCE_DATA.attendances.filter((item) => {
        const date = new Date(item.sessionDateTime);
        return date.getUTCMonth() + 1 === targetMonth;
      });
    } else {
      return MOCK_PENALTY_DATA.records.filter((record) => {
        const date = new Date(record.sessionDateTime);
        return date.getUTCMonth() + 1 === targetMonth;
      });
    }
  }, [activeTab, selectedMonth]);

  return (
    <div className='flex w-full flex-col gap-4'>
      <div className='flex justify-start'>
        <Dropdown
          width={85}
          value={selectedMonth}
          options={monthOptions}
          onSelect={(value) => setSelectedMonth(value)}
        />
      </div>
      <div className='rounded-[10px] bg-neutral-50 px-15.75 py-7 text-center'>
        <table className='w-full table-fixed border-collapse'>
          <thead>
            <tr className='text-h5 h-12.25 bg-white text-neutral-800'>
              <th>회차</th>
              {activeTab === 'attendance' ? (
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
            {filteredData.length === 0 ? (
              <tr>
                <td
                  colSpan={activeTab === 'attendance' ? 4 : 5}
                  className='py-15 text-neutral-800'>
                  {activeTab === 'attendance'
                    ? '출석 내역이 없습니다.'
                    : '상·벌점 내역이 없습니다.'}
                </td>
              </tr>
            ) : activeTab === 'attendance' ? (
              (filteredData as typeof MOCK_ATTENDANCE_DATA.attendances).map(
                (item) => {
                  const status = ATTENDANCE_STATUS[item.result];
                  return (
                    <tr key={item.attendanceId} className='text-center'>
                      <td>{item.sessionNumber}</td>
                      <td>{item.placeName}</td>
                      <td>
                        {item.sessionType === 'OFFLINE' ? '대면' : '비대면'}
                      </td>
                      <td className='flex h-12.25 items-center justify-center py-[4.5px]'>
                        <span
                          className={clsx(
                            'text-body-l-sb flex h-full w-25 items-center justify-center rounded-[20px] text-white',
                            status.className
                          )}>
                          {status.label}
                        </span>
                      </td>
                    </tr>
                  );
                }
              )
            ) : (
              (filteredData as typeof MOCK_PENALTY_DATA.records).map(
                (record) => {
                  const status = POINT_STATUS[record.pointType];
                  return (
                    <tr key={record.sessionId} className='h-12.25 text-center'>
                      <td>{record.week}</td>
                      <td>{record.content}</td>
                      <td className='flex h-12.25 items-center justify-center py-[4.5px]'>
                        <span
                          className={clsx(
                            'text-body-l-sb flex h-full w-25 items-center justify-center rounded-[20px] text-white',
                            status.className
                          )}>
                          {status.label}
                        </span>
                      </td>
                      <td>{record.point}점</td>
                      <td className='text-body-l text-neutral-800'>
                        {record.cumulativePoint}
                      </td>
                    </tr>
                  );
                }
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
