import {MemberStatusKey} from '@/constants/admin/admin';
import {SearchBar} from '../../_components/SearchBar';

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
    <div className='flex items-end gap-5 pt-7.5'>
      <button
        disabled={!hasSelection}
        onClick={() => onBatchStatusChange('RETIRED')}
        className='text-body-m h-8 w-23.25 rounded-lg bg-neutral-50 font-semibold text-neutral-600'>
        수료로 변경
      </button>
      <button
        disabled={!hasSelection}
        onClick={() => onBatchStatusChange('APPROVED')}
        className='text-primary text-body-m h-8 w-23.25 rounded-lg bg-neutral-50 font-semibold'>
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
