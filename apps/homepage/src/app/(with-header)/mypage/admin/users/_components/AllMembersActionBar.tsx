import {MemberStatusKey} from '@/constants/admin/admin-users';
import {SearchBar} from './SearchBar';

interface AllMembersActionBarProps {
  hasSelection: boolean;
  onBatchStatusChange: (status: MemberStatusKey) => void;
  keyword: string;
  onKeywordChange: (value: string) => void;
  onSearch: () => void;
  isLoading: boolean;
}

export const AllMembersActionBar = ({
  hasSelection,
  onBatchStatusChange,
  keyword,
  onKeywordChange,
  onSearch,
  isLoading,
}: AllMembersActionBarProps) => {
  return (
    <div className='flex gap-5 pt-8.5'>
      <button
        disabled={!hasSelection}
        onClick={() => onBatchStatusChange('RETIRED')}
        className='rounded-lg bg-neutral-50 px-4.75 py-1.5 font-semibold text-neutral-600'>
        수료로 변경
      </button>
      <button
        disabled={!hasSelection}
        onClick={() => onBatchStatusChange('APPROVED')}
        className='text-primary rounded-lg bg-neutral-50 px-4.75 py-1.5 font-semibold'>
        활동 중으로 변경
      </button>
      <SearchBar
        keyword={keyword}
        onKeywordChange={onKeywordChange}
        onSearch={onSearch}
        disabled={isLoading}
      />
    </div>
  );
};
