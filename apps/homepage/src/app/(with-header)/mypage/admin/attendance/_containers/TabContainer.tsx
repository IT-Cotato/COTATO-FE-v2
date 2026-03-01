'use client';

import {useRouter, useSearchParams} from 'next/navigation';
import {PartTab} from '@/app/(with-header)/mypage/admin/attendance/_components/PartTab';
import {
  ATTENDANCE_PART_TAB,
  ATTENDANCE_STATUS_CONFIG,
  ATTENDANCE_STATUS_OPTION,
} from '@/constants/admin/admin';
import {StatusChip} from '@repo/ui/components/chip/StatusChip';
import SearchIcon from '@repo/ui/assets/icons/search.svg';
import {useState} from 'react';
import {AttendancePartType} from '@/schemas/admin/attendance.schema';
import {useAdminAttendanceStore} from '@/store/useAdminAttendanceStore';

export const TabContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {selectedSessionType} = useAdminAttendanceStore();

  const [keyword, setKeyword] = useState<string>(
    searchParams.get('keyword') ?? ''
  );

  const activePart = (searchParams.get('part') as AttendancePartType) ?? 'ALL';

  const handleTabClick = (part: AttendancePartType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('part', part);
    router.push(`?${params.toString()}`, {scroll: false});
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLElement>,
    index: number
  ) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;

    e.preventDefault();

    const nextIndex =
      e.key === 'ArrowRight'
        ? (index + 1) % ATTENDANCE_PART_TAB.length
        : (index - 1 + ATTENDANCE_PART_TAB.length) % ATTENDANCE_PART_TAB.length;

    const nextTab = ATTENDANCE_PART_TAB[nextIndex];
    handleTabClick(nextTab.value);
  };

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (keyword.trim()) {
      params.set('keyword', keyword);
    } else {
      params.delete('keyword');
    }
    router.push(`?${params.toString()}`, {scroll: false});
  };

  return (
    <div className='flex items-end'>
      <div className='mr-97.25 flex flex-col gap-2.5'>
        <div className='flex gap-7.5' aria-label='파트 선택'>
          {ATTENDANCE_PART_TAB.map(({label, value}, index) => {
            const isActive = activePart === value;
            return (
              <PartTab
                key={value}
                partName={label}
                isActive={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => handleTabClick(value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            );
          })}
        </div>
        {selectedSessionType === 'SPECIFIC' && (
          <div className='flex gap-2.5' aria-label='출석 상태 선택'>
            {ATTENDANCE_STATUS_OPTION.map((item) => {
              return (
                <StatusChip
                  key={item}
                  value={item}
                  config={ATTENDANCE_STATUS_CONFIG}
                />
              );
            })}
          </div>
        )}
      </div>
      <form
        role='search'
        aria-label='지원자 검색'
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        className='flex h-fit flex-1 items-center gap-2.5 rounded-[10px] bg-neutral-50 px-4 py-3.5'>
        <SearchIcon width={16} height={16} />
        <input
          type='search'
          placeholder='SEARCH'
          aria-label='지원자 이름 검색'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          // todo : make disabled on searching loading
          disabled={false}
          className='text-body-l w-full font-normal outline-none placeholder:text-neutral-600'
        />
      </form>
    </div>
  );
};
