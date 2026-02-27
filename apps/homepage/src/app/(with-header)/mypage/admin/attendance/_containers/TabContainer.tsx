'use client';

import {useRouter, useSearchParams} from 'next/navigation';
import {PartTab} from '@/app/(with-header)/mypage/admin/attendance/_components/PartTab';
import {AttendancePartPartType} from '@/schemas/admin/admin.schema';
import {
  ATTENDANCE_PART_TAB,
  ATTENDANCE_STATUS_CONFIG,
  ATTENDANCE_STATUS_OPTION,
} from '@/constants/admin/admin';
import {StatusChip} from '@repo/ui/components/chip/StatusChip';

export const TabContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activePart =
    (searchParams.get('part') as AttendancePartPartType) ?? 'ALL';

  const handleTabClick = (part: AttendancePartPartType) => {
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

  return (
    <div className='flex flex-col gap-2.5'>
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
      <div className='flex gap-2.5'>
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
    </div>
  );
};
