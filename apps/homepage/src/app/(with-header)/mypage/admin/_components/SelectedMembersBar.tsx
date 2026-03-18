import {SelectedMemberChip} from '@/app/(with-header)/mypage/admin/_components/SelectedMemberChip';

interface SelectedMembersBarItem {
  memberId: number;
  name: string;
}

interface SelectedMembersBarProps {
  selectedIds: number[];
  allItems: SelectedMembersBarItem[];
  onRemove: (id: number) => void;
}

export const SelectedMembersBar = ({
  selectedIds,
  allItems,
  onRemove,
}: SelectedMembersBarProps) => {
  if (selectedIds.length === 0) return null;

  return (
    <div className='bg-neutral-100 px-6 py-3 lg:px-12 lg:py-2.75'>
      <div className='flex flex-wrap items-center gap-5.5'>
        <span className='text-body-l pr-1.25 text-neutral-600'>
          선택 {selectedIds.length}
        </span>
        {allItems
          .filter((m) => selectedIds.includes(m.memberId))
          .map((m) => (
            <SelectedMemberChip
              key={m.memberId}
              name={m.name}
              onRemove={() => onRemove(m.memberId)}
            />
          ))}
      </div>
    </div>
  );
};
